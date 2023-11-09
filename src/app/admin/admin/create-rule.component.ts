import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-rule',
  templateUrl: './create-rule.component.html',
  styleUrls: ['./create-rule.component.scss']
})
export class CreateRuleComponent {
  public view: Observable<any>;
  public RuleDetails : any[]=
  [
    {
      LHS : "LOB",
      Operands : "Equals",
      RHS : "GL"
    },
    {
      LHS : "Total_TIV",
      Operands : "Greter Than",
      RHS : "10000"
    },
  ];
  public formGroup: FormGroup;

  //private editService: EditService;
  private editedRowIndex: number;

  // constructor(@Inject(EditService) editServiceFactory: any) {
  //   this.editService = editServiceFactory();
  // }
  constructor(){

  }
  public resultGroup = new FormGroup({
    gender: new FormControl(null),
  });
  public ngOnInit(): void {
    // this.view = this.editService.pipe(map((data) => process(data, {})));

    // this.editService.read();
  }
  resultVal = "Green"
  public OperandsValue = ["Equals"];
  public RHSTypeValue = ["Free Text"]
  public complexValue = { text: "LOB", id: 2 };
  public complexArrayValue = [{ text: "Sofas", id: 2 }];
  public Operands: Array<string> = [
    "Equals",
    "Less Than",
    "Greter Than",
  ];
  public RHSType: Array<string> = [
    "Free Text",
    "CommonJSON"
  ];
  public Result: Array<string> = [
    "Green",
    "Amber",
    "Red"
  ];
  
  public ValidationConditions: Array<string> = [
    "Fail if any Failed",
    "Fail if all Failed",
    "Pass if any Passed",
    "Pass if all Passed"
  ];
  public ValidationRules : string[] = [
    "Missing data",
    "Reconciliation Issue",
    "Format Issue"
  ];
  public CognisureValidations: Array<string> = [
    "Select",
    "Missing data",
    "Reconciliation Issue",
    "Format Issue",
    "Invalid date",
    "Bad Data",
    "Bad Amount",
    "Invalid number",
    "Invalid check",
    "Others",
    "Non standard data",
    "Total Incurred Mismatch",
    "Claim Count Mismatch"
  ];
  public Condition : string[] = [
    "And",
    "Or"
  ]
  public treeItems: any[] = [
    {
      text: "Common",
      id: 1,
      items: [
        { text: "LOB", id: 2 },
        { text: "CS_Buildingoccupancy_Otheroccupanciesdescription", id: 9 },
        { text: "Commercialstructure_Physicaladdress_PostalCode", id: 10 }
      ],
    },
    {
      text: "Property_Other_Info",
      id: 3,
      items: [
        { text: "Total_Building_TIV", id: 4 },
        { text: "Total_BPP_TIV", id: 5 },
      ],
    },
    {
      text: "Property_Policy_Info_Premises_Information",
      id: 6,
      items: [
        { text: "Total_Building_TIV", id: 7 },
        { text: "Commercialproperty_Total_BPP_Limit", id: 8 },
      ],
    },
    {
      text: "GL_Policy_Info_Schedule_Of_Hazards",
      id: 7,
      items: [
        { text: "Generalliability_Hazard_Classification", id: 8 },
      ],
    },
  ];
}
