import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { MainpageComponent } from './category/mainpage/mainpage.component';
import { MenuComponent } from './gadgets/menu/menu.component';
import { LibraryComponent } from './category/library/library.component';
import { VideosComponent } from './category/videos/videos.component';
import { NotificationsComponent } from './category/notifications/notifications.component';
import { ContentComponent } from './contentlist/content/content.component';
import { SubcategoryComponent } from './gadgets/subcategory/subcategory.component';
import { VoteComponent } from './category/vote/vote.component';
import { MultiselectComponent } from './gadgets/multiselect/multiselect.component';
import { DialogpickerComponent } from './gadgets/dialogpicker/dialogpicker.component';
import { DialogpickertemplateComponent } from './gadgets/dialogpickertemplate/dialogpickertemplate.component';
import { DragpreviewComponent } from './gadgets/dragpreview/dragpreview.component';
import { ContentvoteComponent } from './contentlist/contentvote/contentvote.component';
import { ModelsComponent } from './contentlist/models/models.component';
import { ReviewstarsComponent } from './gadgets/reviewstars/reviewstars.component';
import { CreatecontentComponent } from './gadgets/createcontent/createcontent.component';
import { CreatecontentdialogComponent } from './gadgets/createcontent/createcontentdialog/createcontentdialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentcommentdialogComponent } from './contentlist/content/contentcommentdialog/contentcommentdialog.component';
import { ContentcommentdialogcommentComponent } from './contentlist/content/contentcommentdialog/contentcommentdialogcomment/contentcommentdialogcomment.component';
import { SharedmoduleModule } from '../sharedmodule/sharedmodule.module';
import { FooterComponent } from './footer/footer.component';
import { ContenteditdialogComponent } from './contentlist/content/contentcommentdialog/contenteditdialog/contenteditdialog.component';
import { ProfileComponent } from './category/profile/profile.component';
import { ContentphotodialogComponent } from './contentlist/content/contentphotodialog/contentphotodialog.component';
import { NotificationslistComponent } from './category/notifications/notificationslist/notificationslist.component';

// import { MessageTimePipe } from 'src/app/pipes/message-time.pipe';

const routes: Routes = [
  { path: '', redirectTo: '/feed', pathMatch: 'full' },
  { path: 'feed', component: MainpageComponent, canActivate: [AuthenticationService], pathMatch: 'full', },
  { path: 'home', component: HomepageComponent, canActivate: [AuthenticationService], pathMatch: 'full', },
  { path: 'library', component: LibraryComponent, canActivate: [AuthenticationService], pathMatch: 'full', },
  { path: 'videos', component: VideosComponent, canActivate: [AuthenticationService], pathMatch: 'full', },
  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthenticationService], pathMatch: 'full', },
  { path: 'vote', component: VoteComponent, canActivate: [AuthenticationService], pathMatch: 'full', },
  { path: 'profile/:profileId', component: ProfileComponent, canActivate: [AuthenticationService], pathMatch: 'full', },

];


@NgModule({
  declarations: [
    HomepageComponent,
    // HeaderComponent,
    MainpageComponent,
    MenuComponent,
    LibraryComponent,
    VideosComponent,
    NotificationsComponent,
    ContentComponent,
    SubcategoryComponent,
    VoteComponent,
    MultiselectComponent,
    DialogpickerComponent,
    DialogpickertemplateComponent,
    DragpreviewComponent,
    ContentvoteComponent,
    ModelsComponent,
    ReviewstarsComponent,
    CreatecontentComponent,
    CreatecontentdialogComponent,
    ContentcommentdialogComponent,
    ContentcommentdialogcommentComponent,
    ContenteditdialogComponent,
    ProfileComponent,
    ContentphotodialogComponent,
    NotificationslistComponent,


    // MessageTimePipe,

  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    NgbRatingModule,
    MatButtonModule,
    MatSelectModule,
    MatSliderModule,
    CdkDropList,
    MatDatepickerModule,
    MatDialogModule,
    MatMenuModule,
    CdkDropList,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    SharedmoduleModule,


    RouterModule.forChild(routes)

  ],
  providers: [DialogpickertemplateComponent],

})
export class MainpagesModule { }
