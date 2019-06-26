import { Component, OnInit } from '@angular/core';
import { Skill, Data } from '../../../core/models/data';
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray, map, skipWhile, take } from 'rxjs/operators';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-skill-dashboard',
  templateUrl: './skill-dashboard.component.html',
  styleUrls: ['./skill-dashboard.component.scss']
})
export class SkillDashboardComponent implements OnInit {

  skills: ParsedSkillCategorie[] = [];

  constructor(
    private _dataService: DataService
  ) {

    this._dataService.data.pipe(
      skipWhile(d => !d),
      take(1)
    ).subscribe(data => this.parseSkill(data));
  }

  ngOnInit() {
  }

  parseSkill(data: Data) {
    from(data.skills).pipe(
      groupBy(u => u.skillCategorie),
      mergeMap(group => group.pipe(toArray(), map(a => a.sort((p1, p2) => p1.title < p2.title ? -1 : 1)))),
      map((group: Skill[]) => {
        const foundCategorie = data.skillCategories.find(c => c.key === group[0].skillCategorie);
        const parse: ParsedSkillCategorie = {
          categorieKey: foundCategorie.kName,
          order: foundCategorie.order,
          skills: group
        };
        return parse;
      }),
      toArray()
    ).subscribe((result: ParsedSkillCategorie[]) => {
      this.skills = result.sort((s1, s2) => s1.order > s2.order ? 1 : -1);
    });
  }
}

class ParsedSkillCategorie {
  order: string;
  categorieKey: string;
  skills: Skill[];
}