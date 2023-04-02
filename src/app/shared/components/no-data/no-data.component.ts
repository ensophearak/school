import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss'],

})
export class NoDataComponent {
  options: AnimationOptions = {
    path: '../../../../assets/images/no-data.json',
  };
}
