import { Dataset } from "./dataset";

export interface Dashboard {
    Labels:string[],
    Type:string,
    IsStack:string,
    PrefixOrSufix:number,
    XTag:string,
    YTag:string,
    PrefixOrSufixRight?:number
    YTagRight?:string
    Dataset:Dataset[]
}
