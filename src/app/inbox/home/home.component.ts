import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
 public tableData: any[]= 
 [{"id":"848e6002-8a92-447d-951b-1ffd5e695578","full_name":"Sig Jeannel","job_title":"23156-345","type":"New Business","country":"Dante Mason","is_online":"01/03/2023","rating":3,"target":"Hub international","budget":"Property","phone":"High","address":"138 Buhler Avenue","img_id":1,"gender":"M"},
{"id":"19d18d40-0e64-4837-9420-92130a0ed253","full_name":"Shelden Greyes","job_title":"23156-346","country":"Duke & Duke","type":"New Business","is_online":"01/03/2023","rating":5,"target":"AEC Insurance","budget":"Property Wc","phone":"High","address":"2 Waxwing Point","img_id":2,"gender":"M"},
{"id":"bebdc6eb-9179-484a-917d-2e16a23bfdfe","full_name":"Megen Cody","job_title":"23156-347","country":"CPE, Inc","type":"New Business","is_online":"01/03/2023","rating":1,"target":"Hub international","budget":"Property Crime","phone":"High","address":"4082 Stephen Court","img_id":6,"gender":"F"},
{"id":"38b08b88-e482-46fc-8976-83590c02ec23","full_name":"Clevey Thursfield","job_title":"23156-348","country":"Bayside highschool","type":"New Business","is_online":"01/03/2023","rating":2,"target":"Hub international","budget":"Property","phone":"High","address":"1563 Glacier Hill Parkway","img_id":5,"gender":"M"},
{"id":"2aac53f8-b72d-4629-9082-6d8239a8fecf","full_name":"Ruthi Baldini","job_title":"23156-349","country":"Addams LLC","type":"New Business","is_online":"01/03/2023","rating":3,"target":"Hub international","budget":"Property","phone":"Low","address":"6 Laurel Avenue","img_id":8,"gender":"F"},
{"id":"1aa789e5-de01-406e-a2ee-cc5ce20f7e34","full_name":"Annecorinne Morter","job_title":"23156-3410","country":"Spring Fieldnuclear plant","type":"New Business","is_online":"01/03/2023","rating":2,"target":"Hub international","budget":"Property","phone":"High","address":"106 Green Street","img_id":3,"gender":"F"},
{"id":"d2ff1b02-3808-44aa-9056-3b5df34bf865","full_name":"Gracia Punyer","job_title":"23156-3411","country":"LIC","type":"New Business","is_online":"01/03/2023","rating":4,"target":"Hub international","budget":"Property WC","phone":"Medium","address":"69 Brentwood Alley","img_id":2,"gender":"F"},
{"id":"26b2b760-27e8-47a6-81c2-07870d1b2b30","full_name":"Duky Hurring","job_title":"23156-3412","country":"Omni Consumer product","type":"Renewal","is_online":"01/03/2023","rating":3,"target":"Hub international","budget":"Property","phone":"High","address":"39 Morning Circle","img_id":3,"gender":"M"},
{"id":"91c6b652-4206-4a0c-bac6-dc21283a72d7","full_name":"Briana Shemelt","job_title":"23156-313","country":"US","is_online":"01/03/2023","rating":3,"target":"Hub international","budget":"Property","phone":"Low","address":"11 Walton Court","img_id":2,"gender":"F"},
{"id":"1e8289dc-2ef3-4045-ad6b-786d00368427","full_name":"Lexis Mostin","job_title":"23156-351","country":"FR","is_online":"01/03/2023","rating":4,"target":"Hub international","budget":"Property","phone":"Medium","address":"38547 Westend Way","img_id":4,"gender":"F"},
{"id":"797387bd-c247-48b3-97b6-5e75791f8809","full_name":"Felizio Gooda","job_title":"23156-352","country":"DE","is_online":"01/03/2023","rating":3,"target":"Hub international","budget":"Property","phone":"High","address":"9 Summer Ridge Circle","img_id":2,"gender":"M"},
{"id":"24c541b0-4978-4072-84d0-abe94fcd0756","full_name":"Aubry Oxberry","job_title":"23156-353","country":"BR","is_online":"01/03/2023","rating":2,"target":"Hub international","budget":"Property","phone":"High","address":"06 Lerdahl Point","img_id":10,"gender":"F"},
{"id":"d3416440-7411-42cc-a913-7dd319ca8311","full_name":"Orly Glasbey","job_title":"23156-354","country":"BR","is_online":"01/03/2023","rating":5,"target":"Hub international","budget":"Property","phone":"High","address":"4035 Porter Parkway","img_id":6,"gender":"F"},
{"id":"139066b5-60c5-4cf5-9afe-fb4e5558b087","full_name":"Stephanus Culp","job_title":"23156-355","country":"BR","is_online":"01/03/2023","rating":2,"target":"Hub international","budget":"Property","phone":"High","address":"57028 Moland Terrace","img_id":8,"gender":"M"},
{"id":"eb844971-b97d-4f79-bd5a-a266fcfaaf70","full_name":"Roseanna Janecek","job_title":"Database Administrator IV","country":"FR","is_online":"01/03/2023","rating":"Hub international","target":97,"budget":"Property","phone":"High","address":"21973 Beilfuss Alley","img_id":4,"gender":"F"},
{"id":"5cb391fe-4855-445c-a8b8-617c04d1d999","full_name":"Weidar McCombe","job_title":"Civil Engineer","country":"FR","is_online":"01/03/2023","rating":1,"target":77,"budget":35924,"phone":"High","address":"7 Dahle Terrace","img_id":1,"gender":"M"},
{"id":"4ba9ad7e-d8b7-40e7-b8cd-67a8e743a249","full_name":"Evelin Spirritt","job_title":"Analyst Programmer","country":"BR","is_online":"01/03/2023","rating":2,"target":"Hub international","budget":58552,"phone":"High","address":"89418 Knutson Pass","img_id":1,"gender":"M"},
{"id":"e4a31407-39d1-4ab7-aad1-4e026a8c42fa","full_name":"Andria Helbeck","job_title":"Nurse Practicioner","country":"BR","is_online":"01/03/2023","rating":4,"target":"Hub international","budget":72526,"phone":"High","address":"8589 Vernon Drive","img_id":8,"gender":"F"},
{"id":"cd050499-dbf1-4a43-86ab-54feaacef401","full_name":"Mariellen Ravelus","job_title":"Systems Administrator I","country":"DE","is_online":"01/03/2023","rating":2,"target":"Hub international","budget":-6659,"phone":"(300) 6741661","address":"707 Gale Hill","img_id":9,"gender":"F"},
{"id":"fda1c419-c0b8-4278-94b0-2ebef6bda164","full_name":"Corri Pergens","job_title":"Help Desk Operator","country":"BR","is_online":"01/03/2023","rating":2,"target":"Hub international","budget":12376,"phone":"High","address":"856 Forest Crossing","img_id":3,"gender":"F"}];
}
