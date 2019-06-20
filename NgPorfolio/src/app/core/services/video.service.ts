import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private _muted: boolean = false;

  get muted(): boolean { return this._muted; }

  constructor(
    private cookieService: CookieService
  ) {
    const saveMuted = this.cookieService.get('muteVideo');
    this._muted = saveMuted === '1';
  }

  toogleMute() {
    this._muted = !this._muted;
    this.cookieService.set('muteVideo', this._muted ? '1' : '0');
  }
}
