import { Component, OnInit, HostListener, ViewContainerRef, ComponentFactoryResolver, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { TooltipBoxConfig } from './tooltip-config';

@Component({
  selector: 'app-tooltip-box',
  templateUrl: './tooltip-box.component.html',
  styleUrls: ['./tooltip-box.component.scss']
})
export class TooltipBoxComponent implements OnInit, AfterViewInit {

  @ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef;
  @ViewChild('container') container: ElementRef;

  containerDiv: HTMLDivElement = null;
  displayed: boolean = false;

  x = 0;
  y = 0;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit() {
  }
  
  ngAfterViewInit(): void {
    this.containerDiv = this.container.nativeElement;
    timer(10).subscribe(() => this.displayed = true);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(ev: MouseEvent) {

    const divHeight = this.containerDiv ? this.containerDiv.getBoundingClientRect().height + 30 : 0;
    const divWidth = this.containerDiv ? this.containerDiv.getBoundingClientRect().width + 30 : 0;

    const offsetY = window.innerHeight - ev.y > divHeight ? 30 : -divHeight;
    const offsetX = window.innerWidth - ev.x > divWidth ? 30 : -divWidth;

    this.x = ev.x + offsetX;
    this.y = ev.y + offsetY;
  }

  beforeDestroy(){
    this.displayed = false;
  }

  changeConfig(config: TooltipBoxConfig) {
    this.vc.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(config.component);
    const componentRef = this.vc.createComponent(componentFactory);
    config.properties.forEach(prop => {
      componentRef.instance[prop.name] = prop.value;
    });
  }
}
