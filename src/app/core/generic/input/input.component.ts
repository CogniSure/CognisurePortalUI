import { Component,Injectable,Input,forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import { ControlValueAccessDirective } from '../../directives/control-value-access.directive';

type InputType = 'text' | 'number' | 'email' | 'password'
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
  @Input() inputId = ""
  @Input() label = "";
  @Input() type:InputType = "text";

  

  
  @Input() Width : string
  @Input() Placeholder : string
  @Input() Type : string
  @Input() Tooltip : any

  

}
