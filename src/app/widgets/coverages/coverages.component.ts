import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit,Inject } from '@angular/core';
import { GlobalService } from 'src/app/services/common/global.service';
import { PropertyBlanketSummary } from 'src/app/model/inbox/PropertyBlanketSummary';
import { CoverageData } from 'src/app/model/summary/CoverageData';
import { parseNumber } from '@progress/kendo-angular-intl';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { InjectToken } from 'src/app/model/dashboard/injecttoken';

@Component({
  selector: 'app-coverages',
  templateUrl: './coverages.component.html',
  styleUrls: ['./coverages.component.scss']
})
export class CoveragesComponent implements OnInit {
  exposureDetails: PropertyBlanketSummary[] = [];
  coverages: CoverageData[] = [];
  header : any = "";
  
  constructor(private changeDetector: ChangeDetectorRef,
    @Inject(InjectToken) private input: WidgetInput) {}
  Building = 0;
  Content = 0;
  BusinessIncome = 0;
  Other = 0;
  ngOnInit(): void {
    this.header = this.input.WidgetHeader;
    if (this.input.DataSubject != null){
      this.input.DataSubject.subscribe((inputData:any[])=>{
        if(inputData!=null && inputData.length>0){
          this.coverages = inputData;
        }
        this.changeDetector.detectChanges();
      })
    } 
  }
}
