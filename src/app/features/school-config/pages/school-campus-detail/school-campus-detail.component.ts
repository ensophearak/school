import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthStore } from 'src/app/core';
import { buildingStore, campusStore } from 'src/app/features/schools';
import { SchoolBuildingComponent } from '../school-building/school-building.component';

@Component({
  selector: 'app-school-campus-detail',
  templateUrl: './school-campus-detail.component.html',
  styleUrls: ['./school-campus-detail.component.scss']
})
export class SchoolCampusDetailComponent {
  campusKey: string = null;
  private subscription: Subscription;
  private dialogSubscription: Subscription;

  constructor(
    private activeRoute: ActivatedRoute,
    public store: campusStore,
    public auth: AuthStore,
    public buildingStore: buildingStore,
    private dialog: MatDialog

  ) { }
  ngOnInit(): void {
    this.subscription = this.activeRoute.params.subscribe(async params => {
      this.campusKey = params['id'];
      if (!this.campusKey) return;
      const { schoolKey } = this.auth;
      await this.store.fetchSelectedData(schoolKey, this.campusKey);
      this.buildingStore.fetchData(schoolKey, this.campusKey)

    })
  }

  ngOnDestroy(): void {
    const { dataSubscription } = this.buildingStore;
    if (dataSubscription) dataSubscription.unsubscribe();
    if (this.subscription) this.subscription.unsubscribe();
    if (this.dialogSubscription) this.dialogSubscription.unsubscribe()
  }
  onDetail(item: any) {
    if (!item) return;
    let dialogRef = this.dialog.open(SchoolBuildingComponent, {
      data: item,
      panelClass: 'dialog-container-panel',
      width: '',
      height: '100vh',
      disableClose: true,
      role: 'dialog',
      autoFocus: true,
    });
    // dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => { });
  }
  addNew(item?: any) {

  }
}
