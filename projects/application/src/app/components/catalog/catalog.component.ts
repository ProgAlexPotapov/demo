import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { AppState } from '../../modules/core/core.state';
import { actionSettingsCatalogMode } from '../../modules/core/settings/settings.actions';
import { selectCatalogMode } from '../../modules/core/settings/settings.selectors';
import { CarSelectedService } from './catalog-data/car-selected/car-selected.service';
import { CatalogService } from './catalog-data/catalog/catalog.service';
import { FilterService } from './catalog-data/filter/filter.service';
import { Filter, MainFilter } from './catalog-data/filter/filter.modele';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CatalogComponent implements OnInit {

  trDataAnimation$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  trModeViewAnimation$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  markList = this.catalogService.loadMarkList();
  catalogMode$: Observable<string>;
  filtersActive: MainFilter;

  filter$: Observable<Filter> = this.filterService.filter$
    .pipe(
      tap((filter) => this.filtersActive = filter.mainFilter)
    );
  filterList = this.filterService.getMainFilterList();

  dataCars$ = this.filterService.carsListFiltered$
    .pipe(
      tap(() => this.trDataAnimation$.next(true)),
      debounceTime(500),
      tap(() => this.trDataAnimation$.next(false))
    );
  carSelected$ = this.carSelectedService.carSelected$;
  panelFiltersIsOpen = false;
  accordionIsOpen = true;


  constructor(
    private store: Store<AppState>,
    private catalogService: CatalogService,
    private filterService: FilterService,
    private carSelectedService: CarSelectedService
  ) {
  }

  ngOnInit() {
    this.catalogMode$ = this.store.pipe(select(selectCatalogMode));
  }

  onMarkSelect(event: Event, markSelected: string, markList: string[]) {
    const target = event?.target as HTMLInputElement;
    let newMarkList: string[];
    if (target.checked) {
      newMarkList = markList;
      newMarkList.push(markSelected);
    } else {
      newMarkList = markList.filter(mark => mark !== markSelected);
    }
    this.filterService.setFilterMarkList(newMarkList);
  }

  onMainFilterNameChange(filterName: string) {
    this.filterService.setMainFilterName(filterName);
  }

  onMainFilterValueChange(filterValue: string) {
    this.filterService.setMainFilterValue(filterValue);
  }

  onCatalogModeSelect(catalogMode: string) {
    this.carSelectedService.unselectCar();
    this.trModeViewAnimation$.next(true);
    this.delay(500).then(() => {
      this.store.dispatch(actionSettingsCatalogMode({ catalogMode }));
      this.trModeViewAnimation$.next(false);
    });
  }

  async delay(ms: number) {
    await new Promise<void>(resolve => setTimeout(() => resolve(), ms));
  }
}
