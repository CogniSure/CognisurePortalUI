import { Directive, ElementRef, Renderer2 } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";

@Directive({
  selector: '[maximize]',
  exportAs: "maximize" 
})
export class MaximizeDirective {

  private isMaximizedSubject = new BehaviorSubject(false);
  isMaximized$ = this.isMaximizedSubject.pipe();
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  toggle() {
    this.isMaximizedSubject?.getValue() ? this.minimize() : this.maximize();
  }
  maximize() {
    if (this.el) {
      this.isMaximizedSubject.next(true);
      this.renderer.addClass(this.el.nativeElement, "fullscreen");
    }
  }
  minimize() {
    if (this.el) {
      this.isMaximizedSubject.next(false);
      this.renderer.removeClass(this.el.nativeElement, "fullscreen");
    }
  }
  toggleFullScreen(isMaximized : boolean)
  {
    if (isMaximized)
      this.maximize();
    else
      this.minimize();
  }
}
