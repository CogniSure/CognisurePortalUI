import { Component } from '@angular/core';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent {
  borderTop: boolean = true;
  contacts: any[] = [
    {
      id: 1,
      name: "Jenson Delaney",
      email: "jenson.delany@mail.com",
      messagesCount: 3,
    },
    {
      id: 2,
      name: "Amaya Coffey",
      email: "amaya.coffey@mail.com",
      messagesCount: 1,
    },
    {
      id: 3,
      name: "Habib Joyce",
      email: "habib.joyce@mail.com",
      messagesCount: 5,
    },
    {
      id: 4,
      name: "Lilly-Ann Roche",
      email: "lilly-ann.roche@mail.com",
      messagesCount: 8,
    },
    {
      id: 5,
      name: "Giulia Haworth",
      email: "giulia.haworth@mail.com",
      messagesCount: 3,
    },
    {
      id: 6,
      name: "Dawson Humphrey",
      email: "dawson.humphrey@mail.com",
      messagesCount: 2,
    },
    {
      id: 7,
      name: "Reilly McCullough",
      email: "reilly.mccullough@mail.com",
      messagesCount: 3,
    },
  ];
  public getImageUrl(contactId: number): string {
    return `https://www.telerik.com/kendo-angular-ui-develop/components/listview/assets/contacts/${contactId}.png`;
  }

  public getMessagesText(messagesCount: number): string {
    return `${messagesCount} new message${messagesCount > 1 ? "s" : ""}`;
  }
}
