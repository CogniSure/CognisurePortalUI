import { Component } from "@angular/core";
import { AgencyComponent } from "src/app/widgets/agency/agency.component";
import { CoveragesComponent } from "../../widgets/coverages/coverages.component";
import { ExposureComponent } from "src/app/widgets/exposure/exposure.component";
import { LossesComponent } from "src/app/widgets/losses/losses.component";
import { BusinessOperationsComponent } from "src/app/widgets/business-operations/business-operations.component";
import { TotalLossesComponent } from "src/app/widgets/total-losses/total-losses.component";
import { XBarComponent } from "../../widgets/xbar/xbar.component";
import { YBarComponent } from "../../widgets/ybar/ybar.component";
import { PieComponent } from "../../widgets/pie/pie.component";
import { SimpleDataComponent } from "../../widgets/simple-data/simple-data.component";
import { FunnelComponent } from "src/app/widgets/funnel/funnel.component";
import { SimpleDataNoheaderComponent } from "src/app/widgets/simple-data-noheader/simple-data-noheader.component";


export interface Widgetinfo {
    id:number,
    BoxType:string,
    WidgetName:string,
    ApiURL:string
}
export const BoxDetails: Map<string,string> = new Map([
["LargeBox","col-md-4"],
["MediumBox","col-md-4"],
["SmallBox","col-md-4"]
]);


export const ComponentDetails:Map<string,any> = new Map([
    ["Agency",[AgencyComponent]],
    ["Coverages",[ CoveragesComponent]],
    ["Exposure",[ ExposureComponent]],
    ["Losses",[LossesComponent]], 
    ["BusinessOperations",[BusinessOperationsComponent]],
    ["Totallosses",[TotalLossesComponent]]  ,
    ["Xbar",[XBarComponent]]  ,
    ["Ybar",[YBarComponent]]  ,
    ["pie",[PieComponent]]  ,
    ["donut",[PieComponent]]  ,
    ["funnel",[FunnelComponent]]  ,
    ["SimpleData",[SimpleDataComponent]],
    ["SimpleDataWOHeader",[SimpleDataNoheaderComponent]]  
]);
