import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ModalComponent } from './components/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorIntercept implements HttpInterceptor {
  constructor(private router: Router, private modalService: NgbModal) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Client Error: ${error.error.message}`;
          const modalRef = this.modalService.open(ModalComponent);
          modalRef.componentInstance.body = errorMessage;
          this.router.navigate(['']);
        } else {
          // server-side error
          errorMessage = `Server Error Status: ${error.status} \n Message: ${error.message}`;
          const modalRef = this.modalService.open(ModalComponent);
          modalRef.componentInstance.errorInterceptorOrigin = true;
          modalRef.componentInstance.body = errorMessage;
          this.router.navigate(['']);
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
