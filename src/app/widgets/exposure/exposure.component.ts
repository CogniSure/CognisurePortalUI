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
  exposurelosses: any = '';
  exposureKeys:any[] = [];
  exposuredata: ExposureData[] = [{
      Item_1: "0",
      Item_2: "0",
      Item_3: "0",
      Item_4 : "0"
  }];
  header : any = "";
  constructor(@Inject(InjectToken) private input: WidgetInput,
  private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getExposureData();
  }

  getExposureData(): void {
    this.header = this.input.WidgetHeader;
    this.exposureKeys = this.input.Keys;
    console.log("Exposure Keys")
    console.log(this.input.Keys)
    if (this.input.DataSubject != null){
      this.input.DataSubject.subscribe((inputData:any[])=>{
          
        if(inputData!=null && inputData.length>0){
          let data = inputData[0];
          this.exposuredata = [
                  {
                    Item_1: data.BuildingsCount,
                    Item_2: data.LocationsCount,
                    Item_3: data.StatesCount,
                    Item_4 : data.TIV
                  },
                ];
          
        }
        this.changeDetector.detectChanges();
      })
    }
  }
}
