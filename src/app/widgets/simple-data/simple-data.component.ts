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
  imageData =
    'PHN2ZyB3aWR0aD0iMzMiIGhlaWdodD0iMjciIHZpZXdCb3g9IjAgMCAzMyAyNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuMjUgMjEuMzEyNkM5LjQwNzM2IDIxLjMxMjYgMTEuMTU2MiAxOS41NjM3IDExLjE1NjIgMTcuNDA2M0MxMS4xNTYyIDE1LjI0ODkgOS40MDczNiAxMy41MDAxIDcuMjUgMTMuNTAwMUM1LjA5MjY0IDEzLjUwMDEgMy4zNDM3NSAxNS4yNDg5IDMuMzQzNzUgMTcuNDA2M0MzLjM0Mzc1IDE5LjU2MzcgNS4wOTI2NCAyMS4zMTI2IDcuMjUgMjEuMzEyNlpNNy4yNSAyMS4zMTI2QzMuNzk4MjIgMjEuMzEyNiAxIDIzLjQxMTIgMSAyNi4wMDAxTTcuMjUgMjEuMzEyNkMxMC43MDE4IDIxLjMxMjYgMTMuNSAyMy40MTEyIDEzLjUgMjYuMDAwMSIgc3Ryb2tlPSIjMkQyRDJEIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik0yNiAyMS4zMTI2QzI4LjE1NzQgMjEuMzEyNiAyOS45MDYyIDE5LjU2MzcgMjkuOTA2MiAxNy40MDYzQzI5LjkwNjIgMTUuMjQ4OSAyOC4xNTc0IDEzLjUwMDEgMjYgMTMuNTAwMUMyMy44NDI2IDEzLjUwMDEgMjIuMDkzOCAxNS4yNDg5IDIyLjA5MzggMTcuNDA2M0MyMi4wOTM4IDE5LjU2MzcgMjMuODQyNiAyMS4zMTI2IDI2IDIxLjMxMjZaTTI2IDIxLjMxMjZDMjIuNTQ4MiAyMS4zMTI2IDE5Ljc1IDIzLjQxMTIgMTkuNzUgMjYuMDAwMU0yNiAyMS4zMTI2QzI5LjQ1MTggMjEuMzEyNiAzMi4yNSAyMy40MTEyIDMyLjI1IDI2LjAwMDEiIHN0cm9rZT0iIzJEMkQyRCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTYuNjI1IDguODEyNUMxOC43ODI0IDguODEyNSAyMC41MzEyIDcuMDYzNjEgMjAuNTMxMiA0LjkwNjI1QzIwLjUzMTIgMi43NDg4OSAxOC43ODI0IDEgMTYuNjI1IDFDMTQuNDY3NiAxIDEyLjcxODggMi43NDg4OSAxMi43MTg4IDQuOTA2MjVDMTIuNzE4OCA3LjA2MzYxIDE0LjQ2NzYgOC44MTI1IDE2LjYyNSA4LjgxMjVaTTE2LjYyNSA4LjgxMjVDMTMuMTczMiA4LjgxMjUgMTAuMzc1IDEwLjkxMTIgMTAuMzc1IDEzLjVNMTYuNjI1IDguODEyNUMyMC4wNzY4IDguODEyNSAyMi44NzUgMTAuOTExMiAyMi44NzUgMTMuNSIgc3Ryb2tlPSIjMkQyRDJEIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo=';
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
