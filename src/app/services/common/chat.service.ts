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
    console.log("Chat message : " + question +" : "+ messageGuid )
    const length = question.length;
    const answer = `"${question}" contains exactly ${length} symbols.`;

    setTimeout(() => this.responses.next(answer), 1000);
  }

  AskCopilot(question: string,messageGuid:string){
    
    var apiUrl = this.env.baseUrl + 'api/UploadCopilotFIles';
    let hParams = new HttpParams();
    hParams = hParams.set('uniqId', messageGuid);
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