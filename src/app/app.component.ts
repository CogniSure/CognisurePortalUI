import { Component } from '@angular/core';
import { AppConfigService } from './app-config-service';
import { GlobalService } from './services/common/global.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [GlobalService],
})
export class AppComponent {
  title = 'Submission-Portal';
  constructor(private config : AppConfigService){
  }
}
