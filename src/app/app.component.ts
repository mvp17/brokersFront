import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'brokers';

  public sidebarExpanded: boolean;

  constructor() {
    this.sidebarExpanded = true;
  }
}
