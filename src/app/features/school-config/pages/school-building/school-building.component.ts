import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthStore } from 'src/app/core';
import { roomStore } from 'src/app/features/schools';

@Component({
  selector: 'app-school-building',
  templateUrl: './school-building.component.html',
  styleUrls: ['./school-building.component.scss']
})
export class SchoolBuildingComponent {
  constructor(
    public dialogRef: MatDialogRef<SchoolBuildingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public roomStore: roomStore,
  ) { }


  ngOnInit(): void {
    const { key, schoolKey } = this.data;
    this.roomStore.fetchData(schoolKey, key)
  }
 
  ngOnDestroy(): void {
    const { dataSubscription } = this.roomStore;
    if (dataSubscription) dataSubscription.unsubscribe();

  }
}
