import { ChangeDetectorRef, Component, OnInit,CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/services/common/loader.service';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: [ './loader.component.scss' ],
})
export class LoaderComponent implements OnInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  //showSpinner= false
  @Input() showSpinner: boolean=false;
  constructor(private loaderService: LoaderService, private cdRef:ChangeDetectorRef) {
    
  }
ngOnInit(): void {
    //this.init();
    console.log("Spinner Status")
    console.log(this.showSpinner)
}
ngOnChanges(changes: any) {
  console.log("Spinner Status")
  console.log(changes)
  if (changes.showSpinner != null) {
    this.showSpinner = changes.showSpinner.currentValue
  }
  
}
  init(){
    this.loaderService.getSpinnerObservable().subscribe((status)=>{
      if(status === 'start'){
        this.showSpinner=true
      this.cdRef.detectChanges()
      }
      else
      this.showSpinner=false;
    })
  }
}