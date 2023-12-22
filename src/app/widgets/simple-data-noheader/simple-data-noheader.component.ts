import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { DashboardFilter } from 'src/app/model/dashboard/dashboardfilter';
import { InjectToken } from 'src/app/model/dashboard/injecttoken';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { WidgetService } from 'src/app/services/widget/widget.service';

@Component({
  selector: 'app-simple-data-noheader',
  templateUrl: './simple-data-noheader.component.html',
  styleUrls: ['./simple-data-noheader.component.scss']
})
export class SimpleDataNoheaderComponent implements OnInit, AfterViewInit {
  constructor(
    // private sanitizer: DomSanitizer,
    private dbService: WidgetService,
    @Inject(InjectToken) 
    private input: WidgetInput,
    private changeDetector: ChangeDetectorRef
  ) {}

  filter: DashboardFilter;
  simpleData: any = {
    ItemData : "",
    ItemValue : ""
  };
  ngOnInit(): void {
    
    if (this.input.DataSubject != null){ //&& this.input.Data.length > 0) {
      this.input.DataSubject.subscribe((data:any[])=>{
        if(data!=null && data.length > 0){
          this.simpleData = {
            ItemData : data[0].ItemData,
            ItemValue : data[0].ItemValue
          }
        }
        
        this.changeDetector.detectChanges();
      })
    }
  }
  ngAfterViewInit(): void {
    
  }
}
