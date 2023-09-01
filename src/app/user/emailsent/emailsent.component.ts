import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotPassword } from 'src/app/model/common/forgotpassword';
import { GlobalService } from 'src/app/services/common/global.service';
import { AccountService } from 'src/app/services/user/accounts.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-emailsent',
  templateUrl: './emailsent.component.html',
  styleUrls: ['./emailsent.component.scss']
})
export class EmailsentComponent implements OnInit {
  showSpinner = false;

  constructor(private globalService: GlobalService,
    private userService: AccountService,
    private router: Router) { }

  forgotPasswordInput : ForgotPassword
  env=environment;

  ngOnInit(): void {
    // this.globalService.password$.subscribe(x=>{
    //   this.forgotPasswordInput = x
    // });
  }
  // resetPassword() {
  //   this.showSpinner=true;
  //   //event.preventDefault();
  //   if (this.forgotPasswordInput.Email!=""){
  //   this.userService
  //     .forgotPassword({email:this.forgotPasswordInput.Email})
  //     .subscribe((res) => {
  //       if (res.success) {
  //         this.globalService.password$.subscribe(x=>x);
  //         this.globalService.password$.next(this.forgotPasswordInput);
  //         this.showSpinner=false;
  //         this.router.navigate(['/emailsent'], {
  //           queryParamsHandling: 'preserve',
  //         });
  //       }
  //     });
  //   }
  // }

}
