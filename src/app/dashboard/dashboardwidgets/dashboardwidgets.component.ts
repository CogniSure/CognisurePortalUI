import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Injectable,
  Injector,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DataComponent } from '../../model/samples/data';
import { WidgetComponentInfo } from '../../model/widgets/widgetComponentInfo';
import { BoxDetails, ComponentDetails } from '../../model/constants/widgetinfo';
import { InjectToken } from 'src/app/model/dashboard/injecttoken';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { GlobalService } from 'src/app/services/common/global.service';
import { DashboardService } from 'src/app/services/dashboard/dashboardservice';
import { WidgetService } from 'src/app/services/widget/widget.service';

// Injectable()
@Component({
  selector: 'app-dashboardwidgets',
  templateUrl: './dashboardwidgets.component.html',
  styleUrls: ['./dashboardwidgets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardwidgetsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  public custComponents: WidgetComponentInfo[] = [];
  reloadReq = true;
  @Input() collapsed = false;
  componentOrder: any;
  isFullScreen = false;
  widgetTemp: any;
  constructor(
    private injector: Injector,
    private widgetService: WidgetService,
    private globalService: GlobalService,
    private dbService: DashboardService
  ) {
    //this.globalService.setDashboardReload(true);
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    this.globalService.clearDashboardSession();
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
    const user = this.globalService.getUserProfile();
   

    //    const topNumber = '10';
    //    const clientId = user.ClientID;
    // const userEmailId = user.Email;
    // const startDate = '';
    // const endDate = '';
    const topNumber = '10';
    const clientId = '1074';
    const userEmailId = 'QBEsub@gmail.com';
    const startDate = '01/01/2023';
    const endDate = '9/30/2024';

    this.widgetService
      .getTopLocationsFromDB(
        topNumber,
        clientId,
        userEmailId,
        startDate,
        endDate,
        'countbycity'
      )
      .subscribe((topLocationSubject) => {
        if (topLocationSubject != null && topLocationSubject.success) {
          this.globalService.setTopLocation(topLocationSubject);
        } else {
          this.globalService.setTopLocation([]);
        }
      });

    this.widgetService
      .getTopLocationsbyStateFromDB(
        topNumber,
        clientId,
        userEmailId,
        startDate,
        endDate,
        'countbystate'
      )
      .subscribe((topLocationbyStateSubject) => {
        if (
          topLocationbyStateSubject != null &&
          topLocationbyStateSubject.success
        ) {
          this.globalService.setTopLocation(topLocationbyStateSubject);
        } else {
          this.globalService.setTopLocation([]);
        }
      });

    this.widgetService
      .getTopBrokersFromDB(
        topNumber,
        clientId,
        userEmailId,
        startDate,
        endDate,
        'countbybroker'
      )
      .subscribe((topBrokerSubject) => {
        if (topBrokerSubject != null && topBrokerSubject.success) {
          this.globalService.setTopBroker(topBrokerSubject);
        } else {
          this.globalService.setTopBroker([]);
        }
      });

    this.widgetService
      .getTopIndustriesFromDB(
        topNumber,
        clientId,
        userEmailId,
        startDate,
        endDate,
        'countbyindustries'
      )
      .subscribe((topIndustrySubject) => {
        if (topIndustrySubject != null && topIndustrySubject.success) {
          this.globalService.setTopIndustry(topIndustrySubject);
        } else {
          this.globalService.setTopIndustry([]);
        } 
      });

    this.widgetService
      .getSubmissionTurnaroundTimeFromDB(
        topNumber,
        clientId,
        userEmailId,
        startDate,
        endDate,
        'countbyturnaroundtime'
      )
      .subscribe((submissionTurnaroundTimeSubject) => {
        if (
          submissionTurnaroundTimeSubject != null &&
          submissionTurnaroundTimeSubject.success
        ) {
          this.globalService.setSubmissionTurnaroundTime(
            submissionTurnaroundTimeSubject
          );
        } else {
          this.globalService.setSubmissionTurnaroundTime([]);
        }
      });

    this.widgetService
      .getCoverageDistributionFromDB(
        topNumber,
        clientId,
        userEmailId,
        startDate,
        endDate,
        'countbylob'
      )
      .subscribe((coverageDistributionsSubject) => {
        if (
          coverageDistributionsSubject != null &&
          coverageDistributionsSubject.success
        ) {
          this.globalService.setCoverageDistributions(
            coverageDistributionsSubject.value
          );
        } else {
          this.globalService.setCoverageDistributions([]);
        }
      });
    this.widgetService
      .getSubmissionConversionsFromDB(
        topNumber,
        clientId,
        userEmailId,
        startDate,
        endDate,
        ''
      )
      .subscribe((submissionConversionsSubject) => {
        this.globalService.setSubmissionConversions(
          submissionConversionsSubject
        );
      });

    this.componentOrder = DataComponent.Dashboardhub;
    this.custComponents = [];
    var i = 1;
    this.componentOrder.forEach((entry: any) => {
      this.custComponents.push({
        //ColWidth: BoxDetails.get(entry.BoxType)!,
        Widget: ComponentDetails.get(entry.WidgetType)![0],
        WidgetName: entry.WidgetName,
        WidgetType: entry.WidgetType,
        Header: entry.Header,
        //BoxClass: entry.BoxType,
        //Fullscreen : entry.Fullscreen,
        ColumnId: entry.ColumnId,
        ColumnSpan: entry.ColumnSpan,
        RowSpan: entry.RowSpan,
        HeaderColor: entry.HeaderColor,
        FontColor: entry.FontColor,
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
  createInjector(header: string, widgetType: string): any {
    var myInjector: Injector;
    let widgetInput: WidgetInput = {
      WidgetName: header,
      Api: '',
      ReloadRequired: this.reloadReq,
      WidgetType: widgetType,
    };
    myInjector = Injector.create({
      providers: [{ provide: InjectToken, useValue: widgetInput }],
      parent: this.injector,
      name: header,
    });

    return myInjector;
  }
}
