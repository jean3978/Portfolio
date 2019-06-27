import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillDashboardComponent } from './components/skill-dashboard/skill-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { SkillRoutingModule } from './skill.module-routing';
import { SkillDescriptionComponent } from './components/skill-description/skill-description.component';

@NgModule({
  declarations: [SkillDashboardComponent, SkillDescriptionComponent],
  imports: [
    CommonModule,
    SharedModule,
    SkillRoutingModule
  ], 
  entryComponents: [
    SkillDescriptionComponent
  ]
})
export class SkillModule { }
