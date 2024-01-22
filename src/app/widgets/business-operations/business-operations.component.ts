import { ChangeDetectorRef, Component, Inject} from '@angular/core';
import { InjectToken } from 'src/app/model/dashboard/injecttoken';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { BusinessOperation } from 'src/app/model/inbox/BusinessOperation';

@Component({
  selector: 'app-business-operations',
  templateUrl: './business-operations.component.html',
  styleUrls: ['./business-operations.component.scss']
})
export class BusinessOperationsComponent {
  isDataAvailable = false;
  riskData: any;

  businessOperation: BusinessOperation = {
    SIC: "NA",
    Naics: "NA",
    Descriptions: "NA"
  };
  constructor(private changeDetector: ChangeDetectorRef,
    @Inject(InjectToken) private input: WidgetInput) {}

  ngOnInit() {
    if (this.input.DataSubject != null){
      this.input.DataSubject.subscribe((inputData:any[])=>{
        
        if(inputData!=null && inputData.length>0){

          let accInfo = inputData[0];
          this.businessOperation = {
            SIC: accInfo.SIC,
            Naics: accInfo.Naics,
            Descriptions: accInfo.Descriptions
          };
          if (this.businessOperation) {
            // Data is available, set isDataAvailable to true
            this.isDataAvailable = true;
          } else {
            // No data available, set isDataAvailable to false
            this.isDataAvailable = false;
          }
        }
        this.changeDetector.detectChanges();
      })
    }
  }
}
