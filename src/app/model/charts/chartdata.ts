import { ChartSeries } from "./series";

// export interface ChartData {
//     Categories: string[];
//     Data: ChartSeries[];
//   }
  

  export interface ChartData {
    Categories: string[];
    Data: {
      Name: string;
      Data: (string | number)[]; // Allow for both strings and numbers
    }[];
  }


