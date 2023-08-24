import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/common/global.service';
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

export class InboxTopbarComponent implements OnInit, OnDestroy {
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
  
  accountInformation : any={};
  propertyInformation : any={};

  constructor(public inboxService: InboxService,private globalService : GlobalService,   private router: Router) {}
  subscription: Subscription;
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  
  ngOnInit(): void {
    this.fetchDropdownOptions();
    this.subscription = this.globalService.getCurrentSubmission().subscribe((sub) => {
      if(sub!=null && sub!= null)
      {
      this.accountInformation = sub.value.account_Level_Info[0]
      this.propertyInformation = sub.value.property_Policy_Info_Blanket_Summary[0]
      }
    });
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
  Guidewire(){
      // var submissionId = "AAMkADU1NjU3NzEyLWMxZTItNDA5Yy04N2E0LTkzYWNjNTc3ZWVlMQBGAAAAAABFiQ8wy3CORZrMw-rLQJlFBwCM8fwoQTOCSY_HjadmsuvGAAAAAAEMAACM8fwoQTOCSY_HjadmsuvGAAKVXoPlAAA=";
      this.subscription = this.globalService.getCurrentSubmissionId().subscribe(submissionId=>{
        console.log("DownloadService")
        console.log(submissionId)
        this.inboxService.sendToGuidewire(submissionId).subscribe(downloadRes=>{
          console.log(downloadRes)
        });
        
        
      })
  }
}
