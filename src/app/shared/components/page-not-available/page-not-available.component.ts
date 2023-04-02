import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-page-not-available',
  templateUrl: './page-not-available.component.html',
  styleUrls: ['./page-not-available.component.scss']
})
export class PageNotAvailableComponent {
  options: AnimationOptions = {
    path: '../../../../assets/images/page-not-available.json',
  };
}
