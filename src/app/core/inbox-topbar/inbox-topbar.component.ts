import { Component } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { InboxService } from 'src/app/services/inbox/inbox.service';
interface NavItem {
  title: string;
  routeLink: string;
  isPipeline?: boolean; 
  adress?: string; 
}
@Component({
  selector: 'app-inbox-topbar',
  templateUrl: './inbox-topbar.component.html',
  styleUrls: ['./inbox-topbar.component.scss']
})

export class InboxTopbarComponent {
  navItems = [
    { title: 'Duke & Duke', content: '885 Street, Warrnville, illinois 60555', icon: '' },
    { title: 'Hotel', content: '', icon: 'bed' },
    { title: '04/01/2023', routeLink: '/contact', icon: ' calendar_month' },
    { title: 'Property', routeLink: '/contact', icon: 'home' },
    { title: 'Hub International', routeLink: '/contact', icon: 'account_circle' },
    { title: 'Risk Clearence Pending', routeLink: '/contact', icon: '', pending1: 'E', pending2: 'C', pending3:'R' },
    { title: 'Action', routeLink: '', icon: '', icon1: '' }
  ];
  
 
  dropdownValues: string[] = [];
  isToggleOn: boolean = false;
  dropdownOptions: { label: string; link: string }[] = [];
  isDataAvailble = false;
  


  constructor(public inboxService: InboxService,  private router: Router) {}
  
  ngOnInit(): void {
    this.fetchDropdownOptions();
  }

  fetchDropdownOptions(): void {
    this.dropdownOptions = this.inboxService.getDropdownOptions();
  }

  onSelectOption(option: string): void {
   
  }

  toggleDropdown(): void {
    this.isToggleOn = !this.isToggleOn;
  }

  Logout() {
    this.router.navigate(['/login'], { queryParamsHandling: 'preserve' });
  }
  openMyMenu(menuTrigger: MatMenuTrigger) {
    menuTrigger.openMenu();
  }
  closeMyMenu(menuTrigger: MatMenuTrigger) {
    menuTrigger.closeMenu();
  }
}
