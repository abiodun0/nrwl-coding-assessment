import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';


import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AsyncLoadingErrorPipePipe } from './async-loading-error-pipe.pipe';


@NgModule({
  declarations: [AppComponent, TicketsComponent, TicketDetailsComponent, AsyncLoadingErrorPipePipe],
  imports: [
    HttpClientModule,
    BrowserModule,
    CdkAccordionModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSelectModule,
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
    NoopAnimationsModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
