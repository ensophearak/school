import { Component, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription, tap, debounceTime, Subject, takeUntil } from 'rxjs';
import { Translate, AuthStore, dataService, ISchool, statusObject } from 'src/app/core';
import { generateKeywords, MappingService } from 'src/app/shared';
import { schoolsStore } from '../../stores/schools.store';

@Component({
  selector: 'app-school-form',
  templateUrl: './school-form.component.html',
  styleUrls: ['./school-form.component.scss']
})
export class SchoolFormComponent {
  form: FormGroup;
  schoolName: AbstractControl;
  schoolID: AbstractControl;
  loading: boolean;

  schoolNameSubscription: Subscription;
  title = 'Add new school';
  private destroy$ = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<SchoolFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    public tran: Translate,
    public auth: AuthStore,
    public ds: dataService,
    public store: schoolsStore,
  ) { }
  ngOnInit(): void {

    this.form = this.fb.group({
      schoolName: [null, [Validators.required, Validators.pattern('[A-Za-z0-9\-\!\'\" ]+'), Validators.minLength(4)]],
      schoolID: [null, [Validators.required, Validators.pattern('[A-Za-z0-9\-]+'), Validators.minLength(6)], this.checkExistID.bind(this)],
    })
    this.form.controls['schoolID'].disable();
    if (this.data) {
      this.title = 'Update school'
      const { name, ID } = this.data;
      this.form.patchValue({
        schoolName: name,
        schoolID: ID,
      })
    } else {
      this.formControlStatusChanged();
    }
  }


  formControlStatusChanged() {
    const schoolNameControl = this.form.get('schoolName');
    const schoolIDControl = this.form.get('schoolID');
    schoolNameControl.statusChanges
      .pipe(
        debounceTime(300),
        tap(() => (this.loading = true)),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (status: any) => {
          let value = '';
          if (schoolNameControl.value) {
            const reg = /[^a-zA-Z0-9 ]/g;
            const str = schoolNameControl.value.replaceAll(reg, '');
            value = str.replaceAll(' ', '-') + '-' + MappingService.pageKey();
          } else {
            value = '';
          }
          schoolIDControl.patchValue(value.toLowerCase());
          if (status === 'VALID') {
            schoolIDControl.enable();
          } else {
            schoolIDControl.disable();
          }
          this.loading = false;
        });

  }
  onKeypress() {
    if (!this.data) {
      this.loading = true;
    }
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    // this.auth.userSubscription.unsubscribe();
  }

  async checkExistName(control: AbstractControl) {
    if (control) {
      const { value } = control;
      if (!value) return null;
      const doc = await this.ds.collectionFireRef('schools').where('name', '==', value).get();
      if (doc.empty) return null;
      return { existValue: true }
    } return null
  }

  async checkExistID(control: AbstractControl) {
    if (control) {
      const { value } = control
      if (!value) return null;
      const doc = await this.ds.collectionFireRef('schools').where('ID', '==', value).get();
      if (doc.empty) return null;
      return { existValue: true }
    } return null
  }

  onSave(f: any) {
    this.form.disable();
    this.loading = true;
    const { schoolName, schoolID } = this.form.getRawValue();
    const item: ISchool = {
      key: this.data ? this.data?.key : schoolID.trim(),
      name: schoolName.trim(),
      ID: this.data ? this.data?.ID : schoolID,
      keyword: generateKeywords([schoolName]),
      status: this.data ? this.data?.status : statusObject?.active,
      isDelete: this.data ? this.data?.isDelete : false,

      createdBy: this.data ? this.data?.createdBy : this.auth.user,
      createdAt: this.data ? this.data?.createdAt : new Date(),
      updatedBy: this.auth.user,
      updatedAt: new Date(),

    }
    this.store.createSchool(item, (success, res) => {
      this.snackBar.open("School has been saved successful.", "Done", { duration: 2500 });
      this.router.navigate([`${this.auth.schoolKey}/schools/listings/${item.status.key === 1 ? 'active' : 'disable'}`])
      this.dialogRef.close();
      this.form.enable();
      this.loading = false;
    })
  }
}
