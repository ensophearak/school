import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, tap, Subscription, Subject, takeUntil } from 'rxjs';
import { AuthStore, dataService, ISchool, statusObject, Translate } from 'src/app/core';
import { generateKeywords, MappingService } from 'src/app/shared';

@Component({
  selector: 'app-new-school-form',
  templateUrl: './new-school-form.component.html',
  styleUrls: ['./new-school-form.component.scss']
})
export class NewSchoolFormComponent {
  form: FormGroup;
  schoolName: AbstractControl;
  schoolID: AbstractControl;
  loading: boolean;
  private destroy$ = new Subject<void>();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public tran: Translate,
    public auth: AuthStore,
    public ds: dataService,
  ) { 
    this.auth.fetchCanActive()
  }
  async ngOnInit(): Promise<void> {
    this.form = this.fb.group({
      schoolName: [null, [Validators.required, Validators.pattern('[A-Za-z0-9\-\!\'\" ]+'), Validators.minLength(4)]],
      schoolID: [null, [Validators.required, Validators.pattern('[A-Za-z0-9\-]+'), Validators.minLength(6)], this.checkExistID.bind(this)],
    })
    this.form.controls['schoolID'].disable();
    this.formControlStatusChanged();
  }
  async ngAfterViewInit(): Promise<void> {
    if(this.auth.user){
      await this.auth.fetchUserProfile(this.auth.user, null);
    }
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    // this.auth.userSubscription.unsubscribe();
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
    this.loading = true;
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
    const { schoolName, schoolID } = f;
    const item: ISchool = {
      key:schoolID.trim(),
      name:schoolName.trim(),
      ID:schoolID,
      keyword:generateKeywords([schoolName]),
      status: statusObject?.active,

      isDelete:false,
      createdBy: this.auth.user,
      createdAt: new Date(),
    }
    this.auth.createSchool(item, (success, res) => {
      this.router.navigate([`${schoolID}`])
      this.form.enable();
      this.loading = false;
    })
  }


}

