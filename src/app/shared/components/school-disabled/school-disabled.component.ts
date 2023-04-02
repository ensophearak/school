import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-school-disabled',
  templateUrl: './school-disabled.component.html',
  styleUrls: ['./school-disabled.component.scss']
})
export class SchoolDisabledComponent {
  options: AnimationOptions = {
    path: '../../../../assets/images/disabled.json',
  };
}
