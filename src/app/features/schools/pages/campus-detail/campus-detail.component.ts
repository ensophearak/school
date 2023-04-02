import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { buildingStore } from '../../stores/building.store';
import { campusStore } from '../../stores/campus.store';
import { schoolsStore } from '../../stores/schools.store';
import { BuildingFormComponent } from '../building-form/building-form.component';

@Component({
  selector: 'app-campus-detail',
  templateUrl: './campus-detail.component.html',
  styleUrls: ['./campus-detail.component.scss']
})
export class CampusDetailComponent {
  id: string;
  private subscription: Subscription;
  private dialogSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private schoolStore: schoolsStore,
    public campusStore: campusStore,
    public store: buildingStore,
    private dialog: MatDialog,
    private router: Router,

  ) { }
  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe(async params => {
      this.id = params['key'];
      if (!this.id) { return }
      const { selectedSchool } = this.schoolStore;
      await this.campusStore.fetchSelectedData(selectedSchool?.key, this.id);

      this.store.fetchData(selectedSchool?.key, this.id)
    })
  }
  ngOnDestroy(): void {

    const { dataSubscription } = this.store;
    if (dataSubscription) dataSubscription?.unsubscribe();
    if (this.subscription) this.subscription?.unsubscribe();
    this.store.data = [];
    this.campusStore.selectedCampus = null;
    if (this.dialogSubscription) this.dialogSubscription.unsubscribe();
  }

  onDetail(item: any) {
    this.store.selectedBuilding = item;
    this.router.navigate([`building/${item.key}`], { relativeTo: this.activatedRoute })
  }

  addNew(item?: any) {
    const { selectedCampus } = this.campusStore;
    if (!selectedCampus) return;
    const dialogRef = this.dialog.open(BuildingFormComponent, {
      data: { item: item, campus: selectedCampus },
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
