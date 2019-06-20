import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilComponent } from './components/profil/profil.component';
import { PresentationRoutingModule } from './presentation-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProfilComponent],
  imports: [
    CommonModule,
    SharedModule,
    PresentationRoutingModule
  ]
})
export class PresentationModule { }
