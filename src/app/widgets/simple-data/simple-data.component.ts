import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DashboardFilter } from 'src/app/model/dashboard/dashboardfilter';
import { InjectToken } from 'src/app/model/dashboard/injecttoken';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { WidgetService } from 'src/app/services/widget/widget.service';

@Component({
  selector: 'app-simple-data',
  templateUrl: './simple-data.component.html',
  styleUrls: ['./simple-data.component.scss'],
})
export class SimpleDataComponent implements OnInit, AfterViewInit {
  constructor(
    private sanitizer: DomSanitizer,
    private dbService: WidgetService,
    @Inject(InjectToken) private input: WidgetInput,
    private changeDetector: ChangeDetectorRef
  ) {}
  
  filter: DashboardFilter;
  simpleData: any;
  ngOnInit(): void {
    // this.simpleData = {
    //   ItemData_1 : 10000,
    //   IconItem_1 : this.getBase64Image(this.imageData),
    //   ItemData_2 : 50000,
    //   IconItem_2 : this.getBase64Image(this.imageData)
    // }

    this.dbService.getDashboard(this.input, this.filter).subscribe((res) => {
      console.log('Submissions');
      console.log(res);
      this.simpleData = {
        ItemData_1: res.ItemData_1,
        ItemIcon_1: this.getBase64Image(res.ItemIcon_1),
        ItemData_2: res.ItemData_2,
        ItemIcon_2: this.getBase64Image(res.ItemIcon_2),
      };
    });
  }
  getBase64Image(img: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `data:image/svg+xml;base64, ${img}`
    );
  }
  ngAfterViewInit(): void {}
}
