import { Component, OnInit } from '@angular/core';
// import { HeaderComponent } from '../../core/headers/header/header.component';
import { environment } from 'src/environments/environment'



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor() { }
  env=environment;
  imageObject:any;
  enableSlideButton=false;
  myOptions = {
    'placement': 'right',
    'showDelay': 2,
    'hideDelay': 2,
    'width':'180px',
    'tooltip-class':'tooltipCss'
  }
  passwordInfo = `<div class="size"><b>Password must consists of</b><ul><li>Min 1 Special Character</li><li>Min 1 Upper Character</li><li >Min 1 Lower Character</li><li>Min 1 numeric Character</li><li>Length of password should be between 8 and 24</li></ul></div>`
  ngOnInit(): void {
 
  }

  imageClickHandler(val:any) {
    this.enableSlideButton = val;
  }

  imagesrc = 'assets/images/registrationsample1.jpg';
  imagesrc1 = 'assets/images/registrationsample2.jpg';
  imagesrc2 = 'assets/images/registrationsample3.jpg';
  imagesrc3 = 'assets/images/email.png';
  imagesrc4 = 'assets/images/password.png';


}
