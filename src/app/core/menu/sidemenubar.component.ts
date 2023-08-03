import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  HostListener,
} from '@angular/core';
import { GlobalService } from 'src/app/services/common/global.service';
import { navbarData } from '../../model/sidenav/nav-data';




interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidemenubar',
  templateUrl: './sidemenubar.component.html',
  styleUrls: ['./sidemenubar.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms', style({ opacity: 0 })),
      ]),
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate(
          '1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class SidemenubarComponent implements OnInit {
  constructor(private toggleService:GlobalService) {}
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
   
    this.sideNavData = {
      collapsed : false,
      screenWidth : this.screenWidth
    }
    // this.toggleService.sideNavToggle$.subscribe(x=> {
    //  if(x!=null){
    //   this.collapsed = x.collapsed
    //  }
    // })
    //this.toggleService.sideNavToggle$.next(this.sideNavData);
    
  }
  sideNavData : SideNavToggle = {
    collapsed : false,
    screenWidth : 100
  };
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.sideNavData = {
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    }
    this.onToggleSideNav.emit(this.sideNavData);

    // this.toggleService.sideNavToggle$.subscribe(x=> x)
    // this.toggleService.sideNavToggle$.next(this.sideNavData);

  }



}
