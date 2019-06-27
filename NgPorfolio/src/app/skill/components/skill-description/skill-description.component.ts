import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/services/data.service';
import { Skill } from '../../../core/models/data';
import { TranslateService } from 'src/app/core/services/translate.service';

@Component({
  selector: 'app-skill-description',
  templateUrl: './skill-description.component.html',
  styleUrls: ['./skill-description.component.scss']
})
export class SkillDescriptionComponent implements OnInit {

  skillKey: string;
  skill: Skill;

  exp: string[] = [];

  constructor(
    private _dataService: DataService,
    private _translateService: TranslateService
  ) { }

  ngOnInit() {
    this._dataService.data.subscribe(data=> {
      this.skill = data.skills.find(s => s.key === this.skillKey);
      this._translateService.getTranslation(this.skill.experience).subscribe(value => {
        this.exp = value.split('$');
      })
    })
  }

}
