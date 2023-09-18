import { Injectable } from '@angular/core';
import * as SignalR from '@microsoft/signalr'
import { AppConfigService } from 'src/app/app-config-service';
import { Notifications } from 'src/app/model/common/notifications';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  constructor(private configService:AppConfigService) { }
  public data: Notifications[];
  private hubConnection: signalR.HubConnection
    public startConnection = () => {
      this.hubConnection = new SignalR.HubConnectionBuilder()
                              .withUrl('https://localhost:7026/'+'notify')
                              .build();
      this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection: ' + err))
    }
    
    public addTransferChartDataListener = () => {
      this.hubConnection.on('transferchartdata', (data) => {
        this.data = data;
        console.log(data);
      });
    }
}
