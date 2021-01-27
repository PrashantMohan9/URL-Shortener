import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { CandidatePageComponent } from './components/candidate-page/candidate-page.component';
import { AuthGuard } from "./components/services/auth.guard";
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
  // { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path:'landing', component:LandingPageComponent },
  { path:'', component:HomepageComponent },
  { path:'signup', component:SignupPageComponent },
  { path:'candidate', component:CandidatePageComponent },  // , canActivate: [AuthGuard] 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }