import { Component, OnInit } from '@angular/core';
import { ExposureData } from '../../model/summary/exposuredata';
import { ExposureService } from '../../services/inbox/exposure.service';
import { GlobalService } from 'src/app/services/common/global.service';
import { parseNumber } from '@progress/kendo-angular-intl';

@Component({
  selector: 'app-exposure',
  templateUrl: './exposure.component.html',
  styleUrls: ['./exposure.component.scss'],
})
export class ExposureComponent implements OnInit {
  totalinsuredvalue: string = 'Total Insured Value';
  totalincurredvalue: string = '';
  exposurelosses: any = '$27,654,321';
  exposuredata: ExposureData[] = [];
  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    this.getExposureData();
  }

  getExposureData(): void {
    this.globalService.getCurrentSubmission().subscribe((sub: any) => {
      this.exposuredata = [];
      if (sub != null && sub.value != null) {
        let locations: string[] = [];
        let buildings: string[] = [];
        let states: string[] = [];
        let totalIncurred = 0;

        sub.value.property_Policy_Info_Blanket_Summary.forEach(
          (exposure: any) => {
            if(exposure.commercialproperty_Summary_Blanketlimitamount!=null)
            {
              var str = exposure.commercialproperty_Summary_Blanketlimitamount.replace('$','')
              totalIncurred += parseNumber(str);
            }
           
          }
        );

        sub.value.property_Policy_Info_Premises_Information.forEach(
          (property: any) => {
            let locationTemp =
              property.commercialstructure_Location_Produceridentifier;
            if (locationTemp != null && locationTemp != '')
              locations.push(locationTemp);

            let buildingTemp =
              property.commercialstructure_Building_Produceridentifier;
            if (buildingTemp != null && buildingTemp != '')
              buildings.push(buildingTemp);

            let stateTemp =
              property.commercialstructure_Physicaladdress_Stateorprovincecode;
            if (stateTemp != null && stateTemp != '') states.push(stateTemp);
            // totalIncurred += totalIncurredTemp;
            // if (totalIncurredTemp > highestIncurred)
            //   highestIncurred = totalIncurredTemp;
          }
        );

        this.exposurelosses = "$"+totalIncurred.toLocaleString('en-GB');
        this.exposuredata = [
          {
            numberoflocations: [...new Set(locations)].length,
            numberofbuildings: [...new Set(buildings)].length,
            states: [...new Set(states)].length,
          },
        ];
      }
    });
  }
}
