import { Component, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, tap } from 'rxjs';
import { Translate, AuthStore, dataService, statusObject, IRoom, roomTypes, floors } from 'src/app/core';
import { generateKeywords } from 'src/app/shared';
import { roomStore } from '../../stores/room.store';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.scss']
})
export class RoomFormComponent {
  form: FormGroup;
  name: AbstractControl;
  loading: boolean;
  nameSubscription: Subscription;
  roomTypesData = roomTypes;
  floorData = floors;
  title = 'Add new room'

  constructor(
    public dialogRef: MatDialogRef<RoomFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public tran: Translate,
    private auth: AuthStore,
    public store: roomStore,
    private ds: dataService,

  ) { }
  ngOnInit(): void {
    console.log(this.data);

    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(4)]],
      nameEn: [null, [Validators.required, Validators.pattern('[A-Za-z0-9\-\!\'\" ]+'), Validators.minLength(4)]],
      roomType: [this.roomTypesData[0], Validators.required],
      floor: [this.floorData[0], Validators.required],
      minPerson: [null],
      maxPerson: [null]
    })

    if (this.data?.item) {
      this.title = 'Update room'
      const { name, nameEn, roomType, floor, minPerson, maxPerson } = this.data.item;
      this.form.patchValue({
        name: name,
        nameEn: nameEn,
        roomType: roomType,
        floor: floor,
        minPerson: minPerson,
        maxPerson: maxPerson,
      })
    }
  }
  
  compareObjects(o1: any, o2: any): boolean {
    if (o2) return o1.key === o2.key;
    return null
  }
  onSave() {
    this.form.disable();
    this.loading = true;
    const { item, building } = this.data;
    const { schoolKey, campusKey, key } = building;
    const { name, nameEn, minPerson, maxPerson, roomType, floor } = this.form.getRawValue();
    const data: IRoom = {
      key: item ? item?.key : this.ds.createId(),
      name: name.trim(),
      nameEn: nameEn.trim(),
      keyword: generateKeywords([name, nameEn]),

      roomType: roomType || null,
      floor: floor || null,

      schoolKey: schoolKey,
      campusKey: campusKey,
      buildingKey: key,
      minPerson: minPerson || null,
      maxPerson: maxPerson || null,

      status: item ? item?.status : statusObject?.active,
      isDelete: item ? item?.isDelete : false,
      createdBy: item ? item?.createdBy : this.auth.user,
      createdAt: item ? item?.createdAt : new Date(),
      updatedBy: this.auth.user,
      updatedAt: new Date(),

    }
    this.store.create(data, (success, res) => {
      this.snackBar.open("Room has been saved successful.", "Done", { duration: 2500 });
      this.dialogRef.close();
      this.form.enable();
      this.loading = false;
    })
  }
}
