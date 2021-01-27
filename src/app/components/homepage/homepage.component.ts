import { Component, OnInit } from '@angular/core';
import Typewriter from 't-writer.js';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UrlshortenerService } from '../services/urlshortener.service';
import { environment } from '../../../environments/environment';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router: Router,public urlShortner:UrlshortenerService, private _clipboardService: ClipboardService, private toastr: ToastrService) { }
  AllURL = [];
  submitted:boolean;
  baseURL=environment.baseUrl;
  result:any;
  showResult:boolean;

  ngOnInit(): void {
    this.showResult=false;
    this.submitted=false;
    const target = document.querySelector('.tw');
    const writer = new Typewriter(target, {
      loop: true,
      typeSpeed: 80,
      deleteSpeed: 80,
      typeColor: '#4ad980'
    });

    writer
      .type('work')
      .rest(500)
      .changeOps({ deleteSpeed: 80 })
      .remove(4)
      .type('Feedback')
      .rest(500)
      .remove(8)
      .type('Engagement')
      .rest(500)
      .changeOps({ deleteSpeed: 20 })
      .remove(21)
      .type('Free')
      .rest(500)
      .clear()
      .start()   
  }

  onSubmit(form: NgForm) {
    if(form.invalid) {
      this.toastr.warning('Incorrect Input');
      return;
    }

    this.submitted=true;
    this.urlShortner.unAuth_shortenURL(form.value.fullUrl)
      .subscribe(response => {
        this.result = response;
        this.AllURL.push(this.result.url);

        this.showResult=true;
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

  scrollDown(){
    window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
  }
}
