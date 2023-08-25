import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
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
    this.agencyData = this.agencyService.getAgencyData();
    //console.log("Enable Transition 1 : " +this.enableTransition)
    // this.globalService.animationClass$.subscribe((x)=>{
    //   this.animationClass = x
    // })
    // if(this.widgetInput!=null && !this.widgetInput.ReloadRequired){
      
    // }

      this.globalService.getCurrentSubmission().subscribe((sub) => {
        if(sub!=null && sub.value!= null)
        {
        this.summary = sub.value.account_Level_Info[0]
        console.log('Summary');
        console.log(sub.value);
        }
      });



  }
  ngAfterViewInit() {
    //console.log("Enable Transition 2 : " +this.enableTransition)
  }

  ngOnDestroy(){
    this.animationClass = "";
    //console.log("Enable Transition 3 : " +this.enableTransition)
  }
  ngOnChanges(changes: any){

  }



}
