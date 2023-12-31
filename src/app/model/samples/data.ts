import { Dashboard } from '../dashboard/dashboard';


export class DataComponent {
  public static Summaryhub = [
    {
      id: 1,
      BoxType: 'SmallBox',
      WidgetName: 'Agency',
      WidgetType: 'Agency',
      Header: 'Agency',
      ColumnId :  1,
      ColumnSpan :  1,
      RowSpan :  1,
      HeaderColor : '#00B6AD',
      FontColor : '#fff'
    },
    {
      id: 2,
      BoxType: 'SmallBox',
      WidgetName: 'Riskclearance',
      WidgetType: 'Riskclearance',
      Header: 'Risk Clearance',
      ColumnId :  2,
      ColumnSpan :  1,
      RowSpan :  1,
      HeaderColor : '#00B6AD',
      FontColor : '#fff'
    },
    {
      id: 3,
      BoxType: 'MediumBox',
      WidgetName: 'Totallosses',
      WidgetType: 'Totallosses',
      Header: 'Total Losses',
      ColumnId :  3,
      ColumnSpan :  1,
      RowSpan :  1,
      HeaderColor : '#00B6AD',
      FontColor : '#fff'
    }
  ];
  public static Propertyhub = [
    {
      id: 5,
      BoxType: 'MediumBox',
      WidgetName: 'Exposure',
      WidgetType: 'Exposure',
      Header: 'Exposure',
      ColumnId :  1,
      ColumnSpan :  1,
      RowSpan :  1,
      HeaderColor : '#00B6AD',
      FontColor : '#fff'
    },
    {
      id: 6,
      BoxType: 'LargeBox',
      WidgetName: 'Coverages',
      WidgetType: 'Coverages',
      Header: 'Coverages',
      ColumnId :  2,
      ColumnSpan :  1,
      RowSpan :  1,
      HeaderColor : '#00B6AD',
      FontColor : '#fff'
    },
    {
      id: 7,
      BoxType: 'LargeBox',
      WidgetName: 'Losses',
      WidgetType: 'Losses',
      Header: 'Losses',
      ColumnId :  3,
      ColumnSpan :  1,
      RowSpan :  1,
      HeaderColor : '#00B6AD',
      FontColor : '#fff'
    }
  ];
  public static Dashboardhub = [
    {
      id: 1,
      BoxType: 'SmallBox',
      WidgetName: 'Submissions',
      WidgetType: 'SimpleData',
      Header: 'Submissions',
      ColumnId :  1,
      ColumnSpan :  1,
      RowSpan :  1,
      HeaderColor : '#009CC1',
      FontColor : '#fff'
    },
    {
      id: 2,
      BoxType: 'SmallBox',
      WidgetName: 'QuoteRatio',
      WidgetType: 'SimpleData',
      Header: 'Quote Ratio',
      ColumnId :  2,
      ColumnSpan :  1,
      RowSpan :  1,
      HeaderColor : '#009CC1',
      FontColor : '#fff'
    },
    {
      id: 3,
      BoxType: 'SmallBox',
      WidgetName: 'StraightThroughRate',
      WidgetType: 'SimpleData',
      Header: 'Straight Through Rate',
      ColumnId :  3,
      ColumnSpan :  1,
      RowSpan :  1,
      HeaderColor : '#009CC1',
      FontColor : '#fff'
    },
    {
      id: 1,
      BoxType: 'SmallBox',
      WidgetName: 'SubmissionConversion',
      WidgetType: 'funnel',
      Header: 'Submission Conversion',
      ColumnId :  1,
      ColumnSpan :  1,
      RowSpan :  3
    },
    {
      id: 1,
      BoxType: 'SmallBox',
      WidgetName: 'SubmissionTurnaroundTime',
      WidgetType: 'Xbar',
      Header: 'Submission Turnaround Time',
      ColumnId :  2,
      ColumnSpan :  1,
      RowSpan :  3
    },
    {
      id: 3,
      BoxType: 'SmallBox',
      WidgetName: 'CoverageDistribution',
      WidgetType: 'donut',
      Header: 'Coverage Distribution',
      ColumnId :  3,
      ColumnSpan :  1,
      RowSpan :  3
    },
    {
      id: 2,
      BoxType: 'SmallBox',
      WidgetName: 'TopBrokers',
      WidgetType: 'Ybar',
      Header: 'Top Brokers',
      ColumnId :  1,
      ColumnSpan :  1,
      RowSpan :  3
    },
    {
      id: 1,
      BoxType: 'SmallBox',
      WidgetName: 'TopIndustries',
      WidgetType: 'Ybar',
      Header: 'Top Industries',
      ColumnId :  2,
      ColumnSpan :  1,
      RowSpan :  3
    }
    ,
    {
      id: 1,
      BoxType: 'SmallBox',
      WidgetName: 'TopLocations',
      WidgetType: 'Ybar',
      Header: 'Top Locations',
      ColumnId :  3,
      ColumnSpan :  1,
      RowSpan :  3
    },
    {
      id: 1,
      BoxType: 'SmallBox',
      WidgetName: 'TopLocations',
      WidgetType: 'Ybar',
      Header: 'Top Locations by State',
      ColumnId :  1,
      ColumnSpan :  1,
      RowSpan :  3
    }
  ];
  public static ExposureSummaryHub = [
    {
      id: 1,
      WidgetName: 'TIV',
      WidgetType: 'SimpleDataWOHeader',
      Header: '',
      ColumnId :  1,
      ColumnSpan :  1,
      RowSpan :  1,
      HeaderColor : '#ffffff',
      FontColor : '#fff'
    },
    {
      id: 2,
      WidgetName: 'NoOfLocations',
      WidgetType: 'SimpleDataWOHeader',
      Header: '',
      ColumnId :  2,
      ColumnSpan :  1,
      RowSpan :  1,
      HeaderColor : '#ffffff',
      FontColor : '#fff'
    },
    {
      id: 3,
      WidgetName: 'NoOfBuildings',
      WidgetType: 'SimpleDataWOHeader',
      Header: '',
      ColumnId :  3,
      ColumnSpan :  1,
      RowSpan :  1,
      HeaderColor : '#ffffff',
      FontColor : '#fff'
    },
    {
      id: 3,
      WidgetName: 'EmptyBox',
      WidgetType: 'SimpleDataWOHeader',
      Header: '',
      ColumnId :  4,
      ColumnSpan :  1,
      RowSpan :  1,
      HeaderColor : '#ffffff',
      FontColor : '#fff'
    },
    {
      id: 1,
      WidgetName: 'ConstructionType',
      WidgetType: 'donut',
      Header: 'Construction Type',
      ColumnId :  1,
      ColumnSpan :  2,
      RowSpan :  4
    },
    {
      id: 1,
      WidgetName: 'OccupancyType',
      WidgetType: 'donut',
      Header: 'Occupancy Type',
      ColumnId :  3,
      ColumnSpan :  2,
      RowSpan :  4
    },
    {
      id: 1,
      WidgetName: 'YearBuild',
      WidgetType: 'donut',
      Header: 'Year Build',
      ColumnId :  1,
      ColumnSpan :  2,
      RowSpan :  4
    },
    {
      id: 1,
      WidgetName: 'ProtectionClass',
      WidgetType: 'donut',
      Header: 'Protection Class',
      ColumnId :  3,
      ColumnSpan :  2,
      RowSpan :  4
    },
  ];

