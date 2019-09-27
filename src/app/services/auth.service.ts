import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';


@Injectable()
export class AuthService {
  authUrl = `${environment.baseUrl}/auth`;

  constructor(private http: HttpClient) {
  }


  login(loginData: {}) {
    return this.http.post(`${this.authUrl}/login/`, loginData).pipe(
      tap((data: any) => localStorage.setItem('token', data.key))
    );
  }

  logout() {
    localStorage.clear();
  }
}
