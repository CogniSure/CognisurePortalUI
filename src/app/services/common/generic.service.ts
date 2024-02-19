import { Injectable } from '@angular/core';
import { Reminder } from '../../model/common/reminder';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface NewsItem {
  title: string;
  content: string;
  imageUrl: string;
  readMoreLink: string;
}

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  // private dataUrl = '...';

  // private jsonDataSubject = new BehaviorSubject<any[]>([]);
  // jsonData$ = this.jsonDataSubject.asObservable();

  notificationCount = 20;

  headerImageURL = '../../../assets/images/Logo.svg';
  topbarIconURL = '../../../assets/icons/ConversationAIPilot.svg';
  notificationIconURL = '../../../assets/images/Notification.svg';
  profileImageURL = '../../../assets/images/profile.png';
  defaultIconURL = '../../../assets/images/dropup_icon.png';
  alternateIconURL = '../../../assets/images/dropdown_icon.png';

  idToDisplay = 1;
  constructor(private http: HttpClient) { }

  private dropdownOptions: { label: string; link: string }[] = [
    { label: 'My Profile', link: '/my-profile' },
    { label: 'Change Password', link: '/change-password' },
    { label: 'Notifications Settings', link: '/notifications-settings' },
    { label: 'Sign Out', link: '/sign-out' }
  ];

  getDropdownOptions(): { label: string; link: string }[] {
    return this.dropdownOptions;
  }
  newsItems: NewsItem[] = [
    {
      title: 'News 1',
      content: 'It is a long established fact that a reader will be distracted by the readable content of',
      imageUrl: '../../../assets/images/news1.png',
      readMoreLink: '/news/1'
    },
    {
      title: 'News 2',
      content: 'It is a long established fact that a reader will be distracted by the readable content of ',
      imageUrl: '../../../assets/images/news2.png',
      readMoreLink: '/news/2'
    },
  ];
  getReminders(): Reminder[] {

    return [
      { title: 'Submission #1234 / Adams & Co.', time: new Date(), status: 'pending' },
      { title: 'Submission #1234 / Adams & Co.', time: new Date(), status: 'quoted' },
      { title: 'Submission #1234 / Adams & Co.', time: new Date(), status: 'waiting' },
      
      { title: 'Submission #1234 / Adams & Co.', time: new Date(), status: 'pending' },
      { title: 'Submission #1234 / Adams & Co.', time: new Date(), status: 'quoted' },
      { title: 'Submission #1234 / Adams & Co.', time: new Date(), status: 'waiting' },
    ];
  }




  // private dummyData = [
  //   {
  //     "Meta Data_lineOfBusiness": "Business Type B",
  //     "Account_Level_Info/Producer_Fullname": "Broker A",
  //     "Count of Submission ID": 25,
  //   },
  //   {
  //     "Meta Data_lineOfBusiness": "Business Type A",
  //     "Account_Level_Info/Producer_Fullname": "Broker B",
  //     "Count of Submission ID": 18,
  //   },
  //   {
  //     "Meta Data_lineOfBusiness": "Business Type B",
  //     "Account_Level_Info/Producer_Fullname": "Broker A",
  //     "Count of Submission ID": 30,
  //   }
  // ];

  // setData(newData: any[]): void {
  //   this.jsonDataSubject.next(newData);
  // }

  // getData(): Observable<any> {
    // return this.http.get<any>(this.dataUrl);
  //   return of(this.dummyData);

  // }





  // private jsonDataSubject = new BehaviorSubject<any[]>([
  //   {
  //     "Dimension": "GL",
  //     "Measure": 25,
   
  //   },
  //   {
  //     "Dimension": "Property",
  //     "Measure": 18,
     
  //   },
  //   {
  //     "Dimension": "Liablity",
  //     "Measure": 30,
      
  //   }
  // ]);

  // jsonData$ = this.jsonDataSubject.asOblservable();


}





