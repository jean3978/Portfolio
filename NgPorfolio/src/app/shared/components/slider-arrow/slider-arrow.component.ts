import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-slider-arrow',
  templateUrl: './slider-arrow.component.html',
  styleUrls: ['./slider-arrow.component.scss']
})
export class SliderArrowComponent implements OnInit {

  @Input() direction: string;

  @Output() clicked: EventEmitter<string> = new EventEmitter();

  over: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  click() {
    this.clicked.emit(this.direction);
  }
}
