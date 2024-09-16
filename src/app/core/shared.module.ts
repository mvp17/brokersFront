import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './application/components/sidebar/sidebar.component';
import { TableComponent } from './application/components/table/table.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    SidebarComponent,
    TableComponent
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
    TableComponent
  ],
  providers: [
    SidebarComponent,
    TableComponent
  ]
})

export class SharedModule { }
