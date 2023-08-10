import { Dashboard } from '../dashboard/dashboard';


export class DataComponent {
  public static Datahub = [
    {
      id: 1,
      BoxType: 'SmallBox',
      WidgetName: 'Agency',
      WidgetType: 'Agency',
      Header: 'Agency',
      
    //   ApiURL: 'api/data',
    //   Fullscreen: false,
    },
    {
      id: 2,
      BoxType: 'SmallBox',
      WidgetName: 'Riskclearance',
      WidgetType: 'Riskclearance',
      Header: 'Risk Clearance',
    //   ApiURL: 'api/data',
    //   Fullscreen: false,
    },
    {
      id: 3,
      BoxType: 'MediumBox',
      WidgetName: 'Totallosses',
      WidgetType: 'Totallosses',
      Header: 'Total Losses',
    //   ApiURL: 'api/data',
    //   Fullscreen: false,
    },
    // {
    //   id: 4,
    //   BoxType: 'LargeBox',
    //   WidgetName: 'Ytdbudgetvsactualcost',
    //   WidgetType: 'Mixed',
    //   Header: 'YTD Budget vs. Actual Cost Comparison',
    //   ApiURL: 'api/data',
    //   Fullscreen: true,
    // },
    {
      id: 5,
      BoxType: 'MediumBox',
      WidgetName: 'Exposure',
      WidgetType: 'Exposure',
      Header: 'Exposure',
    //   ApiURL: 'api/data',
    //   Fullscreen: true,
    },
    {
      id: 6,
      BoxType: 'LargeBox',
      WidgetName: 'Coverages',
      WidgetType: 'Coverages',
      Header: 'Coverages',
    //   ApiURL: 'api/data',
    //   Fullscreen: true,
    },
    {
      id: 7,
      BoxType: 'LargeBox',
      WidgetName: 'Losses',
      WidgetType: 'Losses',
      Header: 'Losses',
    //   ApiURL: 'api/data',
    //   Fullscreen: true,
    },
    // {
    //   id: 8,
    //   BoxType: 'MediumBox',
    //   WidgetName: 'Genericvsbrandutilizationpie',
    //   WidgetType: 'Pie',
    //   Header: 'Generic vs. Brand Utilization',
    //   ApiURL: 'api/data',
    //   Fullscreen: true,
    // },
    // {
    //   id: 9,
    //   BoxType: 'MediumBox',
    //   WidgetName: 'Specialityutilizationpie',
    //   WidgetType: 'Pie',
    //   Header: 'Specialty vs. Non-Specialty Utilization',
    //   ApiURL: 'api/data',
    //   Fullscreen: true,
    // },
    // {
    //   id: 10,
    //   BoxType: 'MediumBox',
    //   WidgetName: 'Genericvsbrandutilization',
    //   WidgetType: 'XBar',
    //   Header: 'Generic vs. Brand Utilization',
    //   ApiURL: 'api/data',
    //   Fullscreen: true,
    // },
    // {
    //   id: 11,
    //   BoxType: 'MediumBox',
    //   WidgetName: 'Specialityutilization',
    //   WidgetType: 'XBar',
    //   Header: 'Specialty vs. Non-Specialty Utilization',
    //   ApiURL: 'api/data',
    //   Fullscreen: true,
    // },
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
      HeaderColor : '#00B6AD',
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
      HeaderColor : '#00B6AD',
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
      HeaderColor : '#00B6AD',
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
    }
  ];
  public static Tooltip = `<div class="size"><b>Password must consists of</b><ul><li>Min 1 Special Character</li><li>Min 1 Upper Character</li><li >Min 1 Lower Character</li><li>Min 1 Numeric Character</li><li>Length of password should be between 8 and 24 Characters</li></ul></div>`;

}

