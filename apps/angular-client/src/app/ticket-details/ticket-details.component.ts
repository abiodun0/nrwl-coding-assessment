import { Ticket, User } from '@acme/shared-models';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, Observable, of } from 'rxjs';
import { ApiService } from '../api.service';

const unAssignedUser: User = {
  id: 0,
  name: "Uassigned"
}
@Component({
  selector: 'acme-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css'],
})
export class TicketDetailsComponent {
  ticketId = this.route.snapshot.paramMap.get('ticketId');
  currentTicket$: Observable<Ticket> = this.api.ticket(Number(this.ticketId));
  disableSelect = new FormControl(false);
  ticketUser$: Observable<User> = this.currentTicket$.pipe(mergeMap(((ticket: Ticket) => ticket.assigneeId ? this.api.user(Number(ticket.assigneeId)): of(unAssignedUser))))
  constructor(private route: ActivatedRoute, private api: ApiService) {
  }
}
