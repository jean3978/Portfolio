import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app/core/services/translate.service';
import { FormControl } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.scss']
})
export class LanguagePickerComponent implements OnInit {

  languageControl = new FormControl();

  constructor(
    private _translateService: TranslateService
  ) {
    this._translateService.lang.pipe(take(1)).subscribe(v => this.languageControl.setValue(v));
    this.languageControl.valueChanges.subscribe(v => this._translateService.changeLanguage(v));
   }

  ngOnInit() {
  }

}
