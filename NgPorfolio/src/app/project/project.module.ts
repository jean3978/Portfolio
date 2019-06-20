import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDashboardComponent } from './components/project-dashboard/project-dashboard.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { ProjectRoutingModule } from './project-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProjectCategorieComponent } from './components/project-categorie/project-categorie.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';

@NgModule({
  declarations: [
    ProjectDashboardComponent,
    ProjectCardComponent,
    ProjectCategorieComponent,
    ProjectDetailComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule
  ],
  entryComponents: [
    ProjectDetailComponent
  ]
})
export class ProjectModule { }
