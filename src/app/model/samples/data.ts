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
    }
  ];
  public static Tooltip = `<div class="size"><b>Password must consists of</b><ul><li>Min 1 Special Character</li><li>Min 1 Upper Character</li><li >Min 1 Lower Character</li><li>Min 1 Numeric Character</li><li>Length of password should be between 8 and 24 Characters</li></ul></div>`;

}

