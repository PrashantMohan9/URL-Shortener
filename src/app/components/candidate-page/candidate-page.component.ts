import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UrlshortenerService } from '../services/urlshortener.service';
import { environment } from '../../../environments/environment';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-candidate-page',
  templateUrl: './candidate-page.component.html',
  styleUrls: ['./candidate-page.component.css']
})
export class CandidatePageComponent implements OnInit {
  Username:string;
  AllURL:any;
  submitted:boolean;
  baseURL=environment.baseUrl;
  showResult:boolean;

  constructor(private router: Router, public authService: AuthService,public urlShortner:UrlshortenerService, private _clipboardService: ClipboardService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.Username=localStorage.getItem('UserName');
    this.submitted=false;

    this.urlShortner.getAllUrl()
      .subscribe(response => {
        this.AllURL=response;
        this.AllURL=this.AllURL.url;
      });
  }

  onSubmit(form: NgForm) {
    if(form.invalid) {
      this.toastr.warning('Incorrect Input');
      return;
    }
    this.submitted=true;
    this.urlShortner.shortenURL(form.value.fullUrl)
      .subscribe(response => {
        this.AllURL=response;
        this.AllURL=this.AllURL.result.url;
        this.submitted=false;
        form.reset();
        this.toastr.success('Success');
      });
  }

  copyURL(copiedURL){
    copiedURL=environment.baseUrl + copiedURL;
    this._clipboardService.copy(copiedURL);
    this.toastr.success('URL Copied');
  }

  onLogout(){
    this.authService.logout();
  }

}
