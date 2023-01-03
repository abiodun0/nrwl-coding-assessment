import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {CdkAccordionModule} from '@angular/cdk/accordion';


import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';

@NgModule({
  declarations: [AppComponent, TicketsComponent, TicketDetailsComponent, CdkAccordionModule],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(
      [
        { path: '', component: TicketsComponent },
        { path: ':ticketId', component: TicketDetailsComponent },

        { path: '**', redirectTo: '/' },
      ],
      {
        initialNavigation: 'enabledBlocking',
      }
    ),
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
