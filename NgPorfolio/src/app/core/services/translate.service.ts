import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  private _translations: { [key: string]: BehaviorSubject<string> } = {};
  private _lang: BehaviorSubject<string> = new BehaviorSubject(null);

  public get lang(): Observable<string> { return this._lang; }

  constructor(
    private _http: HttpClient
  ) {
    this.changeLanguage('fr');
  }

  changeLanguage(lang: string) {
    if (this._lang.value === lang) {
      return;
    }

    this._http.get(`/assets/i18n/${lang}.json`).subscribe(data => {
      Object.keys(data).forEach(k => {
        let item = data[k];
        if (item === 'MISSING') {
          item = '';
        }
        if (!this._translations[k]) {
          this._translations[k] = new BehaviorSubject(item);
        }
        else {
          this._translations[k].next(item);
        }
      });
    });

    this._lang.next(lang);
  }

  getTranslation(key: string): Observable<string> {
    if (!this._translations[key]) {
      this._translations[key] = new BehaviorSubject("### MISSING ###");
    }

    return this._translations[key] as Observable<string>;
  }
}
