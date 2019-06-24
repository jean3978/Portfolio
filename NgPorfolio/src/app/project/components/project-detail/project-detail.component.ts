import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { Project, Data, Credit } from '../../../core/models/data';
import { combineLatest, of, from } from 'rxjs';
import { skipWhile, take, groupBy, map, mergeMap, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  project: Project = null;
  tasks: string[] = [];
  techs: string[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _dataService: DataService
  ) {
    combineLatest(_dataService.data, _route.paramMap).pipe(
      skipWhile(c => !c[0] || !c[1]),
      take(1)
    ).subscribe(c => {
      this.project = c[0].projects.find(p => p.key === c[1].get('key'));
      this.tasks = c[0].projectTasks
        .filter(t => t.project === this.project.key)
        .map(t => t.description);
      this.techs = this.project.techLogos.split(';');
    });
  }

  ngOnInit() {
  }
}
