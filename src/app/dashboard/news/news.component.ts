import { Component } from '@angular/core';
import { GenericService,NewsItem } from 'src/app/services/common/generic.service';
// import { News } from '../../model/newsinfo';
import {
  PanelBarExpandMode,
  PanelBarStateChangeEvent,
} from "@progress/kendo-angular-layout";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
[x: string]: any;

  public expandMode: PanelBarExpandMode = 1;
  public height = 320;

  newsItems: NewsItem[] = [];

  constructor(private newsService: GenericService) { }

  ngOnInit(): void {
    this.newsItems = this.newsService.newsItems;
  }


  private baseImageUrl =
    "https://demos.telerik.com/kendo-ui/content/web/panelbar/";

  public imageUrl(imageName: string): string {
    return this.baseImageUrl + imageName + ".jpg";
  }

  public onPanelChange(event: PanelBarStateChangeEvent): void {
  }

}
