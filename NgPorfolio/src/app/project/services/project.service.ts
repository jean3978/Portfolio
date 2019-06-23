import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public dashboardElementRef: ElementRef;

  constructor() { }
}
