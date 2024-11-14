import { Component, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/modules/login/auth/auth.service';
import { faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { IidNameDto } from '../../interfaces/idNameDto';
import { BrokersApiService } from '../../services/brokers/brokers-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  userIcon = faUser;
  usersIcon = faUsers;
  selectedBroker: IidNameDto;
  brokersDropdownOpen = false;
  profileDropdownOpen = false;
  searchText = '';  
  
  private clickListener: (() => void) | null = null;

  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
    public authService: AuthService,
    public brokersApiService: BrokersApiService
  ) {
    this.selectedBroker = {
      id: 0,
      name: "Select a broker"
    }
  }

  toggleBrokersDropdown() {
    this.brokersDropdownOpen = !this.brokersDropdownOpen;
    this.setupOutsideClickListener();
  }

  toggleProfileDropdown() {
    this.profileDropdownOpen = !this.profileDropdownOpen;
    this.setupOutsideClickListener();
  }

  closeDropdowns() {
    this.brokersDropdownOpen = false;
    this.profileDropdownOpen = false;
    this.removeOutsideClickListener();
  }

  filterBrokers() {
    this.brokersApiService.filteredBrokers = this.brokersApiService.brokers.filter((broker) =>
      broker.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  selectBroker(broker: IidNameDto) {
    this.selectedBroker = broker
    this.closeDropdowns(); // Close dropdown after selection
  }

  logout() {
    this.authService.logout();
    this.closeDropdowns();
  }

  private setupOutsideClickListener() {
    if (this.clickListener) this.clickListener();

    this.clickListener = this.renderer.listen('document', 'click', (event) => {
      const clickedInside = this.elRef.nativeElement.contains(event.target);
      if (!clickedInside) {
        this.closeDropdowns();
      }
    });
  }

  private removeOutsideClickListener() {
    if (this.clickListener) {
      this.clickListener();
      this.clickListener = null;
    }
  }
}
