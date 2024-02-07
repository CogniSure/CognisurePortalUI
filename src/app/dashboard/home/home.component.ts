import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { SignalRService } from 'src/app/services/SignalR/signal-r.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @Input() showSubmissionId: boolean = true;
  constructor(public signalRService: SignalRService, private http: HttpClient) { }
  ngOnInit() {
    // this.signalRService.startConnection();
    // this.signalRService.addTransferChartDataListener();   
    // this.startHttpRequest();
  }
  
  private startHttpRequest = () => {
    this.http.get('https://localhost:7026/api/Notification')
      .subscribe(res => {
      })
  }
}
