import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TdMediaService } from '@covalent/core';
import { Project } from '../../../core/models/data';
import { timer, Subject, BehaviorSubject, combineLatest, interval } from 'rxjs';
import { takeUntil, takeWhile, take, filter } from 'rxjs/operators';
import { VideoService } from '../../../core/services/video.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';
import { NavigationService } from '../../../core/services/navigation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit {

  @Input() public project: Project;
  @ViewChild('videoPlayer') set content(content: ElementRef) {
    if (content) {
      this.videoPlayer.next(content.nativeElement);
    }
  }

  private mouseOverSubject = new Subject();
  private mouseLeftSubject = new Subject();
  private fadeVolumeSubject = new Subject();

  private videoPlayer = new BehaviorSubject<HTMLVideoElement>(null);
  private maxVolume = 0.7;

  isOpen = true;
  over: boolean;
  enlarge: boolean;
  showVideo: boolean = false;
  playtime: number = 0;
  validVideo: boolean = false;

  // custom modal
  @ViewChild('root') root: ElementRef;
  transformStyle: SafeStyle; 

  constructor(
    private changeDetector: ChangeDetectorRef,
    public videoService: VideoService,
    private sanitizer: DomSanitizer,
    public navigationService: NavigationService,
    private router: Router
    // public media: TdMediaService
  ) {
    // media.registerQuery('gt-sm').subscribe(v => console.log(v))
    // console.log(media);
    // this.t = this.sanitizer.bypassSecurityTrustStyle(`translate3d(0,0,0) scale(1,1)`);
  }

  ngOnInit() {
    this.validVideo = this.project.srcVideo !== undefined && this.project.srcVideo !== null && this.project.srcVideo !== "";
  }

  public toggle() {
    this.isOpen = !this.isOpen;
  }

  mouseOver() {
    this.over = true;

    this.changeDetector.detectChanges();
    this.videoPlayer.pipe(
      take(1),
      takeUntil(this.mouseLeftSubject),
      filter(v => v !== undefined && v !== null)
    ).subscribe(v => {
      v.volume = 0;
      v.load()
      v.currentTime = this.playtime;
    });

    this.mouseOverSubject.next();

    combineLatest(timer(300), this.videoPlayer).pipe(
      take(1),
      takeUntil(this.mouseLeftSubject),
      filter(v => v[1] !== undefined && v[1] !== null)
    ).subscribe(v => {
      this.showVideo = this.validVideo;
      this.enlarge = true;
      v[1].play();
      this.fadeVolume(this.maxVolume);
    });
  }

  mouseLeave() {
    this.over = false;
    this.enlarge = false;
    this.fadeVolume(0);

    this.mouseLeftSubject.next();

    combineLatest(timer(1000), this.videoPlayer).pipe(
      take(1),
      takeUntil(this.mouseOverSubject),
      filter(v => v[1] !== undefined && v[1] !== null)
    ).subscribe(v => {
      this.playtime = v[1].currentTime;
      this.showVideo = false;
    });
  }

  fadeVolume(target: number) {
    if (this.videoService.muted) {
      target = 0;
    }

    const fadeSpeed = 0.01;

    this.fadeVolumeSubject.next();

    const sign = this.videoPlayer.value.volume > target ? -1 : 1;

    interval(10).pipe(
      takeUntil(this.fadeVolumeSubject),
      takeWhile(() => this.videoPlayer.value !== undefined && this.videoPlayer.value !== null),
      takeWhile(() => this.videoPlayer.value.volume !== target)
    ).subscribe(() => {
      let value = this.videoPlayer.value.volume + sign * fadeSpeed;
      if (sign > 0 && value > target ||
        sign < 0 && value < target) {
        this.videoPlayer.value.volume = target;
      } else {
        this.videoPlayer.value.volume = value;
      }
    })
  }

  toogleMute() {
    this.videoService.toogleMute();
    this.fadeVolume(this.videoService.muted ? 0 : this.maxVolume);
  }

  click() {
    const div: HTMLDivElement = this.root.nativeElement;

    var rect = div.getBoundingClientRect();

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const tx = centerX - x;
    const ty = centerY - y;

    this.transformStyle = this.sanitizer.bypassSecurityTrustStyle(`translate3d(${tx}px,${ty}px,-5px) scale(5,5)`);
    this.navigationService.openProject(this.project.key);

    this.fadeVolume(0);
    timer(1000).subscribe(() => this.router.navigateByUrl(`/project/detail/${this.project.key}`))
  }
}

