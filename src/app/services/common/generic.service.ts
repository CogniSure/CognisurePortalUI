import { Injectable } from '@angular/core';
import { Reminder } from '../../model/common/reminder';

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

  notificationCount = 20;

  headerImageURL = '../../../assets/images/logo.png';
  topbarIconURL = '../../../assets/images/topbar_icon.svg';
  notificationIconURL = '../../../assets/images/notification.png';
  profileImageURL = '../../../assets/images/profile.png';
  defaultIconURL = '../../../assets/images/dropup_icon.png';
  alternateIconURL = '../../../assets/images/dropdown_icon.png';

  idToDisplay = 1;
  constructor() { }

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
}
