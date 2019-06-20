import { Routes, RouterModule } from '@angular/router';
import { ProfilComponent } from './components/profil/profil.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
	{
		path: '',
		component: ProfilComponent
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
export class PresentationRoutingModule { }
