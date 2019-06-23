import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { slideInAnimation } from '../../../core/animations/animations';
import { DataService } from '../../../core/services/data.service';
import { NavigationService } from '../../../core/services/navigation.service';
import { ProjectService } from '../../services/project.service';

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
export class ProjectDashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('dashboard') dashboard: ElementRef;

  opened = null;

  constructor(
    public dataService: DataService,
    public projectService: ProjectService
  ) {

  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.projectService.dashboardElementRef = this.dashboard;
  }
}