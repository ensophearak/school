import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { departmentStore } from '../../stores/department.store';
import { schoolsStore } from '../../stores/schools.store';
import { DepartmentsFormComponent } from '../departments-form/departments-form.component';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent {
  id: string;
  private dialogSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    public store: departmentStore,
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
    this.store.selectedDepartment = null;
    this.store.data = [];
    if (this.dialogSubscription) this.dialogSubscription.unsubscribe();
  }

  onDetail(item: any) {
    this.store.selectedDepartment = item;
    this.router.navigate([`departments/${item.key}`], { relativeTo: this.activatedRoute })
  }

  addNew(item?: any) {
    const { selectedSchool } = this.schoolStore;
    if (!selectedSchool) return;
    let dialogRef = this.dialog.open(DepartmentsFormComponent, {
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
