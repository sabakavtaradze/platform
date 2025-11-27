import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Models, Professions, Property } from 'src/app/interfaces/library/interfacelibrary';
import { TopModelFilterRangeDTO, TopModelFilterRangeResponse, TopModelListItem } from 'src/app/interfaces/library/top-model';
import { HeaderService } from 'src/app/services/header.service';
import { TopModelService } from 'src/app/services/top-model.service';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';
import { UserService } from 'src/app/services/user/user.service';
import { DialogFilterResult } from '../../gadgets/dialogpickertemplate/dialogpickertemplate.component';
import { TopModelDialogComponent } from './top-model-dialog/top-model-dialog.component';




@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
  standalone: false
})

export class LibraryComponent implements OnInit {
  categoryprofessions: string[] = []
  isHeaderVisible: boolean = true
  hideHeaderScrollThreshold: number = 50
  models: Models[] = []
  loading = false
  error: string | null = null
  profilePictures: Record<number, string> = {}
  ExistTopModels: boolean = false
  filterRanges: TopModelFilterRangeResponse | null = null
  constructor(
    private headerservice: HeaderService,
    private dialog: MatDialog,
    private topModelService: TopModelService,
    private userService: UserService,
    private authService: AuthenticationService
  ) { }
  // professions: Category[] = [
  //   { category: 'acter', active: true },
  //   { category: 'reporter', active: false },
  //   { category: 'influencer', active: false },
  //   { category: 'streamer', active: false },
  //   { category: 'writer', active: false },

  // ]
  // modelDetails: ModelDetails = { minAge: 18, maxAge: 55, minFollowers: 15000, maxFollowers: 65000 }

