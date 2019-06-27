import { Directive, ViewContainerRef, ComponentFactoryResolver, HostListener, ComponentRef, Input } from '@angular/core';
import { TooltipBoxComponent } from './tooltip-box.component';
import { TooltipBoxConfig } from './tooltip-config';
import { timer, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appTooltipBox]'
})
export class TooltipBoxDirective {

  @Input() config: TooltipBoxConfig;

  private componentRef: ComponentRef<TooltipBoxComponent> = null;
  private buildSubject = new Subject();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.buildSubject.next();

    if (this.componentRef !== null) {
      this.componentRef.destroy();
    }

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TooltipBoxComponent);
    this.componentRef = this.viewContainerRef.createComponent(componentFactory);
    this.componentRef.instance.changeConfig(this.config);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.componentRef.instance.beforeDestroy();

    timer(200).pipe(
      take(1),
      takeUntil(this.buildSubject)
    ).subscribe(() => {
      this.componentRef.destroy()
      this.componentRef = null;
    });
  }


}
