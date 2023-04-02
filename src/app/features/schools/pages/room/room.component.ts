import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { roomStore } from '../../stores/room.store';
import { buildingStore } from '../../stores/building.store';
import { RoomFormComponent } from '../room-form/room-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent {
  id: string;
  private subscription: Subscription;
  private dialogSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private buildingStore: buildingStore,
    private dialog: MatDialog,
    public store: roomStore,

  ) { }
  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe(async params => {
      this.id = params['key'];
      if (!this.id) { return }
      const { selectedBuilding } = this.buildingStore;
      await this.store.fetchSelectedData(selectedBuilding?.schoolKey, this.id);
    })
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    this.store.selectedRoom = null;
    if (this.dialogSubscription) this.dialogSubscription.unsubscribe();
  }

  edit(item?: any) {
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
