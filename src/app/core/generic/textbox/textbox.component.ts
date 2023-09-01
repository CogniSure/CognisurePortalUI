import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AnyARecord } from 'dns';
import { CSTextBox } from 'src/app/model/common/textbox';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent implements OnInit, OnDestroy{
  @Input() Input : CSTextBox
  @Input() Width : string
  @Input() Placeholder : string
  @Input() Type : string
  @Input() Tooltip : any

  @Output() Text : string
  constructor(){

  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
