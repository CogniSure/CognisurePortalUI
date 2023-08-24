import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, Subscriber, throwError } from 'rxjs';
//import { UserNotification } from 'src/app/model/Notification';
import { GlobalService } from '../common/global.service';
import { DataComponent } from 'src/app/model/samples/data';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // env = this.configService.settings;
  // constructor(private http: HttpClient,private configService:AppConfigService) {}
  // getAllNotification(userId: number,accountId:number): Observable<UserNotification[]> {
  //   var notifications: UserNotification[] = [];
  //   //notifications = DataComponent.Notifications;

  //   return this.http.get<any>(this.env.apiUrl+"getallnotifications/"+userId+"/"+accountId).pipe(
  //       map((result)=>{
    

  //         result.value.forEach( (acc:any) => {
  //           const notification:UserNotification = {
  //               Id: acc.notificationID,
  //               Name:acc.notificationName,
  //               Description: acc.description,
  //               AlertTypeID: acc.alertTypeID,
  //               IsNotificationRead: acc.isNotificationRead,
  //               UserID: acc.userID,
  //               AccountID: acc.accountID,
  //               IsActive: acc.isActive,
  //               ModifiedOn: acc.modifiedOn,
  //               AddedOn: acc.addedOn.replace('T','  '),
  //               NotificationCount: acc.notificationCount,
  //               AccountName: acc.accountName,
  //               Icon:"",
  //               Tooltip:"",
  //           }
  //           notifications.push(notification);
  //         });
  //     return notifications
  //   }))
  // }
  // dismissNotification(userId: number, accountId : number, notiId:number): Observable<any> {
  //   var result;
  //   if(notiId===0)
  //   {
  //   return this.http
  //     .put<any>(
  //       this.env.apiUrl + 'dismissallnotifications/' + userId + "/" + accountId,
  //       ''
  //     )
  //     .pipe(retry(1), catchError(this.errorHandl));
  //   }
  //   else{
  //     // let body = new HttpParams();
  //     // body = body.set('notificationId', notiId);
  //     return this.http
  //     .put<any>(
  //       this.env.apiUrl + 'dismissnotifications/' + userId + "/" + notiId + "/" + accountId,
  //       ''
  //     )
  //     .pipe(retry(1), catchError(this.errorHandl));
  //   }
  // }
  // readAllNotification(userId: number, accountId:number) {
  //   var result;
  //   return this.http
  //     .put<any>(
  //       this.env.apiUrl + 'readallnotifications/' + userId + "/" + accountId,
  //       ''
  //     )
  //     .pipe(retry(1), catchError(this.errorHandl));
  // }
  // errorHandl(error:any) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // Get client-side error
  //     errorMessage = error.error.message;
  //   } else {
  //     // Get server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   return throwError(() => {
  //     return errorMessage;
  //   });
  // }
}
