import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { API, Amplify } from 'aws-amplify';
import { BehaviorSubject, filter } from 'rxjs';
import awsmobile from 'src/aws-exports';
import { HeaderService } from './services/header.service';
import { S3 } from 'aws-sdk';
const AWS = require('aws-sdk');
Amplify.configure(awsmobile)
// import awsmobile from '../../aws-exports'
API.configure(awsmobile)
const s3 = new AWS.S3();
const bucket = new S3(
  {
    region: 'us-east-1'
  }
);



// Amplify.configure({
//   aws_access_key_id: process.env['ACCESS_KEY_ID'],
//   aws_secret_access_key: process.env['SECRET_ACCESS_KEY'],
// })
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'socialplatform';
  components = true;
  chatId: any;
  productId: string | null = null;
  showComponent: boolean = true;
  profilePage: boolean = false;
  activePage: string = ""
  isHeaderVisible = false;
  hideHeaderScrollThreshold = 50;
  aboutPage = false;
  constructor(private router: Router, private activeRoute: ActivatedRoute, private headerService: HeaderService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let routerName = event.urlAfterRedirects
        if (routerName !== "/about/privacy" && routerName !== "/about/termsandconditions" && routerName !== "/auth/welcome" && routerName !== "/auth/login" && routerName !== "/auth/register" && routerName !== "/auth/registerconfrom" && routerName !== "/chat" && !routerName.includes("chat/chatroom") && routerName !== "/chat/users") {
          this.components = true
          console.log(this.aboutPage)

          if (routerName.includes('/feed')) {
            this.activePage = "feed"
          }
          if (routerName.includes('/library')) {
            this.activePage = "library"
          }
          if (routerName.includes('/notifications')) {
            this.activePage = "notifications"
          }
          if (routerName.includes('/profile')) {
            this.activePage = "profile"
          }
          console.log(this.activePage)
        }

        else {
          this.components = false
          console.log(this.aboutPage)
        }
        if (routerName.includes("/profile")) {
          this.profilePage = true;
        } if (!routerName.includes("/profile")) {
          this.profilePage = false;

        }
 
        
        
        if (routerName === "/about/privacy" || routerName === "/about/termsandconditions" || routerName === "/auth/welcome" || routerName === "/auth/login" || routerName === "/auth/register" || routerName === "/auth/registerconfrom") {
          this.aboutPage = true
        }
        else {
          this.aboutPage = false
          
        }
      }
    });
  }


  ngOnInit() {
    this.headerService.getScrollPosition().subscribe((visiable: boolean) => {
      this.isHeaderVisible = visiable
      // console.log(this.isHeaderVisible)
    });
  }
}