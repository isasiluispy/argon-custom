import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string = localStorage.getItem('token');

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Token ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        // 401 -> Unauthorized
        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        }

        return throwError(err);

      })
    );
  }

}
