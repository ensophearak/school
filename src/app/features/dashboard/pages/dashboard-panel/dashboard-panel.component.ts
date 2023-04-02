import { Component, OnInit } from '@angular/core';
import { AuthStore, Tabs } from 'src/app/core';

@Component({
  selector: 'dashboard-panel',
  templateUrl: './dashboard-panel.component.html',
  styleUrls: ['./dashboard-panel.component.scss']
})
export class DashboardPanelComponent implements OnInit {
  tabs = Tabs.sampleTabs
  constructor(
    public auth:AuthStore,
  ) { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
  }
  signOut() {
    this.auth.signOut((success:any,result:any)=>{
        if(success){
          console.log(result);
        }
    })
  }
}
