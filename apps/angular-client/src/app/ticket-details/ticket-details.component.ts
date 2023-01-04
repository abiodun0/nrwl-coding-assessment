import { Ticket, User } from '@acme/shared-models';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import {MatSnackBar} from '@angular/material/snack-bar';
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
  users$ = this.api.users();
  disableSelect = new FormControl(false);
  ticketUser$: Observable<User> = this.currentTicket$.pipe(
    mergeMap((ticket: Ticket) =>
      ticket.assigneeId
        ? this.api.user(Number(ticket.assigneeId))
        : of(unAssignedUser)
    )
  );
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private _snackBar: MatSnackBar
  ) {}
  changeAssgignedUser(user: MatSelectChange, ticketId: number) {
    const [id, name] = user.value.split(',');
    return this.api.assign(ticketId, id).subscribe({
      complete: () => {
        this._snackBar.open(
          'This ticket has been successfully assigned to:',
          name
        );
        this.refreshData();
      },
      error: (error) => {
        this._snackBar.open('There was an error, reference:', error.statusText);
      },
    });
  }
  refreshData() {
    this.currentTicket$ = this.api.ticket(Number(this.ticketId));
  }
  markAsComplete(event: MatSlideToggleChange, ticketId: number) {
    return this.api.complete(ticketId, event.checked).subscribe({
      complete: () => {
        this._snackBar.open(
          'This ticket has been successfully marked as:',
          event.checked ? 'Complete' : 'Open'
        );
        this.refreshData();
      },
      error: (error) => {
        this._snackBar.open('There was an error, reference:', error.statusText);
      },
    });
  }
}
