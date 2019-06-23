import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TdMediaService } from '@covalent/core';
import { TranslateService } from '../core/services/translate.service';
import { slideInAnimation } from '../core/animations/animations';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [slideInAnimation]
})
export class MainComponent implements OnInit {

  navmenu: any[] = [
    //   {
    //   icon: 'face',
    //   title: 'nav.profil',
    //   route: '/',
    // }, 
    {
      icon: 'work',
      title: 'nav.project',
      route: '/project/dashboard',
    },
    // {
    //   icon: 'looks_3',
    //   title: 'nav.skill',
    //   route: '/skill/view',
    // }
  ];

  constructor(
    private _router: Router,
    public translateService: TranslateService,
    public mediaObserver: MediaObserver
  ) {
    this._router.navigateByUrl('/project/dashboard');
  }

  ngOnInit() {
  }

  navigate(route: string) {
    this._router.navigate([route]);
  }
}

