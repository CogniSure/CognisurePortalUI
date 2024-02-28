import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartData } from 'src/app/model/charts/chartdata';
import { SubmissionInfo } from 'src/app/model/inbox/SubmissionInfo';
import { CacheService } from 'src/app/services/common/cache.service';
import { GlobalService } from 'src/app/services/common/global.service';
import { InboxService } from 'src/app/services/inbox/inbox.service';
import { AccountInformation } from 'src/app/model/inbox/AccountInformation';
import {
  DownloadOption,
  SubmissionFile,
  SubmissionFlags,
} from 'src/app/model/inbox/SubmissionFile';
import { UserProfile } from 'src/app/model/profile/userprofile';

@Component({
  selector: 'app-inbox-detail',
  templateUrl: './inbox-detail.component.html',
  styleUrls: ['./inbox-detail.component.scss'],
})
export class InboxDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  accountInformation: AccountInformation | null = null;
  submissionData: any;
  userProfile: UserProfile = {
    UserID: 0,
    FirstName: '',
    MiddleName: '',
    LastName: '',
    Password: '',
    PhoneNumber: '',
    Email: '',
    ClientID: 0,
    ClientName: '',
    UserTypeName: '',
    UserTypeID: 0,
    ClientCode: '',
    IsAdmin: false,
    UserImage: '',
  };

  constructor(
    private inboxService: InboxService,
    private globalService: GlobalService,
    private cacheService: CacheService
  ) {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.cacheService.clearSession();
  }

  ngOnInit(): void {
    this.userProfile = this.globalService.getUserProfile();

    this.subscription = this.globalService
      .getCurrentSubmissionId()
      .subscribe((subId: any) => {
        this.setSubmissionDetails(subId);
      });
  }

  setSubmissionDetails(submission: any) {
    // const clientId = '1074';
    // const submissionId = '6A2A02C3-BEA8-4EE9-957F-F4396EF0153A';
    // const email = 'submissiontesting@cognisure.ai';
    const clientId = this.userProfile.ClientCode;
    const email = this.userProfile.Email;
    const submissionGuid = submission.ClientSubmissionGUID;
    const submissionId = submission.SubmissionId;
    this.setHeader(email, clientId, submissionGuid);
    // this.setExposureSummary(email, clientId, submissionGuid);
    // this.setLossSummary(email, clientId, submissionGuid);
    this.setSubmissionFiles(email, clientId, submissionId);
  }
  setExposureSummary(email: string, clientId: string, submissionId: string) {
    this.inboxService
      .getExposureSummary('exposure_tiv', clientId, submissionId, email)
      .subscribe((res) => {
        if (res != null && res.value != null && res.value.length > 0) {
          this.cacheService.setExposureSummary('TIV', [
            {
              ItemData: 'TIV',
              ItemValue: res.value[0].measure,
            },
          ]);
        } else {
          this.cacheService.setExposureSummary('TIV', [
            {
              ItemData: 'TIV',
              ItemValue: ' $0',
            },
          ]);
        }
      });

    this.inboxService
      .getExposureSummary(
        'exposure_locationcount',
        clientId,
        submissionId,
        email
      )
      .subscribe((res) => {
        if (res != null && res.value != null && res.value.length > 0) {
          this.cacheService.setExposureSummary('NoOfLocations', [
            {
              ItemData: 'No. of Locations',
              ItemValue: res.value[0].measure,
            },
          ]);
        } else {
          this.cacheService.setExposureSummary('NoOfLocations', [
            {
              ItemData: 'No. of Locations',
              ItemValue: '0',
            },
          ]);
        }
      });

    this.inboxService
      .getExposureSummary(
        'exposure_buildingscount',
        clientId,
        submissionId,
        email
      )
      .subscribe((res) => {
        if (res != null && res.value != null && res.value.length > 0) {
          this.cacheService.setExposureSummary('NoOfBuildings', [
            {
              ItemData: 'No. of Buildings',
              ItemValue: res.value[0].measure,
            },
          ]);
        } else {
          this.cacheService.setExposureSummary('NoOfBuildings', [
            {
              ItemData: 'No. of Buildings',
              ItemValue: '0',
            },
          ]);
        }
      });

    this.inboxService
      .getExposureSummary(
        'exposure_constructiontype',
        clientId,
        submissionId,
        email
      )
      .subscribe((res) => {
        let cdata: ChartData = {
          Dimension: [],
          Data: [],
        };
        if (res != null && res.value != null && res.value.length > 0) {
          let dataArr = res.value;
          const mappedArr = dataArr.map((x: any) => {
            return {
              category: x.dimension,
              value: x.measure,
            };
          });
          cdata.Data = mappedArr;
          this.cacheService.setExposureSummary('ConstructionType', [cdata]);
        } else {
          this.cacheService.setExposureSummary('ConstructionType', []);
        }
      });

    this.inboxService
      .getExposureSummary(
        'exposure_occupancytype',
        clientId,
        submissionId,
        email
      )
      .subscribe((res) => {
        let cdata: ChartData = {
          Dimension: [],
          Data: [],
        };
        if (res != null && res.value != null && res.value.length > 0) {
          let dataArr = res.value;
          const mappedArr = dataArr.map((x: any) => {
            return {
              category: x.dimension,
              value: x.measure,
            };
          });
          cdata.Data = mappedArr;
          this.cacheService.setExposureSummary('OccupancyType', [cdata]);
        } else {
          this.cacheService.setExposureSummary('OccupancyType', []);
        }
      });

    this.inboxService
      .getExposureSummary('exposure_yearbuild', clientId, submissionId, email)
      .subscribe((res) => {
        let cdata: ChartData = {
          Dimension: [],
          Data: [],
        };
        if (res != null && res.value != null && res.value.length > 0) {
          let dataArr = res.value;
          const mappedArr = dataArr.map((x: any) => {
            return {
              category: x.dimension,
              value: x.measure,
            };
          });
          cdata.Data = mappedArr;
          this.cacheService.setExposureSummary('YearBuild', [cdata]);
        } else {
          this.cacheService.setExposureSummary('YearBuild', []);
        }
      });

    this.inboxService
      .getExposureSummary(
        'exposure_protectionclass',
        clientId,
        submissionId,
        email
      )
      .subscribe((res) => {
        let cdata: ChartData = {
          Dimension: [],
          Data: [],
        };
        if (res != null && res.value != null && res.value.length > 0) {
          let dataArr = res.value;
          const mappedArr = dataArr.map((x: any) => {
            return {
              category: x.dimension,
              value: x.measure,
            };
          });
          cdata.Data = mappedArr;
          this.cacheService.setExposureSummary('ProtectionClass', [cdata]);
        } else {
          this.cacheService.setExposureSummary('ProtectionClass', []);
        }
      });
  }
  setHeader(email: string, clientId: string, submissionId: string) {
    let accInfo: AccountInformation = {
      SubmissionId: '',
      NamedinsuredFullname: 'NA',
      FullAddress: 'NA',
      BusinessDescription: 'NA',
      BusinessType: 'NA',
      EffectiveDate: 'NA',
      OrganizationType: 'NA',
      YearStarted: 'NA',
      NumberOfEmployees: 'NA',
      SICCode: 'NA',
      Taxidentifier: 'NA',
      ContactName: 'NA',
      PhoneNumber: 'NA',
      Email: 'NA',
      ProducerFullname: 'NA',
      LOB: 'NA',
    };

    this.inboxService
      .getAccountInformationfromDB(
        'exposure_tiv',
        clientId,
        submissionId,
        email
      )
      .subscribe((res) => {
        if (res != null && res.value != null && res.value.length > 0) {
          res.value.forEach((data: any) => {
            if (data.dimension == 'SubmissionID')
              accInfo.SubmissionId = data.measure;
            if (data.dimension == 'Insured Name')
              accInfo.NamedinsuredFullname = data.measure;
            if (data.dimension == 'Address') {
              let addr = data.measure;
              accInfo.FullAddress = data.measure;
            }

            if (data.dimension == 'State and Zipcode')
              accInfo.SICCode = data.measure;
            if (data.dimension == 'LineOfBusiness') accInfo.LOB = data.measure;
            if (data.dimension == 'Min-PolicyEffDate')
              accInfo.EffectiveDate = data.measure;
          });

          this.cacheService.setAccountInformation(accInfo);
        }
      });
  }

  setLossSummary(email: string, clientId: string, submissionId: string) {
    this.inboxService
      .getLossSummary('loss_claimsbyLOBbyyear', clientId, submissionId, email)
      .subscribe((res) => {
        let cdata: ChartData[] = [
          {
            Dimension: [],
            Data: [],
          },
        ];

        if (res != null && res.value != null && res.value.length > 0) {
          cdata = this.getTranformedData(res);
          this.cacheService.setLossSummary('ClaimsbyLOBbyYear', cdata);
        } else {
          this.cacheService.setLossSummary('ClaimsbyLOBbyYear', cdata);
        }
      });

    this.inboxService
      .getLossSummary('loss_incurredbyLOBbyyear', clientId, submissionId, email)
      .subscribe((res) => {
        let cdata: ChartData[] = [
          {
            Dimension: [],
            Data: [],
          },
        ];
        if (res != null && res.value != null && res.value.length > 0) {
          cdata = this.getTranformedData(res);
          this.cacheService.setLossSummary('IncurredbyLOBbyYear', cdata);
        } else {
          this.cacheService.setLossSummary('IncurredbyLOBbyYear', cdata);
        }
      });

    this.inboxService
      .getLossSummary('loss_incurredrangecount', clientId, submissionId, email)
      .subscribe((res) => {
        let cdata: ChartData[] = [
          {
            Dimension: [],
            Data: [],
          },
        ];
        if (res != null && res.value != null && res.value.length > 0) {
          cdata = this.getTranformedData(res);
          this.cacheService.setLossSummary('IncurredRangeCount', cdata);
        } else {
          this.cacheService.setLossSummary('IncurredRangeCount', cdata);
        }
      });

    this.inboxService
      .getLossSummary(
        'loss_claimbyclaimtypebyyear',
        clientId,
        submissionId,
        email
      )
      .subscribe((res) => {
        let cdata: ChartData[] = [
          {
            Dimension: [],
            Data: [],
          },
        ];
        if (res != null && res.value != null && res.value.length > 0) {
          cdata = this.getTranformedData(res);
          this.cacheService.setLossSummary('ClaimbyClaimTypebyYear', cdata);
        } else {
          this.cacheService.setLossSummary('ClaimbyClaimTypebyYear', cdata);
        }
      });

    this.inboxService
      .getLossSummary(
        'loss_incurredbyclaimtypebyyear',
        clientId,
        submissionId,
        email
      )
      .subscribe((res) => {
        let cdata: ChartData[] = [
          {
            Dimension: [],
            Data: [],
          },
        ];
        if (res != null && res.value != null && res.value.length > 0) {
          cdata = this.getTranformedData(res);
          this.cacheService.setLossSummary('IncurredbyClaimTypebyYear', cdata);
        } else {
          this.cacheService.setLossSummary('IncurredbyClaimTypebyYear', cdata);
        }
      });

    this.inboxService
      .getLossSummary('loss_claimsbyclaimtype', clientId, submissionId, email)
      .subscribe((res) => {
        let cdata: ChartData[] = [
          {
            Dimension: [],
            Data: [],
          },
        ];
        if (res != null && res.value != null && res.value.length > 0) {
          cdata = this.getTranformedData(res);
          this.cacheService.setLossSummary('ClaimsbyClaimType', cdata);
        } else {
          this.cacheService.setLossSummary('ClaimsbyClaimType', cdata);
        }
      });

    this.inboxService
      .getLossSummary('loss_claimstatus', clientId, submissionId, email)
      .subscribe((res) => {
        let cdata = [{ category: '', value: '' }];
        if (res != null && res.value != null && res.value.length > 0) {
          res.value.forEach((data: any) => {
            if (data.dimension && data.measure) {
              let piechartdata = {
                category: data.dimension,
                value: data.measure,
              };
              cdata.push(piechartdata);
            }
          });
          this.cacheService.setLossSummary('ClaimStatus', cdata);
        } else {
          this.cacheService.setLossSummary('ClaimStatus', cdata);
        }
      });

    this.inboxService
      .getLossSummary('loss_totalincurred', clientId, submissionId, email)
      .subscribe((res) => {
        let cdata = [{ category: '', value: '' }];
        if (res != null && res.value != null && res.value.length > 0) {
          res.value.forEach((data: any) => {
            if (data.dimension && data.measure) {
              let piechartdata = {
                category: data.dimension,
                value: data.measure,
              };
              cdata.push(piechartdata);
            }
          });
          this.cacheService.setLossSummary('TotalIncurred', cdata);
        } else {
          this.cacheService.setLossSummary('TotalIncurred', cdata);
        }
      });

    this.inboxService
      .getLossSummary('loss_toplocations', clientId, submissionId, email)
      .subscribe((res) => {
        let cdata: ChartData[] = [
          {
            Dimension: [],
            Data: [
              {
                Name: '',
                Data: [],
              },
            ],
          },
        ];
        if (res != null && res.value != null && res.value.length > 0) {
          cdata = this.getTranformedData(res);
          this.cacheService.setLossSummary('TopLocations', cdata);
        } else {
          this.cacheService.setLossSummary('TopLocations', cdata);
        }
      });
  }

  getTranformedData(res: any) {
    let cdata: ChartData[] = [
      {
        Dimension: [],
        Data: [],
      },
    ];
    let distDimension = [
      ...new Set(res.value.map((item: any) => item.dimension)),
    ] as [];
    let distCategory = [
      ...new Set(res.value.map((item: any) => item.category)),
    ] as [];
    cdata[0].Dimension = distDimension;
    let tempResult = res.value;

    distCategory.forEach((category) => {
      let categoryGroup = tempResult.filter(
        (rr: any) => rr.category == category
      );
      let tempCategory = categoryGroup[0];
      let tempData: any[] = [];
      //let index = 0
      distDimension.forEach((dmsn) => {
        let filterdData = categoryGroup.filter((f: any) => f.dimension == dmsn);
        if (filterdData != null && filterdData.length > 0) {
          tempData.push(Number(filterdData[0].measure));
        } else {
          tempData.push(0);
        }
      });
      cdata[0].Data.push({ Name: tempCategory.category, Data: tempData });
    });
    return cdata;
  }
  setSubmissionFiles(email: string, clientId: string, submissionId: string) {
    let subFiles: SubmissionFile[] = [];

    this.inboxService
      .getSubmissionFilesFromDB(clientId, submissionId, email, false)
      .subscribe((res) => {
        if (res != null && res.value != null && res.value.length > 0) {
          res.value.forEach((data: any) => {
            if (data != null) {
              let subFile: SubmissionFile = {
                ID: data.id,
                FileGUID: data.fileGUID,
                FileOriginalName: data.fileOriginalName,
                DocumentType: data.documentType,
                LineOfBusinesses: data.lineOfBusinesses,
                FileStatus: data.fileStatus,
                Carriers: data.carriers,
                FileData: data.fileData,
                ExtractionTime: data.extractionTime,
                DocumentCategory: data.documentCategory,
                FormNumber: data.formNumber,
                FormVersion: data.formVersion,
                FormEdition: data.formEdition,
                StatusFlag: data.statusFlag,
                ValidationMessages: data.validationMessages,
                IsOCRed: data.isOCRed,
                IsMerged: data.isMerged,
                IsScanned: data.isScanned,
                IsJ2E7Succeeded: data.isJ2E7Succeeded,
                IsJ2E5Succeeded: data.isJ2E5Succeeded,
                IsOrigamiFileGenerated: data.isOrigamiFileGenerated,
                IsUnknownMetaDataGenerated: data.isUnknownMetaDataGenerated,
                IsMongoJsonDownloaded: data.isMongoJsonDownloaded,
                IsInsightsReportDownloaded: data.isInsightsReportDownloaded,
                IsInsightsReportDownloadAttempted:
                  data.isInsightsReportDownloadAttempted,
                IsAcord130Flag: data.isAcord130Flag,
                ModifiedOn: data.modifiedOn,
                Options: this.getDownloadOptions(data.options),
                Flags: this.getFlags(data.flags),
              };
              subFiles.push(subFile);
            }
          });
          this.cacheService.setSubmissionFiles(subFiles);
        } else this.cacheService.setSubmissionFiles([]);
      });
  }
  getFlags(flags: any[]) {
    let flagElement: SubmissionFlags[] = [];
    if (flags != null && flags.length > 0) {
      flags.forEach((element) => {
        flagElement.push({
          FlagName: element.flagName,
          CSSProperty: element.cssProperty,
          CSSType: element.cssType,
          Tooltip: element.tooltip,
        });
      });
    }
    return flagElement;
  }
  getDownloadOptions(options: any[]): DownloadOption[] {
    let downloadElements: DownloadOption[] = [];

    console.log('Table Data 1 ');
    console.log(options);
    if (options != null && options.length > 0) {
      options.forEach((element) => {
        downloadElements.push({
          DownloadCode: element.downloadCode,
          Format: element.format,
          Extension: element.extension,
          DownloadText: element.downloadText,
          Tooltip: element.tooltip,
          DownloadPath: element.downloadPath,
        });
      });
    }
    return downloadElements;
  }
}