  public static LossSummaryHub1 = [
    {
      id: 1,
      WidgetName: 'ClaimsbyLOBbyYear',
      WidgetType: 'SimpleDataWOHeader',
      Header: 'Claims by LOB by Year',
      ColumnId :  1,
      ColumnSpan :  2,
      RowSpan :  5,
      // HeaderColor : '#ffffff',
      // FontColor : '#fff'
    },
    {
      id: 2,
      WidgetName: 'IncurredbyLOBbyYear',
      WidgetType: 'SimpleDataWOHeader',
      Header: 'Incurred by LOB by Year',
      ColumnId :  2,
      ColumnSpan :  1,
      RowSpan :  1,
      // HeaderColor : '#ffffff',
      // FontColor : '#fff'
    },
    {
      id: 3,
      WidgetName: 'IncurredRangeCount',
      WidgetType: 'SimpleDataWOHeader',
      Header: 'Incurred Range Count',
      ColumnId :  3,
      ColumnSpan :  1,
      RowSpan :  1,
      // HeaderColor : '#ffffff',
      // FontColor : '#fff'
    },
    // {
    //   id: 3,
    //   WidgetName: 'ClaimbyClaimTypebyYear',
    //   WidgetType: 'SimpleDataWOHeader',
    //   Header: 'Claim by Claim Type by Year',
    //   ColumnId :  4,
    //   ColumnSpan :  1,
    //   RowSpan :  1,
      // HeaderColor : '#ffffff',
      // FontColor : '#fff'
    // },
    {
      id: 1,
      WidgetName: 'IncurredbyClaimTypebyYear',
      WidgetType: 'donut',
      Header: 'Incurred by Claim Type by Year',
      ColumnId :  1,
      ColumnSpan :  2,
      RowSpan :  4
    },
    {
      id: 1,
      WidgetName: 'ClaimsbyClaimType',
      WidgetType: 'donut',
      Header: 'Claims by Claim Type',
      ColumnId :  3,
      ColumnSpan :  2,
      RowSpan :  4
    },
    {
      id: 1,
      WidgetName: 'ClaimStatus',
      WidgetType: 'donut',
      Header: 'Claim Status',
      ColumnId :  1,
      ColumnSpan :  2,
      RowSpan :  4
    },
    {
      id: 1,
      WidgetName: 'TotalIncurred',
      WidgetType: 'donut',
      Header: 'Total Incurred',
      ColumnId :  3,
      ColumnSpan :  2,
      RowSpan :  4
    },
    {
      id: 1,
      WidgetName: 'TopLocations',
      WidgetType: 'donut',
      Header: 'Top Locations',
      ColumnId :  3,
      ColumnSpan :  2,
      RowSpan :  4
    },
  ];

