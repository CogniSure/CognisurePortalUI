import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InboxService {

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
}
