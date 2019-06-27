import { Directive, ViewContainerRef, ComponentFactoryResolver, HostListener, ComponentRef, Input } from '@angular/core';
import { TooltipBoxComponent } from './tooltip-box.component';
import { TooltipBoxConfig } from './tooltip-config';

@Directive({
  selector: '[appTooltipBox]'
})
export class TooltipBoxDirective {

  @Input() config: TooltipBoxConfig;

  private componentRef: ComponentRef<TooltipBoxComponent> = null;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) { }

  @HostListener('mouseenter') onMouseEnter() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TooltipBoxComponent);
    this.componentRef = this.viewContainerRef.createComponent(componentFactory);
    this.componentRef.instance.changeConfig(this.config);
  }
 
  @HostListener('mouseleave') onMouseLeave() {
    this.componentRef.destroy();
  }
  

}
