import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProjectDashboardComponent } from './components/project-dashboard/project-dashboard.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';

const routes: Routes = [
	{
		path: 'dashboard',
		component: ProjectDashboardComponent
	},
	{
		path: 'detail/:key',
		component: ProjectDetailComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
	],
	exports: [
		RouterModule,
	]
})
export class ProjectRoutingModule { }
