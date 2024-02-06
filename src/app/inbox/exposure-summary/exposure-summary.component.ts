import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { DataComponent } from 'src/app/model/samples/data';
import { CacheService } from 'src/app/services/common/cache.service';
import { WidgetService } from 'src/app/services/widget/widget.service';
import { InjectToken } from 'src/app/model/dashboard/injecttoken';
import { WidgetComponentInfo } from 'src/app/model/widgets/widgetComponentInfo';
import { ComponentDetails } from 'src/app/model/constants/widgetinfo';

@Component({
  selector: 'app-exposure-summary',
  templateUrl: './exposure-summary.component.html',
  styleUrls: ['./exposure-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExposureSummaryComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  ///...Properties...///
  componentOrder: any;
  public custComponents: WidgetComponentInfo[] = [];

  constructor(
    private injector: Injector,
    private widgetService: WidgetService,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
    this.getWidgets();
  }
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}
  getWidgets() {
    this.componentOrder = DataComponent.ExposureSummaryHub;
    this.custComponents = [];
    var i = 1;
    this.componentOrder.forEach((entry: any) => {
      this.custComponents.push({
        Widget: ComponentDetails.get(entry.WidgetType)![0],
        WidgetName: entry.WidgetName,
        WidgetType: entry.WidgetType,
        Header: entry.Header,
        ColumnId: entry.ColumnId,
        ColumnSpan: entry.ColumnSpan,
        RowSpan: entry.RowSpan,
        HeaderColor: entry.HeaderColor,
        FontColor: entry.FontColor,
        CustomInjector :  this.createInjector(entry)
      });
      i++;
    });
  }
  createInjector(config: any): any {
    var myInjector: Injector;
      let widgetInput: WidgetInput = {
        WidgetName: config.WidgetName,
        WidgetType: config.WidgetType,
        WidgetHeader:config.WidgetHeader,
        Settings : config.Settings,
        // {
        //   "LegendPosition" : "Right",
        //   "DataType" : "Number",
        //    NumberType : numberType
        // },
        Keys : [],
        DataSubject : this.cacheService.getExposureSummary(config.WidgetName)
      };
      myInjector = Injector.create({
        providers: [{ provide: InjectToken, useValue: widgetInput }],
        parent: this.injector,
        name: config.WidgetName,
      });
  
      return myInjector;
    //})
    
  }
}
