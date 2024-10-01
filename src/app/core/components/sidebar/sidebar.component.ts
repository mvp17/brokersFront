import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/modules/login/auth/auth.service";

@Component({
  selector: "sidebar-boots",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent {
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  isSubmenuOpen: { [key: string]: boolean } = {};
  
  constructor(public authService: AuthService, private router: Router) { }

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);

  toggleSubmenu(menu: string) {
    this.isSubmenuOpen[menu] = !this.isSubmenuOpen[menu];
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