  public static LossSummaryHub = [
    {
      id: 1,
      BoxType: 'SmallBox',
      WidgetName: 'ClaimsbyLOBbyYear',
      WidgetType: 'Ybar',
      Header: 'Claims by LOB by Year',
      ColumnId :  1,
      ColumnSpan :  1,
      RowSpan :  4,
      // HeaderColor : '#009CC1',
      // FontColor : '#fff'
    },
    {
      id: 2,
      BoxType: 'SmallBox',
      WidgetName: 'IncurredbyLOBbyYear',
      WidgetType: 'Ybar',
      Header: 'Incurred by LOB by Year',
      ColumnId :  2,
      ColumnSpan :  1,
      RowSpan :  4,
      // HeaderColor : '#009CC1',
      // FontColor : '#fff'
    },
    {
      id: 3,
      BoxType: 'SmallBox',
      WidgetName: 'IncurredRangeCount',
      WidgetType: 'Xbar',
      Header: 'Incurred Range Count',
      ColumnId :  3,
      ColumnSpan :  1,
      RowSpan :  4,
      // HeaderColor : '#009CC1',
      // FontColor : '#fff'
    },
    {
      id: 1,
      BoxType: 'SmallBox',
      WidgetName: 'ClaimbyClaimTypebyYear',
      WidgetType: 'Xbar',
      Header: 'Claim by Claim Type by Year',
      ColumnId :  1,
      ColumnSpan :  1,
      RowSpan :  4,
      // HeaderColor : '#009CC1',
      // FontColor : '#fff'
    },
    {
      id: 1,
      BoxType: 'SmallBox',
      WidgetName: 'IncurredbyClaimTypebyYear',
      WidgetType: 'Xbar',
      Header: 'Incurred by Claim Type by Year',
      ColumnId :  2,
      ColumnSpan :  1,
      RowSpan :  4,
      // HeaderColor : '#009CC1',
      // FontColor : '#fff'
    },
    {
      id: 3,
      BoxType: 'SmallBox',
      WidgetName: 'ClaimsbyClaimType',
      WidgetType: 'Xbar',
      Header: 'Claims by Claim Type',
      ColumnId :  3,
      ColumnSpan :  1,
      RowSpan :  4,
      // HeaderColor : '#009CC1',
      // FontColor : '#fff'
    },
    {
      id: 2,
      BoxType: 'SmallBox',
      WidgetName: 'ClaimStatus',
      WidgetType: 'Ybar',
      Header: 'Claim Status',
      ColumnId :  1,
      ColumnSpan :  1,
      RowSpan :  4,
      // HeaderColor : '#009CC1',
      // FontColor : '#fff'
    },
    {
      id: 1,
      BoxType: 'SmallBox',
      WidgetName: 'TotalIncurred',
      WidgetType: 'Ybar',
      Header: 'Total Incurred',
      ColumnId :  2,
      ColumnSpan :  1,
      RowSpan :  4,
      // HeaderColor : '#009CC1',
      // FontColor : '#fff'
    }
    ,
    {
      id: 1,
      BoxType: 'SmallBox',
      WidgetName: 'TopLocations',
      WidgetType: 'Ybar',
      Header: 'Top Locations',
      ColumnId :  3,
      ColumnSpan :  1,
      RowSpan :  4,
      // HeaderColor : '#009CC1',
      // FontColor : '#fff'
    },
  ];


  public static Tooltip = `<div class="size"><b>Password must consists of</b><ul><li>Min 1 Special Character</li><li>Min 1 Upper Character</li><li >Min 1 Lower Character</li><li>Min 1 Numeric Character</li><li>Length of password should be between 8 and 24 Characters</li></ul></div>`;

}

