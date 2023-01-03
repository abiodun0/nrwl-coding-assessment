import { Ticket } from '@acme/shared-models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'acme-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css'],
})
export class TicketDetailsComponent implements OnInit {
  currentTicket$: Observable<Ticket> | null;
  constructor(private route: ActivatedRoute, private api: ApiService) {
    this.currentTicket$ = null
  }

  ngOnInit(): void {
    const ticketId = this.route.snapshot.paramMap.get('ticketId');
    this.currentTicket$ = this.api.ticket(Number(ticketId));
    this.currentTicket$.subscribe(ticket => console.log(ticket , 'we have ticket'))
  }
}
