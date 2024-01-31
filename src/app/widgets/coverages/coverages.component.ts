import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  Inject,
} from '@angular/core';
import { GlobalService } from 'src/app/services/common/global.service';
import { PropertyBlanketSummary } from 'src/app/model/inbox/PropertyBlanketSummary';
import { CoverageData } from 'src/app/model/summary/CoverageData';
import { parseNumber } from '@progress/kendo-angular-intl';
import { WidgetInput } from 'src/app/model/dashboard/widgetInput';
import { InjectToken } from 'src/app/model/dashboard/injecttoken';

@Component({
  selector: 'app-coverages',
  templateUrl: './coverages.component.html',
  styleUrls: ['./coverages.component.scss'],
})
export class CoveragesComponent implements OnInit {
  exposureDetails: PropertyBlanketSummary[] = [];
  coverages: CoverageData[] = [];
  header: any = '';
  
  displayedColumns = ['CoverageName', 'CoverageValue', 'CoverageType'];

  constructor(
    private changeDetector: ChangeDetectorRef,
    @Inject(InjectToken) private input: WidgetInput
  ) {}

  ngOnInit(): void {
    this.header = this.input.WidgetHeader;
    if (this.input.DataSubject != null) {
      this.input.DataSubject.subscribe((inputData: any[]) => {
        if (inputData != null && inputData.length > 0) {
          this.coverages = inputData;
        }
        this.changeDetector.detectChanges();
      });
    }
  }

  public pageSize = 3;
  public skip = 0;

    public goToPreviousPage(){
      if(this.skip !== 0){
          this.skip -= this.pageSize;
      }
    }

    public goToNextPage(){
      this.skip += this.pageSize;
    }
}
