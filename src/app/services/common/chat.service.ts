import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import { HttpService } from "./http.service";
import { AppConfigService } from "src/app/app-config-service";
import { UploadFile } from "src/app/model/common/uploadfile";

// Mock remote service

@Injectable()
export class ChatService {
  public readonly responses: Subject<string> = new Subject<string>();
  env = this.configService.settings;
  constructor(private httpService: HttpService, private configService:AppConfigService) {}
  public submit(question: string,messageGuid:string): void {
    const length = question.length;
    this.AskCopilot(messageGuid,question).subscribe((res:any)=>{
      
      var resultVal = JSON.parse(res.value)
      var result = resultVal[1]
      //const answer = `"${question}" contains exactly ${length} symbols.`;
      
      const answer = result;
      setTimeout(() => this.responses.next(answer), 1000);
    })
    
  }

  AskCopilot(messageGuid:string,question: string){
    var apiUrl = this.env.baseUrl + 'api/AskCopilot';
    let hParams = new HttpParams();
    hParams = hParams.set('uniqId', JSON.parse(messageGuid));
    hParams = hParams.set('message', question);
    return this.httpService.getData(apiUrl,hParams );
  }
  uploadCopilotFiles(files : any) : Observable<string>{
    var apiUrl = this.env.baseUrl + 'api/UploadCopilotFIles';
    let hParams = new HttpParams();
    // hParams = hParams.set('submissionid', submissionId);
    return this.httpService.postData(apiUrl,hParams,files );
  }
}