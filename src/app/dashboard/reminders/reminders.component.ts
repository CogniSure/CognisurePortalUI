import { Component } from '@angular/core';
import { Reminder } from 'src/app/model/common/reminder';
import { GenericService } from 'src/app/services/common/generic.service';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent {
  reminders: Reminder[] = [];
  last = true;
  constructor(private reminderService: GenericService, ) {}

  ngOnInit(): void {
    this.reminders = this.reminderService.getReminders();
  }
  getFormattedTime(time: Date): string {
    return "";//this.datePipe.transform(time, 'dd/MM/yyyy HH:mm') || '';
  }
}
