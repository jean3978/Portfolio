import { Component, OnInit, Input } from '@angular/core';
import { Project, Data, Credit } from '../../../core/models/data';
import { from } from 'rxjs';
import { skipWhile, take, groupBy, map, mergeMap, toArray } from 'rxjs/operators';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-project-credit',
  templateUrl: './project-credit.component.html',
  styleUrls: ['./project-credit.component.scss']
})
export class ProjectCreditComponent implements OnInit {

  @Input() projectKey: string;

  credits: ParsedCredit[] = [];

  constructor(
    private _dataService: DataService
  ) { }

  ngOnInit() {
    this._dataService.data.pipe(
      skipWhile(d => !d),
      take(1)
    ).subscribe(data => this.parseCredit(data));
  }

  parseCredit(data: Data) {
    from(data.credits.filter(c => c.project === this.projectKey)).pipe(
      groupBy(u => u.categorie),
      mergeMap(group => group.pipe(toArray(), map(a => a.sort((p1, p2) => p1.key < p2.key ? -1 : 1)))),
      map((group: Credit[]) => {
        const parse: ParsedCredit = {
          categorieKey: data.creditCategories.find(c => c.key === group[0].categorie).kName,
          members: group.map(g => g.key)
        };
        return parse;
      }),
      toArray()
    ).subscribe((result: ParsedCredit[]) => this.credits = result);
  }
}

class ParsedCredit {
  categorieKey: string;
  members: string[];
}
