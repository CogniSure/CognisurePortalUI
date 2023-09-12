import {
  ViewContainerRef,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Injector,
  Input,
  ApplicationRef,
} from '@angular/core';
import { CustomTooltipComponent } from '../generic/tooltip/tooltip.component';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {
  constructor(
    private elementRef: ElementRef,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document,
    private appRef : ApplicationRef,
    private containerRef : ViewContainerRef
  ) {}
  
  private tooltipComponentRef?: ComponentRef<any>;
  @Input() TooltipContent: Record<string,string[]> = {};

  @HostListener('mouseover')
  onMouseOver() {
    if (this.tooltipComponentRef) {
      return;
    }
    this.tooltipComponentRef = this.containerRef.createComponent(CustomTooltipComponent);
    this.setTooltipComponentProperties();
    this.tooltipComponentRef.hostView.detectChanges();
  }

  @HostListener('mouseout')
  onMouseOut() {
    if (!this.tooltipComponentRef) {
      return;
    }
    this.appRef.detachView(this.tooltipComponentRef.hostView)
    this.tooltipComponentRef.destroy();
    this.tooltipComponentRef = undefined;
  }
  private setTooltipComponentProperties() {
    if (!this.tooltipComponentRef) {
      return;
    }
    this.tooltipComponentRef.instance.TooltipContent = this.TooltipContent;
    const { left, right,top, bottom } =
      this.elementRef.nativeElement.getBoundingClientRect();
    this.tooltipComponentRef.instance.Left ="50rem";
    this.tooltipComponentRef.instance.Top = top;
  }
}
