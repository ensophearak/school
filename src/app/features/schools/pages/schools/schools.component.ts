import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthStore, Page, statusArray, statusObject, Tabs } from 'src/app/core';
import { DeleteComponent, LoaderService, mapRouteWithSchoolKey } from 'src/app/shared';
import { schoolsStore } from '../../stores/schools.store';
import { SchoolFormComponent } from '../school-form/school-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss'],
})
export class SchoolsComponent {
  tabs: any[];
  dataStatus: any = statusObject;
  private subscription: Subscription;
  private dialogSubscription: Subscription;
  private dialogSubscription2: Subscription;
  constructor(
    public auth: AuthStore,
    public store: schoolsStore,
    public loader: LoaderService,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,

  ) { }
  ngOnInit(): void {
    const parentParams = this.activeRoute.parent.parent.snapshot.params;
    const { schoolKey } = parentParams;
    this.tabs = mapRouteWithSchoolKey(Tabs?.schoolsTabs, schoolKey);

   this.subscription = this.activeRoute.params.subscribe((params: any) => {
      const status = this.dataStatus[params.status];
      this.loader.showPageNotAvailable(status);
      if (status) {
        this.store.loadItems(status.key, Page.size)
      }
    })
  }

  ngOnDestroy(): void {
    const { tableDataSubscription } = this.store;
    tableDataSubscription && tableDataSubscription.unsubscribe();
    this.subscription.unsubscribe();
    if(this.dialogSubscription) this.dialogSubscription.unsubscribe();
    if(this.dialogSubscription2) this.dialogSubscription2.unsubscribe();
  }

  addNew(item?: any) {
    let dialogRef = this.dialog.open(SchoolFormComponent, {
      data: item,
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


  deleteForever(item?: any) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { item: item, title: 'Delete School', desc: `Are you sure you want to delete this school ${item?.name}` },
      panelClass: 'form-container-panel',
      disableClose: true,
      role: 'dialog',
      autoFocus: true,
    });
    this.dialogSubscription2 = dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.deleteSchool(item, (success, res) => {
          this.snackBar.open("School has been delete successful.", "Done", { duration: 2500 });
        })
      }
    });
  }


  changeSchoolStatus(item?: any) {
    const status = statusArray.find(f => f.key !== item?.status?.key);
    this.store.changeSchoolStatus(item, status, (success, res) => {
      this.snackBar.open("School status has been update successful.", "Done", { duration: 2500 });
    })
  }

}
