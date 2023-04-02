import { Component, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, tap } from 'rxjs';
import { Translate, AuthStore, dataService, statusObject, IDepartment } from 'src/app/core';
import { generateKeywords } from 'src/app/shared';
import { departmentStore } from '../../stores/department.store';

@Component({
  selector: 'app-departments-form',
  templateUrl: './departments-form.component.html',
  styleUrls: ['./departments-form.component.scss']
})
export class DepartmentsFormComponent {
  form: FormGroup;
  name: AbstractControl;
  loading: boolean;
  nameSubscription: Subscription;
  title = 'Add new department'
  constructor(
    public dialogRef: MatDialogRef<DepartmentsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public tran: Translate,
    private auth: AuthStore,
    public store: departmentStore,
    private ds: dataService,

  ) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(4)]],
      nameEn: [null, [Validators.required, Validators.pattern('[A-Za-z0-9\-\!\'\" ]+'), Validators.minLength(4)]],
    })

    if (this.data?.item) {
      this.title = 'Update department'
      const { name, nameEn } = this.data.item;
      this.form.patchValue({
        name: name,
        nameEn: nameEn,
      })
    }
  }

  onSave() {
    this.form.disable();
    this.loading = true;
    const { item, school } = this.data;
    const { name, nameEn } = this.form.getRawValue();
    const data: IDepartment = {
      key: item ? item?.key : this.ds.createId(),
      name: name.trim(),
      nameEn: nameEn.trim(),
      keyword: generateKeywords([name, nameEn]),
      schoolKey: school?.key,

      status: item ? item?.status : statusObject?.active,
      isDelete: item ? item?.isDelete : false,
      createdBy: item ? item?.createdBy : this.auth.user,
      createdAt: item ? item?.createdAt : new Date(),
      updatedBy: this.auth.user,
      updatedAt: new Date(),

    }
    this.store.create(data, (success, res) => {
      this.snackBar.open("Department has been saved successful.", "Done", { duration: 2500 });
      this.dialogRef.close();
      this.form.enable();
      this.loading = false;
    })
  }
}
