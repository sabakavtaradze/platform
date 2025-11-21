import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FeedRefreshService } from 'src/app/services/feed-refresh.service';
import { HeaderService } from 'src/app/services/header.service';
import { PostService } from 'src/app/services/post/post.service';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],
  standalone: false
})
export class MainpageComponent implements OnInit, OnDestroy {
  // contents: Content[] = [
  //   { name: "saba kavtaradze", profImg: "https://scontent.ftbs5-2.fna.fbcdn.net/v/t39.30808-6/345455966_888361955597755_6568258617160952884_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGPCOBbJ3P64RnhXG5vseesGhcsxIHJv-YaFyzEgcm_5pYmf_Nq3ylzlN2gKP2jfy00ab1nLC9chRmS1o-xoH77&_nc_ohc=UUjKO6HHwq4AX9PNTfO&_nc_ht=scontent.ftbs5-2.fna&oh=00_AfDKS2DmoRY98quFaFDW6dvgeEgzN5geRxownQjeL8YAgA&oe=6532DE9D", date: "Yesterday at 8:40 PM", text: "Lorem ipsum dolor sit amet, an quo habemus prodesset dissentiunt. Laoreet molestiae interpretaris ne nec. Minim commodo volutpat ut quo, ex vim essent perfecto recusabo. Ea congue nullam per. Eam eu affert eloquentiam, ut ubique essent eloquentiam sed.", like: 500, dislike: 500, comment: 500, share: 500, edit: 2, video: "https://www.youtube.com/embed/CcGCACqeQuQ?si=5h4yKJTef5vMC5br" },
  //   { name: "guga kavtaradze", profImg: "https://scontent.ftbs5-2.fna.fbcdn.net/v/t39.30808-6/347568221_1193371834704470_3431834618243283281_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEuzOaUCEOK2lKyqrRL2o04vZ34MTRKICm9nfgxNEogKcQgz0RooGHeF1fVu6apHUsKgd3Z52_J9osyyeFSSSg8&_nc_ohc=0fuyDEv5yCcAX8yMWTU&_nc_ht=scontent.ftbs5-2.fna&oh=00_AfBc2XLrn3uCAk8Z4XzM50R9awNcKKqukBVBkSVTcZqgTw&oe=65320BF5", date: "Yesterday at 8:40 PM", text: "Lorem ipsum dolor sit amet, an quo habemus prodesset dissentiunt. Laoreet molestiae interpretaris ne nec. Minim commodo volutpat ut quo, ex vim essent perfecto recusabo. Ea congue nullam per. Eam eu affert eloquentiam, ut ubique essent eloquentiam sed.", like: 500, dislike: 500, comment: 500, share: 500, edit: 2, video: "https://www.youtube.com/embed/fU1YJE9HKaQ?si=Sz_aokejYwZqPOkn" },
  //   { name: "lasha kavtaradze", profImg: "https://scontent.ftbs5-2.fna.fbcdn.net/v/t39.30808-6/345455966_888361955597755_6568258617160952884_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGPCOBbJ3P64RnhXG5vseesGhcsxIHJv-YaFyzEgcm_5pYmf_Nq3ylzlN2gKP2jfy00ab1nLC9chRmS1o-xoH77&_nc_ohc=UUjKO6HHwq4AX9PNTfO&_nc_ht=scontent.ftbs5-2.fna&oh=00_AfDKS2DmoRY98quFaFDW6dvgeEgzN5geRxownQjeL8YAgA&oe=6532DE9D", date: "Yesterday at 8:40 PM", text: "Lorem ipsum dolor sit amet, an quo habemus prodesset dissentiunt. Laoreet molestiae interpretaris ne nec. Minim commodo volutpat ut quo, ex vim essent perfecto recusabo. Ea congue nullam per. Eam eu affert eloquentiam, ut ubique essent eloquentiam sed.", like: 500, dislike: 500, comment: 500, share: 500, edit: 2, video: "https://www.youtube.com/embed/fiBLgEx6svA?si=fMY85V-U7IvzQAj1" },
  //   { name: "gio kavtaradze", profImg: "https://scontent.ftbs5-2.fna.fbcdn.net/v/t39.30808-6/345455966_888361955597755_6568258617160952884_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGPCOBbJ3P64RnhXG5vseesGhcsxIHJv-YaFyzEgcm_5pYmf_Nq3ylzlN2gKP2jfy00ab1nLC9chRmS1o-xoH77&_nc_ohc=UUjKO6HHwq4AX9PNTfO&_nc_ht=scontent.ftbs5-2.fna&oh=00_AfDKS2DmoRY98quFaFDW6dvgeEgzN5geRxownQjeL8YAgA&oe=6532DE9D", date: "Yesterday at 8:40 PM", text: "Lorem ipsum dolor sit amet, an quo habemus prodesset dissentiunt. Laoreet molestiae interpretaris ne nec. Minim commodo volutpat ut quo, ex vim essent perfecto recusabo. Ea congue nullam per. Eam eu affert eloquentiam, ut ubique essent eloquentiam sed.", like: 500, dislike: 500, comment: 500, share: 500, edit: 2, video: "https://www.youtube.com/embed/iX-QaNzd-0Y?si=ALTGp2PTWWrFhJ0W" },
  //   { name: "saba kavtaradze", profImg: "https://scontent.ftbs5-2.fna.fbcdn.net/v/t39.30808-6/345455966_888361955597755_6568258617160952884_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGPCOBbJ3P64RnhXG5vseesGhcsxIHJv-YaFyzEgcm_5pYmf_Nq3ylzlN2gKP2jfy00ab1nLC9chRmS1o-xoH77&_nc_ohc=UUjKO6HHwq4AX9PNTfO&_nc_ht=scontent.ftbs5-2.fna&oh=00_AfDKS2DmoRY98quFaFDW6dvgeEgzN5geRxownQjeL8YAgA&oe=6532DE9D", date: "Yesterday at 8:40 PM", text: "Lorem ipsum dolor sit amet, an quo habemus prodesset dissentiunt. Laoreet molestiae interpretaris ne nec. Minim commodo volutpat ut quo, ex vim essent perfecto recusabo. Ea congue nullam per. Eam eu affert eloquentiam, ut ubique essent eloquentiam sed.", like: 500, dislike: 500, comment: 500, share: 500, edit: 2, video: "https://www.youtube.com/embed/fU1YJE9HKaQ?si=Sz_aokejYwZqPOkn" },
  //   { name: "saba kavtaradze", profImg: "https://scontent.ftbs5-2.fna.fbcdn.net/v/t39.30808-6/345455966_888361955597755_6568258617160952884_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGPCOBbJ3P64RnhXG5vseesGhcsxIHJv-YaFyzEgcm_5pYmf_Nq3ylzlN2gKP2jfy00ab1nLC9chRmS1o-xoH77&_nc_ohc=UUjKO6HHwq4AX9PNTfO&_nc_ht=scontent.ftbs5-2.fna&oh=00_AfDKS2DmoRY98quFaFDW6dvgeEgzN5geRxownQjeL8YAgA&oe=6532DE9D", date: "Yesterday at 8:40 PM", text: "Lorem ipsum dolor sit amet, an quo habemus prodesset dissentiunt. Laoreet molestiae interpretaris ne nec. Minim commodo volutpat ut quo, ex vim essent perfecto recusabo. Ea congue nullam per. Eam eu affert eloquentiam, ut ubique essent eloquentiam sed.", like: 500, dislike: 500, comment: 500, share: 500, edit: 2, video: "https://www.youtube.com/embed/CcGCACqeQuQ?si=5h4yKJTef5vMC5br" },
  // ]
  email: string = 'sabakavtaradzee@gmail.com';
  password: string = 'Sabasaba1!';
  private apiUrl = 'https://api.example.com/data';
  currentUser: any;
  listPosts: any;
  updateUser: any;
  isHeaderVisible = true;
  lastScrollTop = 0;
  isAdmin: boolean = false;
  hideHeaderScrollThreshold: number = 50;
  private feedRefreshSub?: Subscription;
  constructor(
    private postService: PostService,
    private router: Router,
    private authGuard: AuthenticationService,
    private headerservice: HeaderService,
    private feedRefresh: FeedRefreshService
  ) { }

