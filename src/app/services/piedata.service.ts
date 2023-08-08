import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PiedataService {
  public getPieChartData(): any[] {
    return [
      { category: 'Electronics', value: 42 },
      { category: 'Clothing', value: 18 },
      { category: 'Groceries', value: 20 },
      { category: 'Accessories', value: 10 },
      { category: 'Other', value: 10 }
    ];
  }
}
