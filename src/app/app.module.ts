import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { AuthInterceptor } from "./components/services/auth-interceptor";
import { CandidatePageComponent } from './components/candidate-page/candidate-page.component';
import { UrlshortenerService } from './components/services/urlshortener.service';
import { HomepageComponent } from './components/homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SignupPageComponent,
    CandidatePageComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    ClipboardModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
