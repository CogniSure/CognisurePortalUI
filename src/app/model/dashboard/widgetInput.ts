import { ChartSettings } from "../common/chart-settings";

export interface WidgetInput{
    WidgetName:string,
    WidgetType:string,
    WidgetHeader:string,
    Settings:any,//ChartSettings,
    Data:any[],
    DataSubject : any
}