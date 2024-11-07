// Converts dot to comma for display (not strictly necessary with ngModel)
export function formatDisplayValue(value: string): string {
  return value ? value.replace('.', ',') : '';
}

// Converts comma to dot for internal value
export function formatInternalValue(value: string): string {
  return value ? value.replace(',', '.') : '';
}
