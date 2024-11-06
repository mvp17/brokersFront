import { Component, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/modules/login/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  brokersDropdownOpen = false;
  profileDropdownOpen = false;
  searchText = '';
  brokers = [
    { name: 'Broker 1' },
    { name: 'Broker 2' },
    { name: 'Broker 3' },
    { name: 'Broker 4' },
    { name: 'Broker 5' },
    { name: 'Broker 6' }
  ];
  filteredBrokers = [...this.brokers];
  private clickListener: (() => void) | null = null;

  constructor(private renderer: Renderer2, 
              private elRef: ElementRef,
              public authService: AuthService) {}

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
    this.filteredBrokers = this.brokers.filter(broker =>
      broker.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  selectBroker(broker: any) {
    console.log('Selected Broker:', broker);
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
