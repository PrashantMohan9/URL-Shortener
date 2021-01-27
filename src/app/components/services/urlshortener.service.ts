import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlshortenerService {

  constructor(private http: HttpClient, private router: Router) { }

  getAllUrl(){
    return this.http.get(environment.baseUrl + "api/url") 
  }


  shortenURL(fullURL){
    const data={
      fullURL:fullURL
    }
    return this.http.post(environment.baseUrl + "api/url", data)
  }

  unAuth_shortenURL(fullURL){
    const data={
      fullURL:fullURL
    }
    return this.http.post(environment.baseUrl + "api/url/unauth", data)
  }

}
