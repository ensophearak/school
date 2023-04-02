import { Component, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, tap, debounceTime, Subject, takeUntil } from 'rxjs';
import { Translate, AuthStore, dataService, statusObject, ICampus } from 'src/app/core';
import { generateKeywords, MappingService } from 'src/app/shared';
import { campusStore } from '../../stores/campus.store';

@Component({
  selector: 'app-campus-form',
  templateUrl: './campus-form.component.html',
  styleUrls: ['./campus-form.component.scss']
})
export class CampusFormComponent {
  form: FormGroup;
  name: AbstractControl;
  campusId: AbstractControl;

  loading: boolean;
  nameSubscription: Subscription;
  title = 'Add new campus';
  private destroy$ = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<CampusFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public tran: Translate,
    private auth: AuthStore,
    private ds: dataService,
    public store: campusStore,
  ) { }
  ngOnInit(): void {

    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(4)]],
      nameEn: [null, [Validators.required, Validators.pattern('[A-Za-z0-9\-\!\'\" ]+'), Validators.minLength(4)]],
      campusId: [null, [Validators.required, Validators.pattern('[A-Za-z0-9\-]+'), Validators.minLength(6)], this.checkExistID.bind(this)],
      campusNumber: [null, Validators.required],
      shortName: [null],
      shortNameEn: [null],
      address: [null],
    })
    this.form.controls['campusId'].disable();

    if (this.data?.item) {
      this.title = 'Update campus';
      const { name, campusId, campusNumber, nameEn } = this.data.item;
      this.form.patchValue({
        name: name,
        nameEn: nameEn,
        campusId: campusId,
        campusNumber: campusNumber,
      })
    } else {
      this.formControlStatusChanged();
    }
  }

  formControlStatusChanged() {
    const nameControl = this.form.get('nameEn');
    const campusIdControl = this.form.get('campusId');
    nameControl.statusChanges
      .pipe(
        debounceTime(300),
        tap(() => (this.loading = true)),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (status: any) => {
          let value = '';
          if (nameControl.value) {
            const reg = /[^a-zA-Z0-9 ]/g;
            const str = nameControl.value.replaceAll(reg, '');
            value = str.replaceAll(' ', '-') + '-' + MappingService.pageKey();
          } else {
            value = '';
          }
          campusIdControl.patchValue(value.toLowerCase());
          if (status === 'VALID') {
            campusIdControl.enable();
          } else {
            campusIdControl.disable();
          }
          this.loading = false;
        });

  }
  onKeypress() {
    if (!this.data.item) {
      this.loading = true;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async checkExistID(control: AbstractControl) {
    if (control) {
      const { selectedSchool } = this.data;
      const { value } = control
      if (!value) return null;
      const doc = await this.ds.collectionFireRef('schools').doc(selectedSchool?.key).collection('campus').where('campusId', '==', value).get();
      if (doc.empty) return null;
      return { existValue: true }
    } return null
  }

  onSave(f: any) {
    this.form.disable();
    this.loading = true;
    const { item, school } = this.data;
    const { name, campusId, campusNumber, nameEn } = this.form.getRawValue();
    const data: ICampus = {
      key: item ? item?.key : campusId.trim(),
      name: name.trim(),
      nameEn: nameEn.trim(),

      campusId: item ? item?.campusId : campusId,
      campusNumber: item ? item?.campusNumber : campusNumber,
      keyword: generateKeywords([name, campusNumber, nameEn]),
      schoolKey: school?.key,

      status: item ? item?.status : statusObject?.active,
      isDelete: item ? item?.isDelete : false,
      createdBy: item ? item?.createdBy : this.auth.user,
      createdAt: item ? item?.createdAt : new Date(),
      updatedBy: this.auth.user,
      updatedAt: new Date(),

    }
    this.store.create(data, (success, res) => {
      this.snackBar.open("Campus has been saved successful.", "Done", { duration: 2500 });
      this.dialogRef.close();
      this.form.enable();
      this.loading = false;
    })
  }
}
