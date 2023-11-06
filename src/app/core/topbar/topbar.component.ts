import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/services/common/generic.service';
import { CopilotComponent } from '../copilot/copilot.component';

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
  


  constructor(public genericService: GenericService,  private router: Router,public dialog: MatDialog, private cdRef:ChangeDetectorRef) {}
  
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


  openDialog() {
    const dialogRef = this.dialog.open(CopilotComponent);

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