  filterModels: Professions = {
    professions: [],
    properties: { minAge: 18, maxAge: 55, minFollowers: 0, maxFollowers: 50000 },
    pickedProperties: { minAge: 18, maxAge: 55, minFollowers: 0, maxFollowers: 50000 },
  };
  AddTopModel() {
    const dialogRef = this.dialog.open(TopModelDialogComponent, {
      width: '420px',
      disableClose: true,
      autoFocus: false,
      maxHeight: '85vh',
      panelClass: 'top-model-dialog-panel',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadTopModels();
        this.loadTopModelExists();
        this.loadFilterRanges();
      }
    });
  }

  DeleteTopModel(): void {
    const shouldDelete = window.confirm('Are you sure you want to delete your Top Model card?');
    if (!shouldDelete) return;

    this.loading = true;
    this.topModelService.deleteTopModel().subscribe({
      next: (deleted) => {
        if (deleted) {
          const userId = this.getUserIdFromToken();
          if (userId) {
            this.models = this.models.filter((model) => model.userID !== userId);
          }
          this.loadTopModels();
          this.loadTopModelExists();
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to delete top model', err);
        this.loading = false;
      },
    });
  }
  // getprofession(){
  //   let professionsSet: Set<string> = new Set();
  //   this.models.forEach(item => {
  //     professionsSet.add(item.profession);
  //   });
  //   this.categoryprofessions = Array.from(professionsSet);
  // }
  // professions = this.models.map(item => item.profession);
  @HostListener('window:scroll', ['$event'])
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
    this.loadFilterRanges();
    this.loadTopModels();
    this.loadTopModelExists();
  }

  private loadTopModels(filter?: TopModelFilterRangeDTO): void {
    const request$ = filter
      ? this.topModelService.filterTopModels(filter)
      : this.topModelService.getTopModelList();
    this.fetchModels(request$);
  }

  private fetchModels(request$: Observable<TopModelListItem[]>): void {
    this.loading = true;
    this.error = null;
    request$.subscribe({
      next: (data: TopModelListItem[]) => this.handleModelResponse(data),
      error: (err) => this.handleModelError(err),
    });
  }

  private handleModelResponse(data: TopModelListItem[]): void {
    this.models = data.map((item) => this.toCardModel(item));
    data.forEach((item) => this.loadProfilePicture(item.userID));
    this.error = null;
    this.loading = false;
  }

  private handleModelError(err: any): void {
    console.error('Failed to load top models', err);
    this.error = 'Unable to load top models at the moment.';
    this.models = [];
    this.loading = false;
  }

  private toCardModel(item: TopModelListItem): Models {
    return {
      name: item.userFirstName || item.fullName,
      profileImg: item.photoUrl,
      img: item.photoUrl,
      age: item.age,
      followers: item.totalFollowers,
      stars: Number(item.reviewScore) || 0,
      profession: 'Top Model',
      userID: item.userID,
    };
  }

  private loadProfilePicture(userId: number): void {
    if (!userId || this.profilePictures[userId]) return;

    this.userService.getProfilePicture(userId).subscribe((res) => {
      if (res?.isSuccess && res.data) {
        this.profilePictures[userId] = res.data;
        const index = this.models.findIndex((model) => model.userID === userId);
        if (index !== -1) {
          this.models[index] = {
            ...this.models[index],
            userProfilePic: res.data,
          };
        }
      }
    });
  }

  private loadTopModelExists(): void {
    this.topModelService.IsgetTopModelExists().subscribe({
      next: (exists) => (this.ExistTopModels = exists),
      error: () => (this.ExistTopModels = false),
    });
  }

  private loadFilterRanges(): void {
    this.topModelService.getFilterRanges().subscribe({
      next: (range) => this.applyFilterRange(range),
      error: (err) => {
        console.error('Failed to load filter ranges', err);
      },
    });
  }

  private applyFilterRange(range: TopModelFilterRangeResponse): void {
    this.filterRanges = range;
    const baseFilters = this.toProfessionsFromRange(range);
    const activeCategories = new Set(
      (this.filterModels?.professions ?? [])
        .filter((profession) => profession.active)
        .map((profession) => profession.category),
    );
    const professions = baseFilters.professions.map((profession) => ({
      ...profession,
      active: activeCategories.has(profession.category),
    }));

    this.filterModels = {
      professions,
      properties: baseFilters.properties,
      pickedProperties: this.buildPickedProperties(baseFilters.properties),
    };
  }

  private buildPickedProperties(properties: Property): Property {
    const previousPicked = this.filterModels?.pickedProperties ?? this.filterModels?.properties ?? properties;
    return {
      minAge: this.clampValue(previousPicked.minAge, properties.minAge, properties.maxAge),
      maxAge: this.clampValue(previousPicked.maxAge, properties.minAge, properties.maxAge),
      minFollowers: this.clampValue(previousPicked.minFollowers, properties.minFollowers, properties.maxFollowers),
      maxFollowers: this.clampValue(previousPicked.maxFollowers, properties.minFollowers, properties.maxFollowers),
    };
  }

  private clampValue(value: number | undefined, min: number, max: number): number {
    const numeric = Number.isFinite(value ?? NaN) ? Number(value) : min;
    return Math.min(Math.max(numeric, min), max);
  }

  onFilterApplied(result: DialogFilterResult): void {
    this.filterModels = result.professions;
    this.loadTopModels(result.payload);
  }

  private readonly defaultProfessions = ['acter', 'reporter', 'Tv', 'gamer'];

  private toProfessionsFromRange(range: TopModelFilterRangeResponse): Professions {
    const properties = {
      minAge: range?.minAge ?? 18,
      maxAge: range?.maxAge ?? 55,
      minFollowers: range?.minFollowers ?? 0,
      maxFollowers: range?.maxFollowers ?? 50000,
    };
    const professionSources = (range?.professions && range?.professions.length)
      ? range.professions
      : this.defaultProfessions;

    return {
      professions: professionSources.map((category) => ({ category, active: false })),
      properties,
      pickedProperties: { ...properties },
    };
  }

  private getUserIdFromToken(): number | null {
    const token = this.authService.getAuthToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const id = payload?.nameid ?? payload?.sub ?? payload?.userID;
      return id ? Number(id) : null;
    } catch {
      return null;
    }
  }
}
