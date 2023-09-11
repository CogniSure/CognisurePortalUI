import { Component,ElementRef,Injectable,Input,OnInit,ViewChild,forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import { ControlValueAccessDirective } from '../../directives/control-value-access.directive';

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
export class InputComponent<T> extends ControlValueAccessDirective<T>{
  @Input() InputId = ""
  @Input() PlaceHolder = "";
  @Input() Type:InputType = "text";
  @Input() customErrorMessages : Record<string,string> | null = {};
 

  @Input() Width : string
  @Input() Tooltip : any

  getControl(){
    console.log(this.control)
    return this.control;

  }

}
