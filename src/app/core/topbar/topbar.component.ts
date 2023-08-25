import { Component } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/services/common/generic.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  dropdownValues: string[] = [];
  isToggleOn: boolean = false;
  dropdownOptions: { label: string; link: string }[] = [];
  isDataAvailble = false;
  


  constructor(public genericService: GenericService,  private router: Router) {}
  
  ngOnInit(): void {
    this.fetchDropdownOptions();
  }

  fetchDropdownOptions(): void {
    this.dropdownOptions = this.genericService.getDropdownOptions();
  }

  onSelectOption(option: string): void {
   
  }

  toggleDropdown(): void {
    this.isToggleOn = !this.isToggleOn;
  }

  Logout() {
    //this.auth.logout();
    this.router.navigate(['/login'], { queryParamsHandling: 'preserve' });
  }
  openMyMenu(menuTrigger: MatMenuTrigger) {
    menuTrigger.openMenu();
  }
  closeMyMenu(menuTrigger: MatMenuTrigger) {
    menuTrigger.closeMenu();
  }

  public opened = true;
  public dataSaved = false;

  public close(): void {
    this.opened = false;
  }

  public open(): void {
    this.opened = true;
  }
}
