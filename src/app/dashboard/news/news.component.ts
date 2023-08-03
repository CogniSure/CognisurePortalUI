import { Component } from '@angular/core';
import { GenericService,NewsItem } from 'src/app/services/common/generic.service';
// import { News } from '../../model/newsinfo';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {

  newsItems: NewsItem[] = [];

  constructor(private newsService: GenericService) { }

  ngOnInit(): void {
    this.newsItems = this.newsService.newsItems;
  }
}
