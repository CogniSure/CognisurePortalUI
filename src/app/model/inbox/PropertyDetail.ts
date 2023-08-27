export interface PropertyDetail {
  LocationNumber: string;
  BuildingNumber: string;
  BuildingName: string;
  FullAddress: string;
  YearBuilt: string;
  TotalArea: string;
  RoofType: string;
  NumberOfStories: string;
  TIV: string;
  Geolocation: string;
  Flood: string;
  Earthquake: string;
  NamedStorm: string;
  Hail: string;
  RoofAge: string;
  Construction: string;
  Occupancy: string;
  Protection: string;
  Wiring: string;
  Sprinkler: string;
  FireAlarm: string;
}
export interface ApplicationProperty extends PropertyDetail {
  BuildingNameAndOccupancy: string;
  City: string;
  State: string;
  ZipCode: string;
  Coinsurance: string;
  Valuation: string;
  Building: string;
  BPP: string;
  BusinessIncome: string;
  ExtraExpense: string;
  Contents: string;
  PersonalPropertyofOthers: string;
  Others: string;
  ISOConstructionType: string;
  NoOfStories:string;
  AlarmType: string;
  TotalInsuredValues: string;
}
