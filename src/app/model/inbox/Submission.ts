export interface Submission {
    Id: number,
    SubmissionID: string,
    SubmissionGUID: string,
    AccountName: string,
    EffectiveDate: string,
    Type: string,
    AgencyName: string,
    LOB: string,
    Priority: string,
    Status : string,
    AssignedBy: string,
    NewStatus: boolean,
    MessageId : string,
    ExtractionComplete : boolean,
    Completeness : boolean,
    RiskClearance : boolean,
}