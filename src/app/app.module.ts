import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/auth/login/login.component';
import { WelcomepageComponent } from './components/auth/welcomepage/welcomepage.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomepageComponent } from './components/mainpages/homepage/homepage.component';
import { HeaderComponent } from './components/mainpages/header/header.component';
import { MainpageComponent } from './components/mainpages/category/mainpage/mainpage.component';
import { MenuComponent } from './components/mainpages/gadgets/menu/menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { LibraryComponent } from './components/mainpages/category/library/library.component';
import { VideosComponent } from './components/mainpages/category/videos/videos.component';
import { NotificationsComponent } from './components/mainpages/category/notifications/notifications.component';
import { ContentComponent } from './components/mainpages/contentlist/content/content.component';
import { SubcategoryComponent } from './components/mainpages/gadgets/subcategory/subcategory.component'
import { MatTreeModule } from '@angular/material/tree';
import { VoteComponent } from './components/mainpages/category/vote/vote.component';
import { MultiselectComponent } from './components/mainpages/gadgets/multiselect/multiselect.component';
import { MatSelectModule } from '@angular/material/select';
import { DialogpickerComponent } from './components/mainpages/gadgets/dialogpicker/dialogpicker.component';
import { DialogpickertemplateComponent } from './components/mainpages/gadgets/dialogpickertemplate/dialogpickertemplate.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DragpreviewComponent } from './components/mainpages/gadgets/dragpreview/dragpreview.component';
import { CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { ContentvoteComponent } from './components/mainpages/contentlist/contentvote/contentvote.component';
import { ModelsComponent } from './components/mainpages/contentlist/models/models.component';
import {MatCardModule} from '@angular/material/card';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { ReviewstarsComponent } from './components/mainpages/gadgets/reviewstars/reviewstars.component';
import { MatSliderModule } from '@angular/material/slider';
import { NgbModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { RegisterComponent } from './components/auth/register/register.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CreatecontentComponent } from './components/mainpages/gadgets/createcontent/createcontent.component';
import { CreatecontentdialogComponent } from './components/mainpages/gadgets/createcontent/createcontentdialog/createcontentdialog.component';
import { RegisterconfromComponent } from './components/auth/register/registerconfrom/registerconfrom.component';
import { RouterModule } from '@angular/router';
import { ChatComponent } from './components/chat/chat/chat.component';
import { ChatlistComponent } from './components/chat/chat/chatlist/chatlist.component';
import { FooterComponent } from './components/mainpages/footer/footer.component';
import { AboutpageComponent } from './components/aboutpage/aboutpage.component';
import { PrivacypolicyComponent } from './components/aboutpage/privacypolicy/privacypolicy.component';
import { SharedmoduleModule } from './components/sharedmodule/sharedmodule.module';
import { TermsandconditionsComponent } from './components/aboutpage/termsandconditions/termsandconditions.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    RouterModule,
    // MatInputModule,
    // MatButtonModule,
    MatIconModule,
    // MatTreeModule,
    // MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    SharedmoduleModule,
    // MatIconModule,
    // MatDialogModule,
    // MatCheckboxModule,
    // DragDropModule,
    // CdkDropList,
    // MatCardModule,
    // MdbAccordionModule,
    // MdbCarouselModule,
    // MdbCheckboxModule,
    // MdbCollapseModule,
    // MdbDropdownModule,
    // MdbFormsModule,
    // MdbModalModule,
    // MdbPopoverModule,
    // MdbRadioModule,
    // MdbRangeModule,
    // MdbRippleModule,
    // MdbScrollspyModule,
    // MdbTabsModule,
    // MdbTooltipModule,
    // MdbValidationModule,
    // MatSelectModule,
    // MatSliderModule,
    // NgbModule,
    // NgxBootstrapIconsModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    HttpClientModule
    
  ],
  
  bootstrap: [AppComponent],
    providers: [HttpClient,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }
    ]
})
export class AppModule { }

