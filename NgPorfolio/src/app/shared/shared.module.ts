import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CovalentCommonModule,
  CovalentDataTableModule,
  CovalentDialogsModule,
  CovalentExpansionPanelModule,
  CovalentFileModule,
  CovalentLayoutModule,
  CovalentLoadingModule,
  CovalentMediaModule,
  CovalentMenuModule,
  CovalentMessageModule,
  CovalentNotificationsModule,
  CovalentPagingModule,
  CovalentSearchModule,
  CovalentStepsModule,
  CovalentVirtualScrollModule,
} from '@covalent/core';

import {
	MatButtonModule, MatCardModule, MatIconModule,
	MatListModule, MatMenuModule, MatTooltipModule,
	MatSlideToggleModule, MatInputModule, MatCheckboxModule,
	MatToolbarModule, MatSnackBarModule, MatSidenavModule,
	MatTabsModule, MatSelectModule, MatButtonToggleModule, MatDatepickerModule,
	MatNativeDateModule, MatProgressSpinnerModule, MatAutocompleteModule, MatDialogModule, MatRadioModule, MatGridListModule
} from '@angular/material';
import { FlexLayoutModule, } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from './pipes/translate.pipe';
import { LanguagePickerComponent } from './components/language-picker/language-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faGithub,
  faMediumM,
  faTwitter,
  faInstagram,
  faYoutube,
  faItchIo,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons';
import { VideoButtonComponent } from './components/video-button/video-button.component';
import { SliderArrowComponent } from './components/slider-arrow/slider-arrow.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NgArrayPipesModule, NgStringPipesModule } from 'angular-pipes';

library.add(
  faGithub,
  faMediumM,
  faTwitter,
  faInstagram,
  faYoutube,
  faItchIo,
  faLinkedin
);

const DEPENDENCIES_MODULES: any[] = [
	FlexLayoutModule
];

const MATERIAL_MODULES: any[] = [
	MatButtonModule, MatCardModule, MatIconModule,
	MatListModule, MatMenuModule, MatTooltipModule,
	MatSlideToggleModule, MatInputModule, MatCheckboxModule,
	MatToolbarModule, MatSnackBarModule, MatSidenavModule,
	MatTabsModule, MatSelectModule, MatButtonToggleModule, MatDatepickerModule,
	MatNativeDateModule, MatProgressSpinnerModule, MatAutocompleteModule, MatDialogModule,
	MatRadioModule, MatGridListModule
];

const COVALENT_MODULES: any[] = [
	CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
	CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
	CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
	CovalentCommonModule, CovalentDialogsModule, CovalentExpansionPanelModule,
	CovalentVirtualScrollModule, CovalentMessageModule, CovalentFileModule
];

const SHARED_COMPONENTS: any[] = [
  LanguagePickerComponent,
  VideoButtonComponent,
  SliderArrowComponent,
  CarouselComponent,
]

@NgModule({
  declarations: [
    TranslatePipe,
    SHARED_COMPONENTS,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgArrayPipesModule,
    NgStringPipesModule,
    MATERIAL_MODULES,
    // COVALENT_MODULES,
    DEPENDENCIES_MODULES,
  ],
  exports: [
    MATERIAL_MODULES,
    // COVALENT_MODULES,
    DEPENDENCIES_MODULES,
    SHARED_COMPONENTS,

    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    TranslatePipe,
    NgArrayPipesModule,
    NgStringPipesModule,
  ]
})
export class SharedModule { }
