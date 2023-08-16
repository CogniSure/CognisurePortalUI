import { Component, Injector, Input } from '@angular/core';
import { InjectToken } from 'src/app/model/dashboard/injecttoken';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { DataComponent } from 'src/app/model/samples/data';
import { WidgetComponentInfo } from 'src/app/model/widgets/widgetComponentInfo';
import { BoxDetails, ComponentDetails } from 'src/app/model/constants/widgetinfo';
import { DashboardService } from 'src/app/services/dashboard/dashboardservice';
import { GlobalService } from 'src/app/services/common/global.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  public custComponents: WidgetComponentInfo[] = [];
  reloadReq = true;
  @Input() collapsed = false;
  componentOrder: any;
  isFullScreen = false;
  widgetTemp:any;
  constructor( private injector: Injector,private globalService:GlobalService,private dbService : DashboardService) {
    //this.globalService.setDashboardReload(true);
  }
  animationClass = "slide-effect-x"
  ngAfterViewInit() {
    // this.globalService.dashboardFilter$.subscribe(x=>{
    //   if(x.ReloadRequired){
        
    //     this.globalService.setDashboardReload(false);
    //   }
    // })
    this.globalService.animationClass$.next("");
    console.log("ng after view init -summary")
    
  }

  ngOnInit(): void {
    console.log("ngOn Init -summary")
    this.globalService.animationClass$.next("slide-effect-x");
    this.componentOrder = DataComponent.Datahub;
    this.custComponents = [];
    var i = 1;
    this.componentOrder.forEach((entry: any) => {
      this.custComponents.push({
        ColWidth: BoxDetails.get(entry.BoxType)!,
        Widget: ComponentDetails.get(entry.WidgetType)![0],
        WidgetName: entry.WidgetName,
        WidgetType : entry.WidgetType,
        Header: entry.Header,
        BoxClass: entry.BoxType,
        Fullscreen : entry.Fullscreen,
        ColumnId :  entry.ColumnId,
        ColumnSpan :  entry.ColumnSpan,
        RowSpan :  entry.RowSpan,
        HeaderColor : entry.HeaderColor,
        FontColor : entry.FontColor
      });
      i++;
    });
  }
  getBodyClassBox(bodyClass: string): string {
    return bodyClass;
  }
  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
    this.globalService.setDashboardReload(false);
  }
  createInjector(header:string,widgetType:string):any {
    console.log("Create Injector -summary : " + this.reloadReq)
    var myInjector: Injector;
    let widgetInput:WidgetInput =
    {
      WidgetName : header,
      Api : "",
      ReloadRequired:this.reloadReq,
      WidgetType: widgetType
    }
    myInjector = Injector.create(
      {
        providers: [{provide: InjectToken, useValue: widgetInput}], 
        parent: this.injector,
        name : header
        }
      );
      //this.reloadReq = false;
    return myInjector;
      }
}
