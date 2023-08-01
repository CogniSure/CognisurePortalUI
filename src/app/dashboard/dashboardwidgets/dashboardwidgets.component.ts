import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Injectable,
  Injector,
  Input,
  OnInit,
} from '@angular/core';
import { DataComponent } from '../../model/data';
import { WidgetComponentInfo } from '../../model/widgetComponentInfo';
import { BoxDetails, ComponentDetails } from '../../model/widgetinfo';
import { InjectToken } from 'src/app/model/dashboard/injecttoken';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { GlobalService } from 'src/app/services/global.service';
import { DashboardService } from 'src/app/services/dashboard/dashboardservice';


// Injectable()
@Component({
  selector: 'app-dashboardwidgets',
  templateUrl: './dashboardwidgets.component.html',
  styleUrls: ['./dashboardwidgets.component.scss'], 
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardwidgetsComponent implements OnInit,AfterViewInit {
  public custComponents: WidgetComponentInfo[] = [];
  reloadReq = true;
  @Input() collapsed = false;
  componentOrder: any;
  isFullScreen = false;
  widgetTemp:any;
  constructor( private injector: Injector,private globalService:GlobalService,private dbService : DashboardService) {
    //this.globalService.setDashboardReload(true);
  }
  ngAfterViewInit() {
    // this.globalService.dashboardFilter$.subscribe(x=>{
    //   if(x.ReloadRequired){
        
    //     this.globalService.setDashboardReload(false);
    //   }
    // })
    //this.globalService.setDashboardReload(false);
  }

  ngOnInit(): void {
   // this.globalService.setDashboardReload(true);
    this.componentOrder = DataComponent.Dashboardhub;
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
        ColumnSpan :  entry.ColumnId,
        RowSpan :  entry.ColumnId
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
  createInjector(header:string):any {
    var myInjector: Injector;
    let widgetInput:WidgetInput =
    {
      WidgetName : header,
      Api : "",
      ReloadRequired:this.reloadReq
    }
    myInjector = Injector.create(
      {
        providers: [{provide: InjectToken, useValue: widgetInput}], 
        parent: this.injector,
        name : header
        }
      );

    return myInjector;
      }
}
