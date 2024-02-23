export interface SubmissionFile {
  // ID: number,
  // FileGUID : string,
  // FileName: string,
  // DocumentType: string,
  // Carrier : string
  // LineOfBusiness: string,
  // Status: string,
  // FileData : string

  ID: number;
  FileGUID: string;
  FileOriginalName: string;
  Carriers: string;
  LineOfBusinesses: string;
  FileStatus: string;
  ExtractionTime: string;
  DocumentType: string;
  DocumentCategory: string;
  FormNumber: string;
  FormVersion: string;
  FormEdition: string;
  StatusFlag: string;
  ValidationMessages: string;
  IsOCRed: string;
  IsMerged: string;
  IsScanned: string;
  IsJ2E7Succeeded: string;
  IsJ2E5Succeeded: string;
  IsOrigamiFileGenerated: string;
  IsUnknownMetaDataGenerated: string;
  IsMongoJsonDownloaded: string;
  IsInsightsReportDownloaded: string;
  IsInsightsReportDownloadAttempted: string;
  IsAcord130Flag: string;
  ModifiedOn: string;
  FileData: string;
  Options : any[];
}
export interface DownloadOption{
  DownloadCode : string ;
  Format : string;
  DownloadText : string;
  Tooltip : string;
  DownloadPath : string;
}