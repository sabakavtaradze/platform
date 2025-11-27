import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Profession, Professions, Property } from 'src/app/interfaces/library/interfacelibrary';
import { TopModelFilterRangeDTO } from 'src/app/interfaces/library/top-model';

export interface DialogFilterResult {
  professions: Professions;
  payload: TopModelFilterRangeDTO;
}


@Component({
  selector: 'app-dialogpickertemplate',
  templateUrl: './dialogpickertemplate.component.html',
  styleUrls: ['./dialogpickertemplate.component.scss'],
  standalone: false
})

export class DialogpickertemplateComponent {
  filterModels: Professions;

  constructor(
    public dialogRef: MatDialogRef<DialogpickertemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { filterModels: Professions },
  ) {
    this.filterModels = this.cloneFilters(data?.filterModels);
    this.normalizeFilters();
  }

  private cloneFilters(filters?: Professions): Professions {
    const defaults: Property = {
      minAge: 18,
      maxAge: 55,
      minFollowers: 0,
      maxFollowers: 50000,
    };

    const properties: Property = {
      minAge: filters?.properties?.minAge ?? defaults.minAge,
      maxAge: filters?.properties?.maxAge ?? defaults.maxAge,
      minFollowers: filters?.properties?.minFollowers ?? defaults.minFollowers,
      maxFollowers: filters?.properties?.maxFollowers ?? defaults.maxFollowers,
    };

    const pickedProperties: Property = {
      minAge: filters?.pickedProperties?.minAge ?? properties.minAge,
      maxAge: filters?.pickedProperties?.maxAge ?? properties.maxAge,
      minFollowers: filters?.pickedProperties?.minFollowers ?? properties.minFollowers,
      maxFollowers: filters?.pickedProperties?.maxFollowers ?? properties.maxFollowers,
    };

    return {
      professions: filters?.professions?.map((profession) => ({ ...profession })) ?? [],
      properties,
      pickedProperties,
    };
  }

  public normalizeFilters(): TopModelFilterRangeDTO {
    const defaults: Property = {
      minAge: 18,
      maxAge: 55,
      minFollowers: 0,
      maxFollowers: 50000,
    };

    if (!this.filterModels.properties) {
      this.filterModels.properties = defaults;
    }

    if (!this.filterModels.pickedProperties) {
      this.filterModels.pickedProperties = { ...this.filterModels.properties };
    }

    this.filterModels.properties = {
      minAge: this.filterModels.properties.minAge ?? defaults.minAge,
      maxAge: this.filterModels.properties.maxAge ?? defaults.maxAge,
      minFollowers: this.filterModels.properties.minFollowers ?? defaults.minFollowers,
      maxFollowers: this.filterModels.properties.maxFollowers ?? defaults.maxFollowers,
    };

    this.filterModels.pickedProperties = {
      minAge: this.filterModels.pickedProperties.minAge ?? this.filterModels.properties.minAge,
      maxAge: this.filterModels.pickedProperties.maxAge ?? this.filterModels.properties.maxAge,
      minFollowers: this.filterModels.pickedProperties.minFollowers ?? this.filterModels.properties.minFollowers,
      maxFollowers: this.filterModels.pickedProperties.maxFollowers ?? this.filterModels.properties.maxFollowers,
    };

    return this.buildFilterPayload();
  }

  private clamp(value: number, min: number, max: number): number {
    if (isNaN(value)) {
      return min;
    }
    return Math.min(Math.max(value, min), max);
  }

  updatePickedAgeMin(value: number | string): void {
    if (!this.filterModels?.pickedProperties || !this.filterModels?.properties) {
      return;
    }
    const parsed = Number(value);
    const min = this.filterModels.properties.minAge;
    const max = this.filterModels.pickedProperties.maxAge;
    this.filterModels.pickedProperties.minAge = this.clamp(parsed, min, max);
  }

  updatePickedAgeMax(value: number | string): void {
    if (!this.filterModels?.pickedProperties || !this.filterModels?.properties) {
      return;
    }
    const parsed = Number(value);
    const min = this.filterModels.pickedProperties.minAge;
    const max = this.filterModels.properties.maxAge;
    this.filterModels.pickedProperties.maxAge = this.clamp(parsed, min, max);
  }

  updatePickedFollowersMin(value: number | string): void {
    if (!this.filterModels?.pickedProperties || !this.filterModels?.properties) {
      return;
    }
    const parsed = Number(value);
    const min = this.filterModels.properties.minFollowers;
    const max = this.filterModels.pickedProperties.maxFollowers;
    this.filterModels.pickedProperties.minFollowers = this.clamp(parsed, min, max);
  }

  updatePickedFollowersMax(value: number | string): void {
    if (!this.filterModels?.pickedProperties || !this.filterModels?.properties) {
      return;
    }
    const parsed = Number(value);
    const min = this.filterModels.pickedProperties.minFollowers;
    const max = this.filterModels.properties.maxFollowers;
    this.filterModels.pickedProperties.maxFollowers = this.clamp(parsed, min, max);
  }

  profPick(a: Profession): void {
    a.active = !a.active;
  }

  formatFollowers(value?: number): string {
    if (!Number.isFinite(value ?? NaN)) {
      return '0';
    }
    const numericValue = value ?? 0;
    if (numericValue >= 1000) {
      return `${Math.round(numericValue / 1000)}k`;
    }
    return `${numericValue}`;
  }

  getSliderValue(event: unknown): number {
    const sliderChange = event as { value?: number } | null;
    return sliderChange?.value ?? 0;
  }

  buildFilterPayload(): TopModelFilterRangeDTO {
    const picked = this.filterModels.pickedProperties ?? this.filterModels.properties;
    const selectedProfessions = (this.filterModels.professions ?? [])
      .filter((profession) => profession.active)
      .map((profession) => profession.category);

    return {
      minAge: picked?.minAge,
      maxAge: picked?.maxAge,
      minFollowers: picked?.minFollowers,
      maxFollowers: picked?.maxFollowers,
      professions: selectedProfessions.length ? selectedProfessions : undefined,
    };
  }

  get pickedMinAge(): number {
    return this.filterModels?.pickedProperties?.minAge ?? this.filterModels?.properties?.minAge ?? 18;
  }

  get pickedMaxAge(): number {
    return this.filterModels?.pickedProperties?.maxAge ?? this.filterModels?.properties?.maxAge ?? 55;
  }

  get pickedMinFollowers(): number {
    return this.filterModels?.pickedProperties?.minFollowers ?? this.filterModels?.properties?.minFollowers ?? 0;
  }

  get pickedMaxFollowers(): number {
    return this.filterModels?.pickedProperties?.maxFollowers ?? this.filterModels?.properties?.maxFollowers ?? 50000;
  }

  formatLabel = (value?: number): string => {
    return this.formatFollowers(value);
  };

  applyAndClose(): void {
    const payload = this.normalizeFilters();
    this.dialogRef.close({
      professions: this.filterModels,
      payload,
    } as DialogFilterResult);
  }

}
