import { ChangeDetectorRef, Component, Inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/services/common/generic.service';
import { CopilotComponent } from '../copilot/copilot.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserProfile } from 'src/app/model/profile/userprofile';
import { GlobalService } from '../../services/common/global.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  @Input() showSubmissionId: boolean = false;
  dropdownValues: string[] = [];
  isToggleOn: boolean = false;
  dropdownOptions: { label: string; link: string }[] = [];
  isDataAvailble = false;

  constructor(
    public genericService: GenericService,
    private router: Router,
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private auth: AuthService,
    private globalService: GlobalService,
    private sanitizer: DomSanitizer,
    
  ) {
    this.showSubmissionId = this.showSubmissionId;
  }

  defaultProfile = false;
  imageSource: any;
  public userDetail: UserProfile = {
    UserID: 0,
    FirstName: '',
    MiddleName: '',
    LastName: '',
    Password: '',
    PhoneNumber: '',
    Email: '',
    ClientID: 0,
    ClientName: '',
    UserTypeName: '',
    UserTypeID: 0,
    ClientCode: '',
    IsAdmin: false,
    UserImage: '',
  };

  subscription: Subscription;
  size = 32;

  ngOnInit(): void {
    this.fetchDropdownOptions();
    this.getUserDetail();
  }

  fetchDropdownOptions(): void {
    this.dropdownOptions = this.genericService.getDropdownOptions();
  }

  onSelectOption(option: string): void {}

  toggleDropdown(): void {
    this.isToggleOn = !this.isToggleOn;
  }

  Logout() {
    this.auth.logout();
    this.router.navigate(['/login'], { queryParamsHandling: 'preserve' });
  }
  openMyMenu(menuTrigger: MatMenuTrigger) {
    menuTrigger.openMenu();
  }
  closeMyMenu(menuTrigger: MatMenuTrigger) {
    menuTrigger.closeMenu();
  }

  openDialog() {
    // const dialogRef = this.dialog.open(CopilotComponent);
    const dialogRef = this.dialog.open(CopilotComponent, {
      data: {
        showSubmissionId: true // Pass the parameter to hide the "Submission ID - Account Name" section
      }
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  getUserDetail() {
    this.userDetail = this.globalService.getUserProfile();
    if (this.userDetail.UserImage != null && this.userDetail.UserImage != '') {
      this.defaultProfile = false;
      this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(
        `data:image/png;base64, ${this.userDetail.UserImage}`
      );
    } else this.defaultProfile = true;
  }



}
