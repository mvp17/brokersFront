import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
	toasts: any[] = [];

	private show(textOrTpl: string, options: any = {}): void {
		this.toasts.push({ textOrTpl, ...options });
	}

	public success(message: string): void {
		this.show(message, { classname: 'bg-success text-light', delay: 2000 });
	}

	public danger(message: string): void {
		this.show(message, { classname: 'bg-danger text-light', delay: 2000 });
	}

	public remove(toast: any): void {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

	public clear(): void {
		this.toasts.splice(0, this.toasts.length);
	}
}
