import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Data, Project } from '../models/data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public loadedData: Data = new Data();

  public data = new BehaviorSubject<Data>(null);

  constructor(
    private _http: HttpClient
  ) {
    this._http.get('/assets/data.json').subscribe(data => {
      this.loadedData = Object.assign(new Data(), data);
      this.loadedData.projects.map(p => {
        const pro = Object.assign(new Project(), p);
        pro.parse()
        return pro;
      });
      this.data.next(this.loadedData);
    })
  }
}
