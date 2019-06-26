import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PresentationModule } from './presentation/presentation.module';
import { ProjectModule } from './project/project.module';
import { SkillModule } from './skill/skill.module';


const routes: Routes = [
	{
		path: '',
		component: MainComponent,
		children: [
			// {
			// 	path: '',
			// 	loadChildren: () => PresentationModule,
			// },
			{
				path: 'project',
				loadChildren: () => ProjectModule,
			},
			{
				path: 'skill',
				loadChildren: () => SkillModule,
			},
		]
	}
];


@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
