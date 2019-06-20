import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TranslateService } from './services/translate.service';
import { TranslatePipe } from '../shared/pipes/translate.pipe';
import { VideoService } from './services/video.service';
import { CookieService } from 'ngx-cookie-service';
import { NavigationService } from './services/navigation.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    TranslateService,
    VideoService,
    NavigationService,
    TranslatePipe,
    CookieService
  ]
})
export class CoreModule { }
