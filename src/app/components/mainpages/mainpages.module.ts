import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { RouterModule, Routes } from '@angular/router';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';
import { SharedmoduleModule } from '../sharedmodule/sharedmodule.module';
import { TikTokConnectComponent } from '../social/tiktok-connect/tiktok-connect.component';
import { TwitchLoginComponent } from '../social/twitch-login/twitch-login.component';
import { LibraryComponent } from './category/library/library.component';
import { MainpageComponent } from './category/mainpage/mainpage.component';
import { NotificationsComponent } from './category/notifications/notifications.component';
import { NotificationslistComponent } from './category/notifications/notificationslist/notificationslist.component';
import { ProfileComponent } from './category/profile/profile.component';
import { VideosComponent } from './category/videos/videos.component';
import { VoteComponent } from './category/vote/vote.component';
import { ContentComponent } from './contentlist/content/content.component';
import { ContentcommentdialogComponent } from './contentlist/content/contentcommentdialog/contentcommentdialog.component';
import { ContentcommentdialogcommentComponent } from './contentlist/content/contentcommentdialog/contentcommentdialogcomment/contentcommentdialogcomment.component';
import { ContenteditdialogComponent } from './contentlist/content/contentcommentdialog/contenteditdialog/contenteditdialog.component';
import { ContentphotodialogComponent } from './contentlist/content/contentphotodialog/contentphotodialog.component';
import { ContentzoomdialogComponent } from './contentlist/content/contentzoomdialog/contentzoomdialog.component';
import { ContentvoteComponent } from './contentlist/contentvote/contentvote.component';
import { ModelsComponent } from './contentlist/models/models.component';
import { CreatecontentComponent } from './gadgets/createcontent/createcontent.component';
import { CreatecontentdialogComponent } from './gadgets/createcontent/createcontentdialog/createcontentdialog.component';
import { DialogpickerComponent } from './gadgets/dialogpicker/dialogpicker.component';
import { DialogpickertemplateComponent } from './gadgets/dialogpickertemplate/dialogpickertemplate.component';
import { DragpreviewComponent } from './gadgets/dragpreview/dragpreview.component';
import { MenuComponent } from './gadgets/menu/menu.component';
import { MultiselectComponent } from './gadgets/multiselect/multiselect.component';
import { ReviewstarsComponent } from './gadgets/reviewstars/reviewstars.component';
import { SubcategoryComponent } from './gadgets/subcategory/subcategory.component';
import { HomepageComponent } from './homepage/homepage.component';

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
    ContentzoomdialogComponent,
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
    MatDatepickerModule,
    MatDialogModule,
    MatMenuModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    SharedmoduleModule,
    TikTokConnectComponent,
    TwitchLoginComponent,

    RouterModule.forChild(routes)

  ],
  exports: [ContentComponent],
  providers: [DialogpickertemplateComponent],

})
export class MainpagesModule { }
