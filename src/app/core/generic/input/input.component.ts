import { AfterViewInit, Component,ElementRef,Injectable,Input,OnInit,ViewChild,forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import { ControlValueAccessDirective } from '../../directives/control-value-access.directive';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { SVGIcon, eyeIcon } from '@progress/kendo-svg-icons';

type InputType = 'text' | 'number' | 'email' | 'password' | 'area'
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting : forwardRef(()=>InputComponent),
      multi:true,
    }
  ]
})
export class InputComponent<T> extends ControlValueAccessDirective<T> implements AfterViewInit{
  @Input() InputId = ""
  @Input() PlaceHolder = "";
  @Input() Type:InputType = "text";
  @Input() customErrorMessages : Record<string,string> | null = {};
 

  @Input() Width : string
  @Input() TooltipContent : Record<string,string[]> = {};

  getControl(){
    return this.control;

  }
  @ViewChild("textbox") public textbox: TextBoxComponent;

  public eyeIcon: SVGIcon = eyeIcon;

  public ngAfterViewInit(): void {
    if(this.textbox != null)
    this.textbox.input.nativeElement.type = "password";
  }

  public toggleVisibility(): void {
    const inputEl = this.textbox.input.nativeElement;

    if (inputEl.type === "password") {
      inputEl.type = "text";
      setTimeout(() => {
        inputEl.type = "password"; 
      }, 3000);
    } else {
      inputEl.type = "password";
    }

    // if (inputEl.type === "password") {
    //   inputEl.type = "text";
    // } else {
    //   inputEl.type = "password";
    // }
  }

}
