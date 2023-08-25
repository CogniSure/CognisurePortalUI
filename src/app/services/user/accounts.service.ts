import { DatePipe } from "@angular/common";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, retry, throwError } from "rxjs";
import { UserProfile } from 'src/app/model/profile/userprofile';
// import { Accounts } from 'src/app/model/profile/accounts';
import { GlobalService } from '../common/global.service';
// import { ContactUs } from 'src/app/model/common/contactus';
import { LoginData } from 'src/app/model/common/logindata';
// import { ForgotPassword } from "src/app/model/common/forgotpassword";
import { FAResult } from "src/app/model/common/2faresult";
import { Accounts } from "src/app/model/profile/accounts";
import { HttpService } from "../common/http.service";
import { AppConfigService } from "src/app/app-config-service";
// import { News } from "src/app/model/common/news";
// import { NewsData } from "src/app/model/common/newsData";

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  
  constructor(private http: HttpService, private globalService:GlobalService ,private configService : AppConfigService) {
  }
  env = this.configService.settings;
  // getAcountDetails(apiUrl:string , userId:number){
  //   return this.http.getData(apiUrl+"accounts",userId).pipe(
  //     map((result)=>{
  //       const accounts:Accounts[] = [];
        
  //       result.value.forEach( (acc:any) => {
  //         const account:Accounts = {
  //           AccountID : acc.accountID,
  //           AccountName : acc.accountName,
  //           BenPortalLinks : acc.benePortalLinks.split(',')
  //         }
  //         accounts.push(account);
  //       });
  //       //this.globalService.setAccounts(accounts);
  //       return accounts
  //     }))
  // }
  // getAccountAdminProfile(apiUrl:string , email:string){
  //   return this.http.get<any>(apiUrl+"usersaccountmanagerdetails/"+email).pipe(
  //       map((result)=>{
  //           const profile : UserProfile = {
  //               UserID :result.value.userID,
  //               FirstName: result.value.firstName==null?"":result.value.firstName,
  //               MiddleName: result.value.middleName==null?"":result.value.middleName,
  //               LastName: result.value.lastName==null?"":result.value.lastName,
  //               Password: result.value.password,
  //               PhoneNumber: result.value.phoneNumber,
  //               Email: result.value.email,
  //               ClientID: result.value.clientID,
  //               ClientName: result.value.clientName,
  //               UserTypeName: result.value.userTypeName== null? "":result.value.userTypeName,
  //               UserTypeID: result.value.userTypeID,
  //               ClientCode: result.value.clientCode,
  //               IsAdmin : (result.value.userTypeID == 3 || result.value.userTypeID == 4)? true : false,
  //               UserImage : result.value.userImage
  //           }

  //           return profile
  //       })
  //   )
  // }
  /*
  getNews(userId : number) {
    return this.http.get<any>(this.env.apiUrl+"getallnewsfeed/"+userId).pipe(
      map((result)=>{
        const newsList:News[] = [];
        let counter = 0
        result.value.forEach( (acc:any) => {
          
          if(!this.isNewsCategoryExists(newsList,acc.newsCategory))
          {
           
            let newsData : NewsData= {
              TitleName : acc.titleName,
              Link : acc.link
            }
            const news:News = {
              NewsCategory : acc.newsCategory,
              NewsData : [newsData]
            }
            newsList.push(news);
          }
          else
          {
            
            // let newsData : NewsData= {
            //   TitleName : acc.titleName,
            //   Link : acc.link
            // }
            // newsList.filter(x=>x.NewsCategory === acc.newsCategory)[0].NewsData.push(newsData)
          }
          counter++;
        });
        return newsList
      }))
  }
  isNewsCategoryExists(newsList:News[],category:string){
    if(newsList.filter(x=>x.NewsCategory === category) != null && newsList.filter(x=>x.NewsCategory === category).length>0)
      return true;
    else
      return false;
  }
  forgotPassword({ email}: any): Observable<any>{
    var result;
    return this.http
    .post<any>(
      this.env.apiUrl+"forgotpassword/"+email,
      "",
      this.httpOptions
    ) .pipe(retry(1), catchError(this.errorHandl))
    
  }
  changePassword(userId: number, oldPassword:string, newPassword:string ): Observable<any>{
    return this.http
    .post<any>(
      //this.env.apiUrl+"changepassword/"+userId+"/"+oldPassword+"/"+JSON.stringify(newPassword),
      this.env.apiUrl+"changepassword/"+userId+"/"+encodeURIComponent(oldPassword)+"/"+encodeURIComponent(newPassword),
      "",
      this.httpOption1
    ) .pipe(retry(1), catchError(this.errorHandl))
    
  }

  resetPassword(login:ForgotPassword): Observable<any>{
    var result;
    return this.http
    .post<any>(
      this.env.apiUrl+"resetpassword/"+login.Email+"/"+encodeURIComponent(login.NewPassword),
      "",
      this.httpOptions
    ) .pipe(retry(1), catchError(this.errorHandl))
    
  }
  contactUs(contact:ContactUs) : Observable<any>{
    var result;
    let data :any = {
      "firstName":contact.FirstName,
      "middleName":contact.MiddleName!=""?contact.MiddleName:"",
      "lastName":contact.LastName,
      "email":contact.Email,
      "phoneNumber":contact.PhoneNumber!=""?contact.PhoneNumber:"",
      "message":contact.Message,
      "companyName":contact.CompanyName !=""?contact.CompanyName:"",
      "designation":contact.Designation!=""?contact.Designation:"",
      "interests":contact.Interests
    }
    return this.http
    .post<any>(
      this.env.apiUrl+"contactus",
      data,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    ) .pipe(retry(1), catchError(this.errorHandl))
    
  }
  Check2FAStatus(email: string): Observable<any> {
    
  var faResult :FAResult  = {
      value: "",
      success: false,
      failureCode: "",
      failureMessage: ""
    }
    return this.http
    .get<any>(
      this.env.apiUrl+"Is2faEnabled/"+email,
      this.httpOptions
    ) .pipe(
      map((result)=>{
        faResult = {
          value : result.value,
          success : result.success,
          failureCode : result.failureCode,
          failureMessage : result.failureMessage
        }
        return faResult
      }),
      retry(1), 
      catchError(this.errorHandl))
    
  }
  Send2FAEmail(email : string): Observable<any> {
    
    var result;
    return this.http
    .post<any>(
      this.env.apiUrl+"enable2fa/"+email,
      "",
      this.httpOptions
    ) .pipe(retry(1), catchError(this.errorHandl))
  }
  ValidateFACode(email:string, code:string){
    return this.http
    .get<any>(
      this.env.apiUrl+"validate2facode/"+email+"/"+code,
      this.httpOptions
    ) .pipe(
      map((result)=>{
        // faResult = {
        //   value : result.value,
        //   success : result.success,
        //   failureCode : result.failureCode,
        //   failureMessage : result.failureMessage
        // }
       return result
      }),
      retry(1), 
      catchError(this.errorHandl))
  }
  */
  login({ email, password }: any): Observable<any> {
    var apiUrl = this.env.baseUrl + "api/login?"
    var result;
    let hParams = new HttpParams();
    hParams = hParams.set('username', email);
    hParams = hParams.set('password', password);
    return this.http
    .postData(
      //this.env.apiUrl+"login?username="+email+"&password="+JSON.stringify(password),
      apiUrl,
      "",
      hParams
    )
    
  }
  
  getUserProfile(email:string){
    var apiUrl = this.env.baseUrl
    return this.http.getData(apiUrl+"api/userdetails/",email).pipe(
        map((result:any)=>{
            const profile : UserProfile = {
                UserID :result.value.userID,
                FirstName: result.value.firstName,
                MiddleName: result.value.middleName,
                LastName: result.value.lastName,
                Password: result.value.password,
                PhoneNumber: result.value.phoneNumber,
                Email: result.value.email,
                ClientID: result.value.clientID,
                ClientName: result.value.clientName,
                UserTypeName: result.value.userTypeName== null? "":result.value.userTypeName,
                UserTypeID: result.value.userTypeID,
                ClientCode: result.value.clientCode,
                IsAdmin : (result.value.userTypeID == 3 || result.value.userTypeID == 4)? true : false,
                UserImage : result.value.userImage
            }

            return profile
        })
    )
  }
  errorHandl(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => {
      return errorMessage;
    });
  }
}
