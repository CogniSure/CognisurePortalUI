import {
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  Inject,
  Injectable,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  forwardRef,
  inject,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  Validators,
} from '@angular/forms';
import { Subject, distinctUntilChanged, startWith, takeUntil, tap } from 'rxjs';
@Directive({
  selector: '[appControlValueAccess]',
})
export class ControlValueAccessDirective<T>
  implements ControlValueAccessor, OnInit
{
  control: FormControl;
  isRequired = false;

  private _isDisabled$ = false;
  private _destroy$ = new Subject<void>();
  private _onTouched!: () => T;

  constructor(
    @Inject(Injector) private injector: Injector,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    try {
      const formControl = this.injector.get(NgControl);

      switch (formControl.constructor) {
        case FormControlName: {
          this.control = this.injector
            .get(FormGroupDirective)
            .getControl(formControl as FormControlName);
          break;
        }
        default: {
          this.control = (formControl as FormControlDirective)
            .form as FormControl;
          break;
        }
      }
    } catch (err) {
      this.control = new FormControl();
    }
    this.cdr.detectChanges();
  }

  writeValue(value: T): void {
    this.control
      ? this.control.setValue(value)
      : (this.control = new FormControl());
  }
  registerOnChange(fn: (val: T | null) => T): void {
    if (this.control?.touched) {
      this.control?.valueChanges
        .pipe(
          takeUntil(this._destroy$),
          startWith(this.control.value),
          distinctUntilChanged(),
          tap((val) => fn(val))
        )
        .subscribe(() => this.control?.markAsUntouched());
    }
  }
  registerOnTouched(fn: () => T): void {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this._isDisabled$ = isDisabled;
  }
}
