import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { Categorie, Project } from '../../../core/models/data';
import { DataService } from '../../../core/services/data.service';
import { timer, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { NavigationService } from '../../../core/services/navigation.service';

@Component({
  selector: 'app-project-categorie',
  templateUrl: './project-categorie.component.html',
  styleUrls: ['./project-categorie.component.scss']
})
export class ProjectCategorieComponent implements OnInit, AfterViewInit {


  @Input() categorie: Categorie;
  @ViewChild('translatableDiv') translatableDivChild: ElementRef;

  private translatableDiv: HTMLDivElement;
  private moveSubject = new Subject();

  projects: Project[] = [];

  leftArrowEnabled: boolean = false;
  rightArrowEnabled: boolean = false;

  arrowOver: any = null;
  translationPercent: number = 0;
  translationOffset: number = 0;

  constructor(
    public dataService: DataService,
    private changeDetectorRef: ChangeDetectorRef,
    public navigationService: NavigationService
  ) {

  }

  ngOnInit(): void {
    this.projects = this.dataService.loadedData.projects.filter(p => p.categorie == this.categorie.key);
  }

  ngAfterViewInit(): void {
    this.translatableDiv = this.translatableDivChild.nativeElement;
    this.evaluateHorizontalScroll();
    this.changeDetectorRef.detectChanges();
  }

  @HostListener('window:resize')
  resize() {
    this.evaluateHorizontalScroll();
  }

  evaluateHorizontalScroll() {
    // TODO fix this, won't work with margin and padding (window.innerWidth)
    this.rightArrowEnabled = this.translatableDiv.scrollWidth + this.translationOffset > window.innerWidth;
    this.leftArrowEnabled = this.translationOffset < 0;
  }

  move(direction: string) {
    this.moveSubject.next();
    // todo fix amount of translation depending on @media and clientsize
    this.translationPercent += (direction === 'left' ? 50 : -50);

    timer(1000).pipe(
      takeUntil(this.moveSubject),
      take(1)
    ).subscribe(() => {
      this.translationOffset = new WebKitCSSMatrix(window.getComputedStyle(this.translatableDiv).webkitTransform).m41;
      this.evaluateHorizontalScroll();
    });

  }
}
