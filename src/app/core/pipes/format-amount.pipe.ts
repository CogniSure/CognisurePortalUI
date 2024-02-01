import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatAmount'
})
export class FormatAmountPipe implements PipeTransform {

  transform(value: any, numberType : any = ""): any {
    // let numberTypeVal = "";
    // if(numberType != "")
    //   numberTypeVal = numberType + " "
    if(value != null && value!=""){
      let amount = Number(value);
      
      let amountVal = ""
      if(amount !=null && !isNaN(amount)){
        amountVal = numberType + Math.round(amount).toLocaleString("en-US")
        return amountVal
      }
      return value;
    }
    return value;
  }

}
