import { Injectable, Pipe, PipeTransform } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
@Pipe({
  name: 'formatAmount'
})
export class FormatAmountPipe implements PipeTransform {

  transform(value: any, prefix : any = "", suffix : any = ""): any {
    if(value != null && value!=""){
      let amount = Number(value);
      
      let amountVal = ""
      if(amount !=null && !isNaN(amount)){
        amountVal = prefix + Math.round(amount).toLocaleString("en-US") + suffix
        return amountVal
      }
      return value;
    }
    return value;
  }

}
