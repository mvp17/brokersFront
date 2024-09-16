import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AuthService } from "src/app/modules/login/infrastructure/auth/auth.service";

@Component({
  selector: "sidebar-boots",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent {
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public authService: AuthService) { }

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);
}
