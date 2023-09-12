import { Component, Input, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessDirective } from '../../directives/control-value-access.directive';
import { CSSelect } from 'src/app/model/common/select';
import { DropDownListComponent } from '@progress/kendo-angular-dropdowns';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting : forwardRef(()=>SelectComponent),
      multi:true,
    }
  ]
})
export class SelectComponent<T> extends ControlValueAccessDirective<T>  {
  @Input() InputId = ""
  @Input() DataOptions : CSSelect[] = [];
  @Input() customErrorMessages : Record<string,string> | null = {};
  @Input() TooltipContent : Record<string,string[]> = {};
  public selectedData: CSSelect;

  @ViewChild("dropdownlist") public dropdownlist: DropDownListComponent;
  public defaultData: CSSelect= {
    Value: "Select",
    ID: null,
  };
  handleDataChange(value:any) {
    this.selectedData = value;
  }
  public onClose(event: any) {
    event.preventDefault();
    // setTimeout(() => {
    //   if (
    //     !this.dropdownlist.wrapper.nativeElement.contains(
    //       document.activeElement
    //     )
    //   ) {
    //     this.dropdownlist.toggle(false);
    //   }
    // });
  }
}
