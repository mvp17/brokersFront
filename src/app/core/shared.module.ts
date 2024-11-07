import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TableComponent } from './components/table/table.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './components/header/header.component';
import { FormattedDecimalInputComponent } from './components/formatted-decimal-input/formatted-decimal-input.component';


@NgModule({
  declarations: [
    SidebarComponent,
    TableComponent,
    HeaderComponent,
    FormattedDecimalInputComponent
  ],
  imports: [
    RouterModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatTooltipModule
  ],
  exports: [
    RouterModule,
    SidebarComponent,
    TableComponent,
    HeaderComponent,
    FormattedDecimalInputComponent
  ],
  providers: [
    SidebarComponent,
    TableComponent
  ]
})

export class SharedModule { }
