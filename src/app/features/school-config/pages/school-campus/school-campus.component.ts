import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthStore } from 'src/app/core';
import { campusStore } from 'src/app/features/schools';

@Component({
  selector: 'app-school-campus',
  templateUrl: './school-campus.component.html',
  styleUrls: ['./school-campus.component.scss']
})
export class SchoolCampusComponent {
  schoolKey: string = null;
  constructor(
    public store: campusStore,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private auth: AuthStore,
  ) { }
  ngOnInit(): void {
    const params = this.activatedRoute?.parent?.parent?.snapshot?.params;
    this.schoolKey = params['schoolKey'];
    console.log(this.auth.isLoggedIn);
    this.store.fetchData(this.schoolKey);
  }

  ngOnDestroy(): void {
    const { dataSubscription } = this.store;
    if (dataSubscription) dataSubscription.unsubscribe();
  }

  onDetail(item: any) {
    this.store.selectedCampus = item;
    this.router.navigate([`${item.key}`], { relativeTo: this.activatedRoute })
  }
}
