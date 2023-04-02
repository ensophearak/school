import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AuthStore } from 'src/app/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  options: AnimationOptions = {
    path: '../../../../../assets/images/hr.json',
  };
  optionsBuilding: AnimationOptions = {
    path: '../../../../../assets/images/building.json',
  };
  constructor(
    private auth:AuthStore,
    private router:Router
  ) {}

  ngOnInit() {
  }

  navigateApp(path:string){
    const {schoolKey} = this.auth;
    this.router.navigate([`${schoolKey}/`+ path])
  }



}
