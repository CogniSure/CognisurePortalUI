import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class CustomTooltipComponent {

  @Input() TooltipContent : Record<string,string[]> = {};
  
  @Input() Left = 0;
  
  @Input() Top = 0;
}
