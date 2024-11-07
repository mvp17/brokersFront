import { Component, Input } from '@angular/core';
import { formatDisplayValue } from '../../functions/formatting-value';

@Component({
  selector: 'app-formatted-decimal-input',
  templateUrl: './formatted-decimal-input.component.html',
  styleUrls: ['./formatted-decimal-input.component.scss']
})
export class FormattedDecimalInputComponent {
  // Accepting ngModel binding from parent component
  @Input() data: string | undefined;
  @Input() isDisabled: boolean = false;

  constructor() {}

  // Handle input change
  onInputChange(event: any): void {
    let inputValue = event.target.value;

    // Replace dots with commas and keep only numbers and one comma
    const cleanedValue = this.cleanInput(inputValue);

    // Update the display value by formatting
    if (cleanedValue !== inputValue) {
      event.target.value = formatDisplayValue(cleanedValue);
    }
  }

  // Cleans the input to ensure only valid format is accepted
  cleanInput(value: string): string {
    // Remove all non-numeric characters except for a single comma
    const cleanedValue = value.replace(/[^0-9,]/g, '');

    // Match and format to '##,######'
    const regex = /^(\d{0,2})(,\d{0,6})?$/; // Matches '##,######'
    const match = cleanedValue.match(regex);

    if (match) {
      return match[0]; // Return the matched portion (valid format)
    } else {
      return ''; // Return an empty string if not matched
    }
  }

  // Handle keypress to prevent invalid characters
  onKeyPress(event: KeyboardEvent): void {
    const allowedKeys = [
      'Backspace',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
      'Tab',
      'Enter',
      ',',
    ];
    if (!/\d/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
}
