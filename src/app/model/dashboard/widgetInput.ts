import { ChartSettings } from "../common/chart-settings";

export interface WidgetInput{
    WidgetName:string,
    WidgetType:string,
    WidgetHeader:string,
    Settings:any,//ChartSettings,
    Keys:any[],
    DataSubject : any
}