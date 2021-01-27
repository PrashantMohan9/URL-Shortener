import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from "../../models/auth-data";
import { Router } from "@angular/router";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) { }

  public getToken() {
    return this.token;
  }

  public getIsAuth() {
    return this.isAuthenticated;
  }

  createUser(email: string, password: string, name: string){
    const authData: AuthData = {
      email:email,
      password:password,
      name:name
    };

    this.http.post(environment.baseUrl + "api/user/signup", authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(email: string, password: string) {
    const authData = {
      email:email,
      password:password
    }
    console.log(authData);
    this.http.post<{token: string,name:string}>(environment.baseUrl + "api/user/login", authData)
      .subscribe(response => {
        console.log(response);
        const token = response.token;
        this.token = token;
        if(token){
          this.isAuthenticated = true;
          localStorage.setItem('token', response.token);
          localStorage.setItem('UserName', response.name);
          this.router.navigate(['/candidate']);
          }
      });
  }

  logout() {
    this.token=null;
    localStorage.removeItem('token');
    localStorage.removeItem('UserName');
    this.isAuthenticated=false;
    this.router.navigate(['/']);
  }

}
