import { ChartSeries } from "./series";

// export interface ChartData {
//     Categories: string[];
//     Data: ChartSeries[];
//   }
  

  export interface ChartData {
    Measure: string[];
    Data: {
      Name: string;
      Data: (string | number)[]; // Allow for both strings and numbers
    }[];
  }


