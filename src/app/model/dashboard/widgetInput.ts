import { ChartSettings } from "../common/chart-settings";

export interface WidgetInput{
    WidgetName:string,
    WidgetType:string,
    Settings:any,//ChartSettings,
    Data:any[],
    DataSubject : any
}