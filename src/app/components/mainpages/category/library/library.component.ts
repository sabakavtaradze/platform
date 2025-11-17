import { Component,HostListener } from '@angular/core';
import { Models,Professions} from 'src/app/interfaces/library/interfacelibrary';
import { HeaderService } from 'src/app/services/header.service';




@Component({
    selector: 'app-library',
    templateUrl: './library.component.html',
    styleUrls: ['./library.component.scss'],
    standalone: false
})

export class LibraryComponent {
  categoryprofessions: string[] = []
  isHeaderVisible: boolean = true
  hideHeaderScrollThreshold:number = 50
  models: Models[] = [
    { name: 'angela', profileImg: 'https://mediaslide-europe.storage.googleapis.com/models1/pictures/4652/21561/large-1689261475-ac626d0436f735d75e355b62843bb5ce.jpg', img: 'https://mediaslide-europe.storage.googleapis.com/models1/pictures/4652/21561/large-1689261476-592fb1d1799a31292203edb206ea8b83.jpg', age: 18, followers: 15000, stars: 4.8, profession: 'acter' },
    { name: 'anna', profileImg: 'https://mediaslide-europe.storage.googleapis.com/models1/pictures/3265/10663/large-1686328981-2d1d39fa9c0c1cff85143c9e3f5c9af8.jpg?v=1686329202', img: 'https://mediaslide-europe.storage.googleapis.com/models1/pictures/3265/10663/large-1686328981-001df88521c5511ee5c9b7f67e30f6c4.jpg', age: 23, followers: 22000, stars: 2.6, profession: 'reporter' },
    { name: 'nina', profileImg: 'https://mediaslide-europe.storage.googleapis.com/models1/pictures/1912/9310/large-1548686649-46c71babefb38df447893c51edae786e.jpg', img: 'https://mediaslide-europe.storage.googleapis.com/models1/pictures/1912/9310/large-1605626185-6bf6b3a30efc5ae6a2eb497bb9a9fa07.jpg', age: 28, followers: 28000, stars: 3, profession: 'influencer' },
    { name: 'anabel', profileImg: 'https://mediaslide-europe.storage.googleapis.com/models1/pictures/2141/9539/large-1536340021-ed00178f2bf28fb8a0777268626b5847.jpg', img: 'https://mediaslide-europe.storage.googleapis.com/models1/pictures/2141/9539/large-1536340022-015851864b8c44fbd3f29a0ff90cbc7e.jpg', age: 27, followers: 16000, stars: 5, profession: 'acter' },
    { name: 'liza', profileImg: 'https://mediaslide-europe.storage.googleapis.com/models1/pictures/3263/10661/large-1688635352-3034331bcc5e672048ba3ee6ed58659f.jpg', img: 'https://mediaslide-europe.storage.googleapis.com/models1/pictures/3263/10661/large-1688635353-34c7cb64e606886bef13aaced8f0af1b.jpg', age: 25, followers: 86000, stars: 4, profession: 'influencer' },
    { name: 'nona', profileImg: 'https://mediaslide-europe.storage.googleapis.com/models1/pictures/4739/22604/large-1659537534-a399ed8441798100f6925451c078889b.jpg', img: 'https://mediaslide-europe.storage.googleapis.com/models1/pictures/4739/22604/large-1659537533-c0de1fa6bf5de7253b1218399d01e011.jpg', age: 55, followers: 65000, stars: 1, profession: 'acter' },
  ]
  constructor(private headerservice: HeaderService){}
  // professions: Category[] = [
  //   { category: 'acter', active: true },
  //   { category: 'reporter', active: false },
  //   { category: 'influencer', active: false },
  //   { category: 'streamer', active: false },
  //   { category: 'writer', active: false },
    
  // ]
  // modelDetails: ModelDetails = { minAge: 18, maxAge: 55, minFollowers: 15000, maxFollowers: 65000 }
  
  filterModels: Professions = {
      professions: [
        { category: 'acter', active: true },
        { category: 'reporter', active: false },
        { category: 'influencer', active: false },
        { category: 'streamer', active: false },
        { category: 'writer', active: false },
      ],
      properties: { minAge: 18, maxAge: 55, minFollowers: 15000, maxFollowers: 65000 },
      pickedProperties: { minAge: 18, maxAge: 55, minFollowers: 15000, maxFollowers: 65000 },
      
    };
  // getprofession(){
  //   let professionsSet: Set<string> = new Set();
  //   this.models.forEach(item => {
  //     professionsSet.add(item.profession);
  //   });
  //   this.categoryprofessions = Array.from(professionsSet);
  // }
  // professions = this.models.map(item => item.profession);
  @HostListener('window:scroll', [])
onScroll(scrollElement: any) {
  try {
    const scrollY = scrollElement.scrollTop;

    if (scrollY > this.hideHeaderScrollThreshold) {
      this.isHeaderVisible = false;
    } else {
      this.isHeaderVisible = true;
    }
    this.hideHeaderScrollThreshold = scrollY
    

    this.headerservice.setScrollPosition(this.isHeaderVisible);
  } catch (error) {
    console.error('Error in scroll event:', error);
  }
}
  ngOnInit() {
    // this.getprofession()
    // console.log(this.profession)

  }
}
