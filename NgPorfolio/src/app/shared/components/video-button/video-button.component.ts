import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-video-button',
  templateUrl: './video-button.component.html',
  styleUrls: ['./video-button.component.scss']
})
export class VideoButtonComponent implements OnInit {

  @Input() icon: string;
  @Input() size: number = 40;

  @Output() clicked: EventEmitter<any> = new EventEmitter();

  over: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

  click() {
    this.clicked.emit();
  }

}
