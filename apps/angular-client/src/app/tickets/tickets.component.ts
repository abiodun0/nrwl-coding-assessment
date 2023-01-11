import { Ticket } from '@acme/shared-models';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import {map } from 'rxjs/operators';
import { ApiService } from '../api.service';

const taskMap: Record<string, boolean> = {
  completed: true,
  open: false,
}

export interface DialogData {
  refresh: () => void;
}

@Component({
  selector: 'acme-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent {
  tickets$ = this.api.tickets()
  users$ = this.api.users();
  currentUserFilter = 0;
  currentCompletedFilter = "showAll";
  constructor(private api: ApiService, private dialog: MatDialog) {}
  
  filterListByUser(event: MatSelectChange) {
    this.currentUserFilter = Number(event.value)
    this.filterBySelection()
  }
  filterByCompleted(event: MatSelectChange) {
    this.currentCompletedFilter = event.value
    this.filterBySelection()
  }
  filterBySelection() {
    const currentfilterMap = taskMap[this.currentCompletedFilter]
    this.tickets$ = this.api.tickets().pipe(
      map((tickets: Ticket[]) => {
        return tickets.filter((ticket) => {
          if (this.currentUserFilter === 0 && currentfilterMap === undefined) {
            return true;
          }
          if (this.currentUserFilter === 0) {
            return ticket.completed === currentfilterMap;
          }
          if (currentfilterMap === undefined) {
            return ticket.assigneeId === Number(this.currentUserFilter);
          }
          return ticket.assigneeId === Number(this.currentUserFilter) && ticket.completed === currentfilterMap;
        })
      }
    ));
  }
  openDialog() {
     this.dialog.open(AddNewTicketDialogComponent, {data: {
      refresh: () => this.filterBySelection()
     }})
  }
}


@Component({
  selector: 'acme-add-ticket-dialog',
  templateUrl: 'ticket-add-dialog.component.html',
})
export class AddNewTicketDialogComponent {
  description = '';
  constructor(
    private api: ApiService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddNewTicketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
  ) {}

  onSubmit(): void {
    this.api.newTicket({description: this.description}).subscribe({
      complete: () => {
        this._snackBar.open(
          'Successfully added new ticket'
        );
        this.data.refresh()
      },
      error: (error) => {
        this._snackBar.open('There was an error, reference:', error.statusText);
      },
    });
    this.dialogRef.close();
  }
}