import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { slideInAnimation } from '../../../core/animations/animations';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 1,
      })),
      state('closed', style({
        height: '100%',
        opacity: 0.5,
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class ProjectDashboardComponent implements OnInit {

  
  opened = null;

  constructor(
    public dataService: DataService
  ) { 

  }

  ngOnInit() {
  }

}