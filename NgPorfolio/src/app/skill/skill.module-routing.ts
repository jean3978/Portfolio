import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SkillDashboardComponent } from './components/skill-dashboard/skill-dashboard.component';

const routes: Routes = [
	{
		path: 'view',
		component: SkillDashboardComponent
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
export class SkillRoutingModule { }
