import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { subreportIcon } from '@progress/kendo-svg-icons';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { GlobalService } from 'src/app/services/common/global.service';
import { AgencyService } from 'src/app/services/inbox/agency.service';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent implements OnInit,AfterViewInit,OnDestroy,OnChanges{
  // agencynamevalue: string = 'ACE Insurance';
  // agencycodevalue: string = 'A548889';
  // producer: string = 'John Kelly';
  // produceremail: any = 'jkelly@aceinsurance.com';
  // phone: string = '312-987-3456';
  // activityrank: string = '234 / 4389';

  summary : any={};
  animationClass = "slide-effect-x";
  agencyData: any; 
  @Input() widgetInput:WidgetInput
  constructor(private agencyService: AgencyService,private globalService : GlobalService) {}

  ngOnInit() {
    //this.agencyData = this.agencyService.getAgencyData();
   
    // this.globalService.animationClass$.subscribe((x)=>{
    //   this.animationClass = x
    // })
    // if(this.widgetInput!=null && !this.widgetInput.ReloadRequired){
      
    // }

      this.globalService.getCurrentSubmission().subscribe((sub) => {
        if(sub!=null && subreportIcon!= null)
        {
        // this.summary = sub.Account_Level_Info[0]
       
        }
      });



  }
  ngAfterViewInit() {
  }

  ngOnDestroy(){
    this.animationClass = "";
  }
  ngOnChanges(changes: any){

  }



}
