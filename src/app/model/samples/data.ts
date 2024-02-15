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
      WidgetName: 'BusinessOperations',
      WidgetType: 'BusinessOperations',
      Header: 'Business Operations',
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
      WidgetName: 'PropertyExposure',
      WidgetType: 'Exposure',
      Header: 'Exposure',
      ColumnId :  1,
      ColumnSpan :  1,
      RowSpan :  1,
      HeaderColor : '#00B6AD',
      FontColor : '#fff',
      HeaderNumberType : "$",
    },
    {
      id: 6,
      BoxType: 'LargeBox',
      WidgetName: 'PropertyCoverages',
      WidgetType: 'Coverages',
      Header: 'Coverages',
      ColumnId :  2,
      ColumnSpan :  1,
      RowSpan :  1,
      HeaderColor : '#00B6AD',
      FontColor : '#fff',
      NumberType : "$"
    },
    {
      id: 7,
      BoxType: 'LargeBox',
      WidgetName: 'PropertyLosses',
      WidgetType: 'Losses',
      Header: 'Losses',
      ColumnId :  3,
      ColumnSpan :  1,
      RowSpan :  1,
      HeaderColor : '#00B6AD',
      FontColor : '#fff'
    }
  ];
  public static Autohub = [
    {
      id: 5,
      BoxType: 'MediumBox',
      WidgetName: 'AutoExposure',
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
      WidgetName: 'AutoCoverages',
      WidgetType: 'Coverages',
      Header: 'Vehicle',
      ColumnId :  2,
      ColumnSpan :  1,
      RowSpan :  1,
      HeaderColor : '#00B6AD',
      FontColor : '#fff'
    },
    {
      id: 7,
      BoxType: 'LargeBox',
      WidgetName: 'AutoLosses',
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
    // {
    //   id: 1,
    //   BoxType: 'SmallBox',
    //   WidgetName: 'Submissions',
    //   WidgetType: 'SimpleData',
    //   Header: 'Submissions',
    //   ColumnId :  1,
    //   ColumnSpan :  1,
    //   RowSpan :  1,
    //   HeaderColor : '#009CC1',
    //   FontColor : '#fff'
    // },
    // {
    //   id: 2,
    //   BoxType: 'SmallBox',
    //   WidgetName: 'QuoteRatio',
    //   WidgetType: 'SimpleData',
    //   Header: 'Quote Ratio',
    //   ColumnId :  2,
    //   ColumnSpan :  1,
    //   RowSpan :  1,
    //   HeaderColor : '#009CC1',
    //   FontColor : '#fff'
    // },
    // {
    //   id: 3,
    //   BoxType: 'SmallBox',
    //   WidgetName: 'StraightThroughRate',
    //   WidgetType: 'SimpleData',
    //   Header: 'Straight Through Rate',
    //   ColumnId :  3,
    //   ColumnSpan :  1,
    //   RowSpan :  1,
    //   HeaderColor : '#009CC1',
    //   FontColor : '#fff'
    // },
    {
      id: 1,
      BoxType: 'SmallBox',
      WidgetName: 'SubmissionProfile',
      WidgetType: 'donut',
      Header: 'Submission Profile and Volume',
      ColumnId :  1,
      ColumnSpan :  1,
      RowSpan :  3,
      Settings:{
        DataType: "Percentage",
        SeriesColor : "Primary",
        DonutHoleSize :40,
        LabelPosition : "outsideEnd",
        LabelColor : "#009CC1"
      }
      
    },
    {
      id: 1,
      BoxType: 'SmallBox',
      WidgetName: 'SubmissionTurnaroundTime',
      WidgetType: 'Xbar',
      Header: 'Submission Turnaround Time',
      ColumnId :  2,
      ColumnSpan :  1,
      RowSpan :  3,
      Settings:{
        DataType: "Number",
        SeriesColor : "Secondary"
      }
    },
    {
      id: 3,
      BoxType: 'SmallBox',
      WidgetName: 'CoverageDistribution',
      WidgetType: 'donut',
      Header: 'Coverage Distribution',
      ColumnId :  3,
      ColumnSpan :  1,
      RowSpan :  3,
      Settings:{
        DataType: "Percentage",
        SeriesColor : "Primary",
        DonutHoleSize : 40,
        LabelPosition : "outsideEnd",
        LabelColor : "#009CC1"
      }
    },
    {
      id: 2,
      BoxType: 'SmallBox',
      WidgetName: 'TopBrokers',
      WidgetType: 'Ybar',
      Header: 'Top Brokers',
      ColumnId :  1,
      ColumnSpan :  1,
      RowSpan :  3,
      Settings:{
        DataType: "Percentage",
        SeriesColor : "Primary"
      }
    },
    {
      id: 1,
      BoxType: 'SmallBox',
      WidgetName: 'TopIndustries',
      WidgetType: 'Ybar',
      Header: 'Top Industries',
      ColumnId :  2,
      ColumnSpan :  1,
      RowSpan :  3,
      Settings:{
        DataType: "Percentage",
        SeriesColor : "Secondary"
      }
    }
    ,
    {
      id: 1,
      BoxType: 'SmallBox',
      WidgetName: 'TopLocationsByCity',
      WidgetType: 'Ybar',
      Header: 'Top Locations by City',
      ColumnId :  3,
      ColumnSpan :  1,
      RowSpan :  3,
      Settings:{
        DataType: "Percentage",
        SeriesColor : "Primary"
      }
    },
    {
      id: 1,
      BoxType: 'SmallBox',
      WidgetName: 'TopLocationsByState',
      WidgetType: 'Ybar',
      Header: 'Top Locations by State',
      ColumnId :  1,
      ColumnSpan :  1,
      RowSpan :  3,
      Settings:{
        DataType: "Percentage",
        SeriesColor : "Primary"
      }
    }
  ];
  public static ExposureSummaryHub = [
    {
      id: 1,
      WidgetName: 'TIV',
      WidgetType: 'SimpleDataWOHeader',
      Header: '',
      ColumnId :  1,
      ColumnSpan :  2,
      RowSpan :  1,
      Settings : {
        HeaderColor : '#ffffff',
        FontColor : '#fff',
        LegendPosition : "Right",
        DataType : "Dollar",
      }
      
    },
    {
      id: 2,
      WidgetName: 'NoOfLocations',
      WidgetType: 'SimpleDataWOHeader',
      Header: '',
      ColumnId :  3,
      ColumnSpan :  2,
      RowSpan :  1,
      Settings : {
        HeaderColor : '#ffffff',
        FontColor : '#fff',
        LegendPosition : "Right",
        DataType : "Number",
      }
    },
    {
      id: 3,
      WidgetName: 'NoOfBuildings',
      WidgetType: 'SimpleDataWOHeader',
      Header: '',
      ColumnId :  5,
      ColumnSpan :  2,
      RowSpan :  1,
      Settings : {
        HeaderColor : '#ffffff',
        FontColor : '#fff',
        LegendPosition : "Right",
        DataType : "Number",
      }
    },
    // {
    //   id: 3,
    //   WidgetName: 'EmptyBox',
    //   WidgetType: 'SimpleDataWOHeader',
    //   Header: '',
    //   ColumnId :  4,
    //   ColumnSpan :  1,
    //   RowSpan :  1,
    //   HeaderColor : '#ffffff',
    //   FontColor : '#fff'
    // },
    {
      id: 1,
      WidgetName: 'ConstructionType',
      WidgetType: 'donut',
      Header: 'Construction Type',
      ColumnId :  1,
      ColumnSpan :  3,
      RowSpan :  4,
      Settings:{
        DataType: "Percentage",
        SeriesColor : "Primary",
        DonutHoleSize : 40,
        LabelPosition : "outsideEnd",
        LabelColor : "#009CC1",
        LegendPosition : "Right"
      }
    },
    {
      id: 1,
      WidgetName: 'OccupancyType',
      WidgetType: 'donut',
      Header: 'Occupancy Type',
      ColumnId :  4,
      ColumnSpan :  3,
      RowSpan :  4,
      Settings:{
        DataType: "Percentage",
        SeriesColor : "Primary",
        DonutHoleSize : 40,        
        LabelPosition : "outsideEnd",
        LabelColor : "#009CC1",
        LegendPosition : "Right",
      }
    },
    {
      id: 1,
      WidgetName: 'YearBuild',
      WidgetType: 'donut',
      Header: 'Building Age',
      ColumnId :  1,
      ColumnSpan :  3,
      RowSpan :  4,
      Settings:{
        DataType: "Percentage",
        SeriesColor : "Primary",
        DonutHoleSize : 40,
        LabelPosition : "outsideEnd",
        LabelColor : "#009CC1",
        LegendPosition : "Right",
      }
    },
    {
      id: 1,
      WidgetName: 'ProtectionClass',
      WidgetType: 'donut',
      Header: 'Protection Class',
      ColumnId :  4,
      ColumnSpan :  3,
      RowSpan :  4,
      Settings:{
        DataType: "Percentage",
        SeriesColor : "Primary",
        DonutHoleSize : 40,
        LabelPosition : "outsideEnd",
        LabelColor : "#009CC1",
        LegendPosition : "Right",
      }
    },
  ];

  public static LossSummaryHub = [
    {
      id: 1,
      WidgetName: 'ClaimsbyLOBbyYear',
      WidgetType: 'Xbar',
      Header: 'Claims by LOB by Year',
      ColumnId :  1,
      ColumnSpan :  1,
      RowSpan :  4,
      DataType : "Number",
      Settings :{
        ShowLabels : false,
        Stack : true,
        DataType : "Number"
      }
    },
    {
      id: 2,
      WidgetName: 'IncurredbyLOBbyYear',
      WidgetType: 'Xbar',
      Header: 'Incurred by LOB by Year',
      ColumnId :  2,
      ColumnSpan :  1,
      RowSpan :  4,
      Settings :{
        ShowLabels : false,
        Stack : true,
        DataType : "Dollar"
      }
    },
    {
      id: 3,
      WidgetName: 'IncurredRangeCount',
      WidgetType: 'Xbar',
      Header: 'Incurred Range Count',
      ColumnId :  3,
      ColumnSpan :  1,
      RowSpan :  4,
      Settings :{
        ShowLabels : false,
        Stack : true,
        DataType : "Number"
      }
    },
    {
      id: 1,
      WidgetName: 'ClaimbyClaimTypebyYear',
      WidgetType: 'Xbar',
      Header: 'Claim by Claim Type by Year',
      ColumnId :  1,
      ColumnSpan :  1,
      RowSpan :  4,
      Settings :{
        ShowLabels : false,
        Stack : true,
        DataType : "Number"
      }
    },
    {
      id: 1,
      WidgetName: 'IncurredbyClaimTypebyYear',
      WidgetType: 'Xbar',
      Header: 'Incurred by Claim Type by Year',
      ColumnId :  2,
      ColumnSpan :  1,
      RowSpan :  4,
      Settings :{
        ShowLabels : false,
        Stack : true,
        DataType : "Dollar"
      }
    },
    {
      id: 3,
      WidgetName: 'ClaimsbyClaimType',
      WidgetType: 'Xbar',
      Header: 'Claims by Claim Type',
      ColumnId :  3,
      ColumnSpan :  1,
      RowSpan :  4,
      Settings :{
        ShowLabels : false,
        Stack : true,
        DataType : "Number"
      }
    },
    {
      id: 2,
      WidgetName: 'ClaimStatus',
      WidgetType: 'donut',
      Header: 'Claim Status',
      ColumnId :  1,
      ColumnSpan :  1,
      RowSpan :  4,
      Settings :{
        ShowLabels : false,
        Stack : false,
        DataType : "Dollar"
      }
    },
    {
      id: 1,
      WidgetName: 'TotalIncurred',
      WidgetType: 'donut',
      Header: 'Total Incurred',
      ColumnId :  2,
      ColumnSpan :  1,
      RowSpan :  4,
      Settings :{
        ShowLabels : false,
        Stack : false,
        DataType : "Dollar"
      }
    }
    ,
    {
      id: 1,
      WidgetName: 'TopLocations',
      WidgetType: 'Xbar',
      Header: 'Top Locations',
      ColumnId :  3,
      ColumnSpan :  1,
      RowSpan :  4,
      Settings :{
        ShowLabels : false,
        Stack : false,
        DataType : "Dollar"
      }
    },
  ];

  public static WorkerComphub = [
    {
      id: 5,
      BoxType: 'MediumBox',
      WidgetName: 'WCExposure',
      WidgetType: 'Exposure',
      Header: 'Exposure',
      ColumnId :  1,
      ColumnSpan :  1,
      RowSpan :  1,
      HeaderColor : '#00B6AD',
      FontColor : '#fff',
      NumberType : "$"
    },
    {
      id: 6,
      BoxType: 'LargeBox',
      WidgetName: 'WCCoverages',
      WidgetType: 'Coverages',
      Header: 'Payroll and Employee Count',
      ColumnId :  2,
      ColumnSpan :  1,
      RowSpan :  1,
      HeaderColor : '#00B6AD',
      FontColor : '#fff'
    },
    {
      id: 7,
      BoxType: 'LargeBox',
      WidgetName: 'WCLosses',
      WidgetType: 'Losses',
      Header: 'Losses',
      ColumnId :  3,
      ColumnSpan :  1,
      RowSpan :  1,
      HeaderColor : '#00B6AD',
      FontColor : '#fff'
    }
  ];
  public static GeneralLiabilityhub = [
    {
      id: 5,
      BoxType: 'MediumBox',
      WidgetName: 'GLExposure',
      WidgetType: 'Exposure',
      Header: 'Schedule of Hazards',
      ColumnId :  1,
      ColumnSpan :  1,
      RowSpan :  1,
      HeaderColor : '#00B6AD',
      FontColor : '#fff'
    },
    {
      id: 6,
      BoxType: 'LargeBox',
      WidgetName: 'GLCoverages',
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
      WidgetName: 'GLLosses',
      WidgetType: 'Losses',
      Header: 'Losses',
      ColumnId :  3,
      ColumnSpan :  1,
      RowSpan :  1,
      HeaderColor : '#00B6AD',
      FontColor : '#fff'
    }
  ];
  public static Umbrellahub = [
    {
      id: 5,
      BoxType: 'MediumBox',
      WidgetName: 'UmbrellaExposure',
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
      WidgetName: 'UmbrellaCoverages',
      WidgetType: 'Coverages',
      Header: 'Underlying Coverages',
      ColumnId :  2,
      ColumnSpan :  1,
      RowSpan :  1,
      HeaderColor : '#00B6AD',
      FontColor : '#fff'
    },
    {
      id: 7,
      BoxType: 'LargeBox',
      WidgetName: 'UmbrellaLosses',
      WidgetType: 'Losses',
      Header: 'Losses',
      ColumnId :  3,
      ColumnSpan :  1,
      RowSpan :  1,
      HeaderColor : '#00B6AD',
      FontColor : '#fff'
    }
  ];
  public static Tooltip = `<div class="size"><b>Password must consists of</b><ul><li>Min 1 Special Character</li><li>Min 1 Upper Character</li><li >Min 1 Lower Character</li><li>Min 1 Numeric Character</li><li>Length of password should be between 8 and 24 Characters</li></ul></div>`;

}

