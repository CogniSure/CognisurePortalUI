import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SessionInterruptService } from '../../services/auth/session-interrupt.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'session-expiration-alert',
  templateUrl: './session-expiration-alert.component.html',
  styleUrls: ['./session-expiration-alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionExpirationAlertComponent
  implements OnInit, OnChanges, OnDestroy
{
  startTimer? = false;
  alertAt? = 2;

  showModal = false;
  expired = false;
  private sessionTimerSubscription!: Subscription;
  private sessionStartSubscription!: Subscription;

  constructor(
    private el: ElementRef,
    private sessionInterrupter: SessionInterruptService,
    public sessionTimer: AuthService
  ) {
    this.alertAt = this.sessionTimer.expiresAt;
  }

  ngOnInit() {
    this.sessionStartSubscription = this.sessionTimer.sessionstart$.subscribe(
      (t) => {
        this.startTimer = t;
        if (!this.sessionTimerSubscription && this.startTimer) {
          this.trackSessionTime();
        }
      }
    );

    document.body.appendChild(this.el.nativeElement);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startTimer']) {
      this.cleanUp();
      if (changes['startTimer'].currentValue) {
        this.trackSessionTime();
      }
    }
  }
  sessionTimeOut = '';
  private trackSessionTime() {
    this.expired = false;
    this.sessionTimerSubscription = this.sessionTimer.remainSeconds$.subscribe(
      (t) => {
        if (t === this.alertAt) {
          this.open();
        }
        if (t === 0) {
          this.expired = true;
          this.cleanUp();
          this.sessionInterrupter.onExpire();
        }
      }
    );
  }
  continue() {
    this.sessionTimer.refreshToken().subscribe((res) => {
      if (res.success) {
        this.sessionTimer.setToken(res);
      }
    });
    this.sessionInterrupter.continueSession();
    this.sessionTimer.resetTimer();
    this.close();
  }
  logout() {
    this.sessionTimer.stopTimer();
    this.close();
    this.sessionInterrupter.stopSession();
  }

  open(): void {
    this.showModal = true;
    document.body.classList.add('sea-modal-open');
  }

  close(): void {
    this.showModal = false;
    document.body.classList.remove('sea-modal-open');
  }

  cleanUp() {
    this.logout();
    if (this.sessionTimerSubscription) {
      this.sessionTimerSubscription.unsubscribe();
    }
    if (this.sessionStartSubscription) {
      this.sessionStartSubscription.unsubscribe();
    }
  }
  reload() {
    this.close();
    location.reload();
  }

  ngOnDestroy(): void {
    this.el.nativeElement.remove();
    this.cleanUp();
  }

  @HostListener('document:keydown.tab', ['$event'])
  handleTabKey(e: KeyboardEvent) {
    const modal = document.querySelector('#session-expiration-alert');
    if (modal) {
      const btn1 = modal.querySelector<HTMLButtonElement>('button.btn-primary');
      const btn2 = modal.querySelector<HTMLButtonElement>(
        'button.btn-secondary'
      );
      if (document.activeElement === btn1) {
        btn2?.focus();
        e.preventDefault();
      }
    }
  }
  @HostListener('document:keydown.shift.tab', ['$event'])
  handleShiftTabKey(e: KeyboardEvent) {
    const modal = document.querySelector('#session-expiration-alert');
    if (modal) {
      const btn1 = modal.querySelector<HTMLButtonElement>('button.btn-primary');
      const btn2 = modal.querySelector<HTMLButtonElement>(
        'button.btn-secondary'
      );
      if (document.activeElement === btn2) {
        btn1?.focus();
        e.preventDefault();
      }
    }
  }
}
