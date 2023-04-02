import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss']
})
export class DashboardSidebarComponent implements OnInit {

  @Input() sideBarMenu:any;
  @Input() hasSubMenu:boolean;
  expansions = {
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
    six: false,
    seven: false,
    eight: false,
    nine: false,
    ten: false,
    eleven: false,
    twelve: false,
  };
  constructor() { }

  ngOnInit(): void {
    const expansions = JSON.parse(localStorage.getItem("expansions"));
    if (expansions) {
      this.expansions = expansions
    }
  }
  toggleHoverSidebar(e:any) {
    e.stopPropagation();
    let body = document.getElementsByClassName("h-sb")[0];
    if(body){
      body.classList.toggle("o-sb");
    }
  }


  onOpened(i:any) {
    const isOpen = true;
    switch (i) {
      case 1:
        this.expansions.one = isOpen;
        break;
      case 2:
        this.expansions.two = isOpen;
        break;
      case 3:
        this.expansions.three = isOpen;
        break;
      case 4:
        this.expansions.four = isOpen;
        break;
      case 5:
        this.expansions.five = isOpen;
        break;
      case 6:
        this.expansions.six = isOpen;
        break;
      case 7:
        this.expansions.seven = isOpen;
        break;
      case 8:
        this.expansions.eight = isOpen;
        break;
      case 9:
        this.expansions.nine = isOpen;
        break;
      case 10:
        this.expansions.ten = isOpen;
        break;
    }

    localStorage.setItem('expansions', JSON.stringify(this.expansions));

  }
  onClosed(i:any) {
    const isOpen = false;
    switch (i) {
      case 1:
        this.expansions.one = isOpen;
        break;
      case 2:
        this.expansions.two = isOpen;
        break;
      case 3:
        this.expansions.three = isOpen;
        break;
      case 4:
        this.expansions.four = isOpen;
        break;
      case 5:
        this.expansions.five = isOpen;
        break;
      case 6:
        this.expansions.six = isOpen;
        break;
      case 7:
        this.expansions.seven = isOpen;
        break;
      case 8:
        this.expansions.eight = isOpen;
        break;
      case 9:
        this.expansions.nine = isOpen;
        break;
      case 10:
        this.expansions.ten = isOpen;
        break;
    }

    localStorage.setItem('expansions', JSON.stringify(this.expansions));

  }
}
