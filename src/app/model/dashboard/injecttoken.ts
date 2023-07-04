import { InjectionToken, Type } from "@angular/core";

// export class WidgetInput{
//     constructor(public Component: Type<any>, public data: any) {}
// }

export const InjectToken = new InjectionToken<string>('title', { providedIn: 'root',  factory: () => 'title' } ); 