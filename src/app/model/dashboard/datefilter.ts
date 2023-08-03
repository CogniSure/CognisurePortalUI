import { Accounts } from "../profile/accounts";

export interface DateFilter {
    ReloadRequired:boolean;
    FromDate: string;
    ToDate: string;
    PriorFromDate: string;
    PriorToDate: string;
    Account : Accounts
  }