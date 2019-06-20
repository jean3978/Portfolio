import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillDashboardComponent } from './components/skill-dashboard/skill-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { SkillRoutingModule } from './skill.module-routing';

@NgModule({
  declarations: [SkillDashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    SkillRoutingModule
  ]
})
export class SkillModule { }
