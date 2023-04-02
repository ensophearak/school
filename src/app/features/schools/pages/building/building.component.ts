import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { buildingStore } from '../../stores/building.store';
import { roomStore } from '../../stores/room.store';
import { campusStore } from '../../stores/campus.store';

import { RoomFormComponent } from '../room-form/room-form.component';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})
export class BuildingComponent {
  id: string;
  private subscription: Subscription;
  private dialogSubscription: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private campusStore: campusStore,
    public buildingStore: buildingStore,
    public store: roomStore,
    private dialog: MatDialog,
    private router: Router,

  ) { }
  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe(async params => {
      this.id = params['key'];
      if (!this.id) { return }
      const { selectedCampus } = this.campusStore;
      await this.buildingStore.fetchSelectedData(selectedCampus?.schoolKey, this.id);
      this.store.fetchData(selectedCampus?.schoolKey, this.id)
    })
  }
  ngOnDestroy(): void {
    const { dataSubscription } = this.store;
    if (dataSubscription) dataSubscription?.unsubscribe();
    if (this.subscription) this.subscription?.unsubscribe();
    this.buildingStore.selectedBuilding = null;
    this.store.data = [];
    if(this.dialogSubscription) this.dialogSubscription.unsubscribe();
  }

  onDetail(item: any) {
    this.store.selectedRoom = item;
    this.router.navigate([`room/${item.key}`], { relativeTo: this.activatedRoute })
  }

  addNew(item?: any) {
    const { selectedBuilding } = this.buildingStore;
    if (!selectedBuilding) return;
    const dialogRef = this.dialog.open(RoomFormComponent, {
      data: { item: item, building: selectedBuilding },
      panelClass: 'form-container-panel',
      width: '',
      height: '100vh',
      disableClose: true,
      role: 'dialog',
      autoFocus: true,
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => { });
  }
}
