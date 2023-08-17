import { Component } from '@angular/core';
import { SelectEvent } from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {
  public onTabSelect(e: SelectEvent): void {
    console.log(e);
  }



  public columns: any =[
    {
      field: "ClaimNo",
      title: "Claim No.",
      width:40,
      type: "text",
      columnmenu:true,
      filterable : true,
      sortable:true
    },
    // {
    //   field: 'alerts',
    //   title: 'Alerts',
    //   type: 'alerts',
    //   columnmenu:false,
    //   sortable: false,
    //   groupable: true,
    // },
    {
      field: "PolicyEffectiveDate",
      // format: "{0:c}",
      title: "Policy Effective Date",
      width:150,
      type: "text",
      sortable:true,
      filterable : true,
      columnmenu:true,
    },
    {
        field: "LineOfBusiness",
        title: "Line of Business",
        type: "text",
        sortable:false,
        columnmenu:true,
        filterable : true,
      },
      {
        field: "LossDate",
        // format: "{0:c}",
        title: "Loss Date",
        type: "text",
        sortable:true,
        columnmenu:true,
        filterable : true,
      },
      {
        field: "ClaimReportDate",
        // format: "{0:c}",
        title: "Claim Report Date",
        type: "text",
        sortable:true,
        columnmenu:true,
        filterable : true,
      },
    {
        field: "LossLocation",
        title: "Loss Location",
        type: "text",
        sortable:false,
        columnmenu:true,
        filterable : true,
      },
      {
        field: "LossState",
        // format: "{0:c}",
        title: "Loss State",
        type: "text",
        sortable:true,
        columnmenu:true,
        filterable : true,
      },
      {
        field: "Carrier",
        // format: "{0:c}",
        title: "Carrier",
        type: "text",
        sortable:true,
        columnmenu:true,
        filterable : true,
      },
      {
        field: "PolicyNo",
        // format: "{0:c}",
        title: "Policy No.",
        type: "text",
        sortable:true,
        columnmenu:true,
        filterable : true,
      },
      {
        field: "ClaimantName",
        // format: "{0:c}",
        title: "Claimant Name",
        type: "text",
        sortable:true,
        columnmenu:true,
        filterable : true,
      },
      {
        field: "ClaimDescription",
        // format: "{0:c}",
        title: "Claim Description",
        type: "text",
        sortable:true,
        columnmenu:true,
        filterable : true,
      },
      {
        field: "ClaimStatus",
        // format: "{0:c}",
        title: "Claim Status",
        type: "text",
        sortable:true,
        columnmenu:true,
        filterable : true,
      },
      {
        field: "ValuationDate",
        // format: "{0:c}",
        title: "Valuation Date",
        type: "text",
        sortable:true,
        columnmenu:true,
        filterable : true,
      },
      {
        field: "IndemnityRes",
        // format: "{0:c}",
        title: "Indemnity Res.",
        type: "text",
        sortable:true,
        columnmenu:true,
        filterable : true,
      },
      {
        field: "ExpenseRes",
        // format: "{0:c}",
        title: "Expense Res.",
        type: "text",
        sortable:true,
        columnmenu:true,
        filterable : true,
      },
      {
        field: "IndemnityPaid",
        // format: "{0:c}",
        title: "Indemnity Paid",
        type: "text",
        sortable:true,
        columnmenu:true,
        filterable : true,
      },
      {
        field: "ExpensePaid",
        // format: "{0:c}",
        title: "Expense Paid",
        type: "text",
        sortable:true,
        columnmenu:true,
        filterable : true,
      },
      {
        field: "TotalIncurred",
        // format: "{0:c}",
        title: "Total Incurred",
        type: "text",
        sortable:true,
        columnmenu:true,
        filterable : true,
      }
  ];
   public tableData: any[]= 
   [
    {
      ClaimNo: "1900918971",
      PolicyEffectiveDate: "4/1/2020",
      LineOfBusiness: "Proeprty",
      LossDate: "08/11/2021",
      ClaimReportDate:"08/16/2021",
      LossLocation:"88500 US Highway OneTavernier FL 33070",
      LossState:"NY",
      Carrier: "Travelers",
      PolicyNo: "6043467853",
      ClaimantName: "Leonard Stiles",
      ClaimDescription: "Claimant alleges an insured tree fell on his property during a recentstorm, damaging a shed",
      ClaimStatus : "Closed",
      ValuationDate: "05/07/22",
      IndemnityRes:"$0.00",
      ExpenseRes:"$0.00",
      IndemnityPaid:"$0.00",
      ExpensePaid:"$0",
      TotalIncurred:"$0.00"
    },
    {
      ClaimNo: "1900918971",
      PolicyEffectiveDate: "4/1/2020",
      LineOfBusiness: "Proeprty",
      LossDate: "08/11/2021",
      ClaimReportDate:"08/16/2021",
      LossLocation:"88500 US Highway OneTavernier FL 33070",
      LossState:"NY",
      Carrier: "Travelers",
      PolicyNo: "6043467853",
      ClaimantName: "Leonard Stiles",
      ClaimDescription: "Claimant alleges an insured tree fell on his property during a recentstorm, damaging a shed",
      ClaimStatus : "Closed",
      ValuationDate: "05/07/22",
      IndemnityRes:"$0.00",
      ExpenseRes:"$0.00",
      IndemnityPaid:"$0.00",
      ExpensePaid:"$0",
      TotalIncurred:"$0.00"
    },
    {
      ClaimNo: "1900918971",
      PolicyEffectiveDate: "4/1/2020",
      LineOfBusiness: "Proeprty",
      LossDate: "08/11/2021",
      ClaimReportDate:"08/16/2021",
      LossLocation:"88500 US Highway OneTavernier FL 33070",
      LossState:"NY",
      Carrier: "Travelers",
      PolicyNo: "6043467853",
      ClaimantName: "Leonard Stiles",
      ClaimDescription: "Claimant alleges an insured tree fell on his property during a recentstorm, damaging a shed",
      ClaimStatus : "Closed",
      ValuationDate: "05/07/22",
      IndemnityRes:"$0.00",
      ExpenseRes:"$0.00",
      IndemnityPaid:"$0.00",
      ExpensePaid:"$0",
      TotalIncurred:"$0.00"
    },
    {
      ClaimNo: "1900918971",
      PolicyEffectiveDate: "4/1/2020",
      LineOfBusiness: "Proeprty",
      LossDate: "08/11/2021",
      ClaimReportDate:"08/16/2021",
      LossLocation:"88500 US Highway OneTavernier FL 33070",
      LossState:"NY",
      Carrier: "Travelers",
      PolicyNo: "6043467853",
      ClaimantName: "Leonard Stiles",
      ClaimDescription: "Claimant alleges an insured tree fell on his property during a recentstorm, damaging a shed",
      ClaimStatus : "Closed",
      ValuationDate: "05/07/22",
      IndemnityRes:"$0.00",
      ExpenseRes:"$0.00",
      IndemnityPaid:"$0.00",
      ExpensePaid:"$0",
      TotalIncurred:"$0.00"
    },
    {
      ClaimNo: "1900918971",
      PolicyEffectiveDate: "4/1/2020",
      LineOfBusiness: "Proeprty",
      LossDate: "08/11/2021",
      ClaimReportDate:"08/16/2021",
      LossLocation:"88500 US Highway OneTavernier FL 33070",
      LossState:"NY",
      Carrier: "Travelers",
      PolicyNo: "6043467853",
      ClaimantName: "Leonard Stiles",
      ClaimDescription: "Claimant alleges an insured tree fell on his property during a recentstorm, damaging a shed",
      ClaimStatus : "Closed",
      ValuationDate: "05/07/22",
      IndemnityRes:"$0.00",
      ExpenseRes:"$0.00",
      IndemnityPaid:"$0.00",
      ExpensePaid:"$0",
      TotalIncurred:"$0.00"
    },
    {
      ClaimNo: "1900918971",
      PolicyEffectiveDate: "4/1/2020",
      LineOfBusiness: "Proeprty",
      LossDate: "08/11/2021",
      ClaimReportDate:"08/16/2021",
      LossLocation:"88500 US Highway OneTavernier FL 33070",
      LossState:"NY",
      Carrier: "Travelers",
      PolicyNo: "6043467853",
      ClaimantName: "Leonard Stiles",
      ClaimDescription: "Claimant alleges an insured tree fell on his property during a recentstorm, damaging a shed",
      ClaimStatus : "Closed",
      ValuationDate: "05/07/22",
      IndemnityRes:"$0.00",
      ExpenseRes:"$0.00",
      IndemnityPaid:"$0.00",
      ExpensePaid:"$0",
      TotalIncurred:"$0.00"
    },
    {
      ClaimNo: "1900918971",
      PolicyEffectiveDate: "4/1/2020",
      LineOfBusiness: "Proeprty",
      LossDate: "08/11/2021",
      ClaimReportDate:"08/16/2021",
      LossLocation:"88500 US Highway OneTavernier FL 33070",
      LossState:"NY",
      Carrier: "Travelers",
      PolicyNo: "6043467853",
      ClaimantName: "Leonard Stiles",
      ClaimDescription: "Claimant alleges an insured tree fell on his property during a recentstorm, damaging a shed",
      ClaimStatus : "Closed",
      ValuationDate: "05/07/22",
      IndemnityRes:"$0.00",
      ExpenseRes:"$0.00",
      IndemnityPaid:"$0.00",
      ExpensePaid:"$0",
      TotalIncurred:"$0.00"
    },
    {
      ClaimNo: "1900918971",
      PolicyEffectiveDate: "4/1/2020",
      LineOfBusiness: "Proeprty",
      LossDate: "08/11/2021",
      ClaimReportDate:"08/16/2021",
      LossLocation:"88500 US Highway OneTavernier FL 33070",
      LossState:"NY",
      Carrier: "Travelers",
      PolicyNo: "6043467853",
      ClaimantName: "Leonard Stiles",
      ClaimDescription: "Claimant alleges an insured tree fell on his property during a recentstorm, damaging a shed",
      ClaimStatus : "Closed",
      ValuationDate: "05/07/22",
      IndemnityRes:"$0.00",
      ExpenseRes:"$0.00",
      IndemnityPaid:"$0.00",
      ExpensePaid:"$0",
      TotalIncurred:"$0.00"
    },
    {
      ClaimNo: "1900918971",
      PolicyEffectiveDate: "4/1/2020",
      LineOfBusiness: "Proeprty",
      LossDate: "08/11/2021",
      ClaimReportDate:"08/16/2021",
      LossLocation:"88500 US Highway OneTavernier FL 33070",
      LossState:"NY",
      Carrier: "Travelers",
      PolicyNo: "6043467853",
      ClaimantName: "Leonard Stiles",
      ClaimDescription: "Claimant alleges an insured tree fell on his property during a recentstorm, damaging a shed",
      ClaimStatus : "Closed",
      ValuationDate: "05/07/22",
      IndemnityRes:"$0.00",
      ExpenseRes:"$0.00",
      IndemnityPaid:"$0.00",
      ExpensePaid:"$0",
      TotalIncurred:"$0.00"
    },
    {
      ClaimNo: "1900918971",
      PolicyEffectiveDate: "4/1/2020",
      LineOfBusiness: "Proeprty",
      LossDate: "08/11/2021",
      ClaimReportDate:"08/16/2021",
      LossLocation:"88500 US Highway OneTavernier FL 33070",
      LossState:"NY",
      Carrier: "Travelers",
      PolicyNo: "6043467853",
      ClaimantName: "Leonard Stiles",
      ClaimDescription: "Claimant alleges an insured tree fell on his property during a recentstorm, damaging a shed",
      ClaimStatus : "Closed",
      ValuationDate: "05/07/22",
      IndemnityRes:"$0.00",
      ExpenseRes:"$0.00",
      IndemnityPaid:"$0.00",
      ExpensePaid:"$0",
      TotalIncurred:"$0.00"
    },
    {
      ClaimNo: "1900918971",
      PolicyEffectiveDate: "4/1/2020",
      LineOfBusiness: "Proeprty",
      LossDate: "08/11/2021",
      ClaimReportDate:"08/16/2021",
      LossLocation:"88500 US Highway OneTavernier FL 33070",
      LossState:"NY",
      Carrier: "Travelers",
      PolicyNo: "6043467853",
      ClaimantName: "Leonard Stiles",
      ClaimDescription: "Claimant alleges an insured tree fell on his property during a recentstorm, damaging a shed",
      ClaimStatus : "Closed",
      ValuationDate: "05/07/22",
      IndemnityRes:"$0.00",
      ExpenseRes:"$0.00",
      IndemnityPaid:"$0.00",
      ExpensePaid:"$0",
      TotalIncurred:"$0.00"
    },
    {
      ClaimNo: "1900918971",
      PolicyEffectiveDate: "4/1/2020",
      LineOfBusiness: "Proeprty",
      LossDate: "08/11/2021",
      ClaimReportDate:"08/16/2021",
      LossLocation:"88500 US Highway OneTavernier FL 33070",
      LossState:"NY",
      Carrier: "Travelers",
      PolicyNo: "6043467853",
      ClaimantName: "Leonard Stiles",
      ClaimDescription: "Claimant alleges an insured tree fell on his property during a recentstorm, damaging a shed",
      ClaimStatus : "Closed",
      ValuationDate: "05/07/22",
      IndemnityRes:"$0.00",
      ExpenseRes:"$0.00",
      IndemnityPaid:"$0.00",
      ExpensePaid:"$0",
      TotalIncurred:"$0.00"
    },
    {
      ClaimNo: "1900918971",
      PolicyEffectiveDate: "4/1/2020",
      LineOfBusiness: "Proeprty",
      LossDate: "08/11/2021",
      ClaimReportDate:"08/16/2021",
      LossLocation:"88500 US Highway OneTavernier FL 33070",
      LossState:"NY",
      Carrier: "Travelers",
      PolicyNo: "6043467853",
      ClaimantName: "Leonard Stiles",
      ClaimDescription: "Claimant alleges an insured tree fell on his property during a recentstorm, damaging a shed",
      ClaimStatus : "Closed",
      ValuationDate: "05/07/22",
      IndemnityRes:"$0.00",
      ExpenseRes:"$0.00",
      IndemnityPaid:"$0.00",
      ExpensePaid:"$0",
      TotalIncurred:"$0.00"
    },
    {
      ClaimNo: "1900918971",
      PolicyEffectiveDate: "4/1/2020",
      LineOfBusiness: "Proeprty",
      LossDate: "08/11/2021",
      ClaimReportDate:"08/16/2021",
      LossLocation:"88500 US Highway OneTavernier FL 33070",
      LossState:"NY",
      Carrier: "Travelers",
      PolicyNo: "6043467853",
      ClaimantName: "Leonard Stiles",
      ClaimDescription: "Claimant alleges an insured tree fell on his property during a recentstorm, damaging a shed",
      ClaimStatus : "Closed",
      ValuationDate: "05/07/22",
      IndemnityRes:"$0.00",
      ExpenseRes:"$0.00",
      IndemnityPaid:"$0.00",
      ExpensePaid:"$0",
      TotalIncurred:"$0.00"
    },
    {
      ClaimNo: "1900918971",
      PolicyEffectiveDate: "4/1/2020",
      LineOfBusiness: "Proeprty",
      LossDate: "08/11/2021",
      ClaimReportDate:"08/16/2021",
      LossLocation:"88500 US Highway OneTavernier FL 33070",
      LossState:"NY",
      Carrier: "Travelers",
      PolicyNo: "6043467853",
      ClaimantName: "Leonard Stiles",
      ClaimDescription: "Claimant alleges an insured tree fell on his property during a recentstorm, damaging a shed",
      ClaimStatus : "Closed",
      ValuationDate: "05/07/22",
      IndemnityRes:"$0.00",
      ExpenseRes:"$0.00",
      IndemnityPaid:"$0.00",
      ExpensePaid:"$0",
      TotalIncurred:"$0.00"
    },
    {
      ClaimNo: "1900918971",
      PolicyEffectiveDate: "4/1/2020",
      LineOfBusiness: "Proeprty",
      LossDate: "08/11/2021",
      ClaimReportDate:"08/16/2021",
      LossLocation:"88500 US Highway OneTavernier FL 33070",
      LossState:"NY",
      Carrier: "Travelers",
      PolicyNo: "6043467853",
      ClaimantName: "Leonard Stiles",
      ClaimDescription: "Claimant alleges an insured tree fell on his property during a recentstorm, damaging a shed",
      ClaimStatus : "Closed",
      ValuationDate: "05/07/22",
      IndemnityRes:"$0.00",
      ExpenseRes:"$0.00",
      IndemnityPaid:"$0.00",
      ExpensePaid:"$0",
      TotalIncurred:"$0.00"
    },
    {
      ClaimNo: "1900918971",
      PolicyEffectiveDate: "4/1/2020",
      LineOfBusiness: "Proeprty",
      LossDate: "08/11/2021",
      ClaimReportDate:"08/16/2021",
      LossLocation:"88500 US Highway OneTavernier FL 33070",
      LossState:"NY",
      Carrier: "Travelers",
      PolicyNo: "6043467853",
      ClaimantName: "Leonard Stiles",
      ClaimDescription: "Claimant alleges an insured tree fell on his property during a recentstorm, damaging a shed",
      ClaimStatus : "Closed",
      ValuationDate: "05/07/22",
      IndemnityRes:"$0.00",
      ExpenseRes:"$0.00",
      IndemnityPaid:"$0.00",
      ExpensePaid:"$0",
      TotalIncurred:"$0.00"
    },
    {
      ClaimNo: "1900918971",
      PolicyEffectiveDate: "4/1/2020",
      LineOfBusiness: "Proeprty",
      LossDate: "08/11/2021",
      ClaimReportDate:"08/16/2021",
      LossLocation:"88500 US Highway OneTavernier FL 33070",
      LossState:"NY",
      Carrier: "Travelers",
      PolicyNo: "6043467853",
      ClaimantName: "Leonard Stiles",
      ClaimDescription: "Claimant alleges an insured tree fell on his property during a recentstorm, damaging a shed",
      ClaimStatus : "Closed",
      ValuationDate: "05/07/22",
      IndemnityRes:"$0.00",
      ExpenseRes:"$0.00",
      IndemnityPaid:"$0.00",
      ExpensePaid:"$0",
      TotalIncurred:"$0.00"
    },
    {
      ClaimNo: "1900918971",
      PolicyEffectiveDate: "4/1/2020",
      LineOfBusiness: "Proeprty",
      LossDate: "08/11/2021",
      ClaimReportDate:"08/16/2021",
      LossLocation:"88500 US Highway OneTavernier FL 33070",
      LossState:"NY",
      Carrier: "Travelers",
      PolicyNo: "6043467853",
      ClaimantName: "Leonard Stiles",
      ClaimDescription: "Claimant alleges an insured tree fell on his property during a recentstorm, damaging a shed",
      ClaimStatus : "Closed",
      ValuationDate: "05/07/22",
      IndemnityRes:"$0.00",
      ExpenseRes:"$0.00",
      IndemnityPaid:"$0.00",
      ExpensePaid:"$0",
      TotalIncurred:"$0.00"
    }, 
    {
      ClaimNo: "1900918971",
      PolicyEffectiveDate: "4/1/2020",
      LineOfBusiness: "Proeprty",
      LossDate: "08/11/2021",
      ClaimReportDate:"08/16/2021",
      LossLocation:"88500 US Highway OneTavernier FL 33070",
      LossState:"NY",
      Carrier: "Travelers",
      PolicyNo: "6043467853",
      ClaimantName: "Leonard Stiles",
      ClaimDescription: "Claimant alleges an insured tree fell on his property during a recentstorm, damaging a shed",
      ClaimStatus : "Closed",
      ValuationDate: "05/07/22",
      IndemnityRes:"$0.00",
      ExpenseRes:"$0.00",
      IndemnityPaid:"$0.00",
      ExpensePaid:"$0",
      TotalIncurred:"$0.00"
    }
  ];

}
