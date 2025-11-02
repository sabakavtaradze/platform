import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { TermsandconditionsComponent } from './termsandconditions/termsandconditions.component';
import { RouterModule, Routes } from '@angular/router';
import { AboutpageComponent } from './aboutpage.component';
import { SharedmoduleModule } from '../sharedmodule/sharedmodule.module';
const routes: Routes = [
  { path: '', redirectTo: 'auth/welcome', pathMatch: 'full' },
  // { path: 'about', component: AboutpageComponent, pathMatch: 'full' },

  { path: 'privacy', component: PrivacypolicyComponent, pathMatch: 'full' },
  { path: 'termsandconditions', component: TermsandconditionsComponent, pathMatch: 'full' }
]
@NgModule({
  declarations: [
    // AboutpageComponent,
    PrivacypolicyComponent,
    TermsandconditionsComponent
  ],
  imports: [
    CommonModule,
    SharedmoduleModule,
    RouterModule.forChild(routes)
  ]
})
export class AboutpageModule { }
