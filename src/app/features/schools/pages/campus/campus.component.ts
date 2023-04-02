import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { campusStore } from '../../stores/campus.store';
import { schoolsStore } from '../../stores/schools.store';
import { CampusFormComponent } from '../campus-form/campus-form.component';

@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.scss'],
})
export class CampusComponent {
  id: string;
  private dialogSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    public store: campusStore,
    public schoolStore: schoolsStore,

  ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.id = params['schoolKey']
    this.store.fetchData(this.id);
  }
  ngOnDestroy(): void {
    const { dataSubscription } = this.store;
    if (dataSubscription) dataSubscription?.unsubscribe();
    this.store.selectedCampus = null;
    this.store.data = [];
    if (this.dialogSubscription) this.dialogSubscription.unsubscribe();
  }

  onDetail(item: any) {
    this.store.selectedCampus = item;
    this.router.navigate([`campus/${item.key}`], { relativeTo: this.activatedRoute })
  }

  addNew(item?: any) {
    const { selectedSchool } = this.schoolStore;
    if (!selectedSchool) return;
    let dialogRef = this.dialog.open(CampusFormComponent, {
      data: { item: item, school: selectedSchool },
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
