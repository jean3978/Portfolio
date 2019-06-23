import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private _openedProject = new BehaviorSubject<string>(null);

  get openedProject() { return this._openedProject as Observable<string>; }

  test: any;

  constructor(
    private _router: Router
  ) {

  }

  openProject(name: string) {
    this._openedProject.next(name);

    timer(2000).subscribe(() => this._openedProject.next(null));
  }
}
