import { ChartSeries } from "./series";

// export interface ChartData {
//     Categories: string[];
//     Data: ChartSeries[];
//   }
  

  export interface ChartData {
    Dimension: string[];
    Data: {
      Name: string;
      Data: (string | number)[];
    }[];
  }


