export interface Notifications{
    Id: number;
  Name:string;
  Description: string,
  AlertTypeID: number,
  IsNotificationRead: boolean,
  UserID: number,
  AccountID: number,
  IsActive: boolean,
  ModifiedOn: string,
  AddedOn: string,
  NotificationCount: number,
  AccountName: string
  Icon:string;
  Tooltip:string;
  //Status: string;
}