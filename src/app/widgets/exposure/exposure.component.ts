import { ChangeDetectorRef, Component, OnInit,Inject } from '@angular/core';
import { ExposureData } from '../../model/summary/exposuredata';
import { ExposureService } from '../../services/inbox/exposure.service';
import { GlobalService } from 'src/app/services/common/global.service';
import { parseNumber } from '@progress/kendo-angular-intl';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { InjectToken } from 'src/app/model/dashboard/injecttoken';

@Component({
  selector: 'app-exposure',
  templateUrl: './exposure.component.html',
  styleUrls: ['./exposure.component.scss'],
})
export class ExposureComponent implements OnInit {
  totalinsuredvalue: string = 'Total Insured Value';
  totalincurredvalue: string = '';
  exposurelosses: any = '$27,654,321';
  exposuredata: ExposureData[] = [{
      BuildingsCount: "0",
      LocationsCount: "0",
      StatesCount: "0",
      TIV : "0"
  }];
  constructor(@Inject(InjectToken) private input: WidgetInput,
  private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getExposureData();
  }

  getExposureData(): void {

    if (this.input.DataSubject != null){
      this.input.DataSubject.subscribe((inputData:any[])=>{
          
        if(inputData!=null && inputData.length>0){
          let data = inputData[0];
          this.exposuredata = [
                  {
                    BuildingsCount: data.BuildingsCount,
                    LocationsCount: data.LocationsCount,
                    StatesCount: data.StatesCount,
                    TIV : data.TIV
                  },
                ];
          
        }
        this.changeDetector.detectChanges();
      })
    }
  }
}
