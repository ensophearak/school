import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'component-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input() class: any;
  @Input() title: string;
  @Input() process: boolean = false;
  @Output() onClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  _onClick() {
    this.onClick.emit();
  }
}
