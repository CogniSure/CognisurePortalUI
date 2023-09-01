import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.prod'; 

@Component({
  selector: 'app-termsandconditions',
  templateUrl: './termsandconditions.component.html',
  styleUrls: ['./termsandconditions.component.scss']
})
export class TermsandconditionsComponent implements OnInit {
  environmentData = environment;

  constructor() { }

  ngOnInit(): void {
  }

}
