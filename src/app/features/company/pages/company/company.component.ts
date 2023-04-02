import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { where } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import { Tabs } from 'src/app/core';
import { Page, statusObject } from 'src/app/core/dummy/app';
import { LoaderService } from 'src/app/shared';
import { companyStore } from '../../stores/company.store';
import { CompanyFormComponent } from '../company-form/company-form.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  tabs = Tabs.companyTabs;
  dataStatus: any = statusObject;
  private subscription: Subscription;
  private dialogSubscription: Subscription;

  constructor(
    private dialog: MatDialog,
    public store: companyStore,
    public loader: LoaderService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params: any) => {
      const statusKey = this.dataStatus[params.status].key
      this.store.fetchCount('country', (where('status.key', '==', statusKey)))
      this.store.loadItems(statusKey, Page.size)
    })

  }


  addNew() {
    let dialogRef = this.dialog.open(CompanyFormComponent, {
      data: null,
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

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.dialogSubscription) this.dialogSubscription.unsubscribe();
  }

}