  async signOut() {
    try {
      this.authGuard.canActivate();
      this.router.navigateByUrl('/auth/welcome');
    } catch (error) {
      console.error(error);
    }
  }

  async updateUserFunction() {
    try {
    } catch (error) {
      // Handle errors
    }
  }
  ngOnDestroy(): void {
    if (this.updateUser) {
      this.updateUser.unsubscribe();
    }
    this.feedRefreshSub?.unsubscribe();
  }

  // async checkUser(){
  //   try {
  //     // const check = Auth.Credentials("sabakavtaradzee1234@gmail.com")
  //     // console.log(check)
  //   }
  //   catch (error){
  //     console.error(error)
  //   }
  // }@HostListener('scroll', ['$event.target'])

  @HostListener('window:scroll', [])
  onScroll() {
    try {
      const scrollY =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      // Determine direction and toggle header visibility
      const isScrollingDown = scrollY > this.lastScrollTop;
      this.isHeaderVisible = !isScrollingDown;

      // Clamp and store last scroll position
      this.lastScrollTop = scrollY <= 0 ? 0 : scrollY;

      this.headerservice.setScrollPosition(this.isHeaderVisible);
    } catch (error) {
      console.error('Error in scroll event:', error);
    }
  }
  removePostFromList(postId: number) {
    this.listPosts = this.listPosts.filter((p: any) => p.postID !== postId);
  }

  loadPosts() {
    this.postService.getAllPosts().subscribe({
      next: (response) => {
        if (response.isSuccess && response.data) {
          this.listPosts = response.data;
          console.log('✅ Posts loaded:', this.listPosts);
        } else {
          console.warn('⚠️ No posts found or response invalid:', response);
        }
      },
      error: (err) => {
        console.error('❌ Error fetching posts:', err);
      },
    });
  }

  async auth() {
    try {
      return (this.loadPosts(), this.updateUserFunction());
    } catch (error) {
      console.error(error);
    }
  }

  ngOnInit() {
    this.auth();
    this.isAdmin = this.authGuard.isAdmin();
    // Refresh feed when a new post is created
    this.feedRefreshSub = this.feedRefresh.refresh$.subscribe(() => {
      this.loadPosts();
    });
  }
}
