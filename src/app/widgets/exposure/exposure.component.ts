import { ChangeDetectorRef, Component, OnInit,Inject, ChangeDetectionStrategy } from '@angular/core';
import { ExposureData } from '../../model/summary/exposuredata';
import { ExposureService } from '../../services/inbox/exposure.service';
import { GlobalService } from 'src/app/services/common/global.service';
import { parseNumber } from '@progress/kendo-angular-intl';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { InjectToken } from 'src/app/model/dashboard/injecttoken';

@Component({
  selector: 'app-exposure',
  templateUrl: './exposure.component.html',
  styleUrls: ['./exposure.component.scss']
})
export class ExposureComponent implements OnInit {
  totalinsuredvalue: string = 'Total Insured Value';
  totalincurredvalue: string = '';
  exposurelosses: any = '';
  exposureKeys:any[] = [];
  exposuredata: ExposureData[] = [{
    Total: 'NA',
    ExposureValue_1: 'NA',
    ExposureValue_2: 'NA',
    ExposureValue_3: 'NA',
  }];
  header : any = "";
  numberType : "";
  headerNumberType : "";
  constructor(@Inject(InjectToken) private input: WidgetInput,
  private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getExposureData();
  }

  getExposureData(): void {
    this.header = this.input.WidgetHeader;
    this.numberType = this.input.Settings.NumberType !=null? this.input.Settings.NumberType: "";
    this.headerNumberType = this.input.Settings.HeaderNumberType !=null? this.input.Settings.HeaderNumberType: "";
    this.exposureKeys = this.input.Keys;
    if (this.input.DataSubject != null){
      this.input.DataSubject.subscribe((inputData:any[])=>{
          
        if(inputData!=null && inputData.length>0){
          let data = inputData[0];
          this.exposuredata = [
                  {
                    Total: data.Total,
                    ExposureValue_1: data.ExposureValue_1,
                    ExposureValue_2: data.ExposureValue_2,
                    ExposureValue_3 : data.ExposureValue_3
                  },
                ];
          
        }
        this.changeDetector.detectChanges();
      })
    }
  }
}
