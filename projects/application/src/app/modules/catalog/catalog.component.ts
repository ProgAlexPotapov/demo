import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Car, CarsList, dataCars } from './catalog.data';
import { Store} from '@ngrx/store';
import { AppState } from '../../core/core.state';
import { actionSettingsCatalogMode } from '../../core/settings/settings.actions';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.html',
  styleUrls: ['./catalog.less'],
  encapsulation: ViewEncapsulation.None
})
export class CatalogComponent implements OnInit {
  loading = false;
  accordeonIsOpen = true;
  qfOpen = false;
  currentMark = '';
  searchMarks = [];
  selectedMarks = [];
  markUpdated = false;
  carsList: CarsList[] = dataCars;
  carsListFiltered: CarsList[] = dataCars;
  currentCar: Car = new Car();
  triggerAnimation = false;
  qfTrAnimation = false;
  panelFilters = false;
  catalogMode = 'card';
  filterData = { mark: [] };
  filterFields = [
    { value: 'Model', label: 'model' },
    { value: 'Color', label: 'color' },
    { value: 'Body Type', label: 'bodyType' }
  ];
  filterField = 'model';
  filterFieldValue = '';

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    [...this.selectedMarks] = this.carsList.map(el => el.mark);
  }

  selectCar(event: any, mark: string, car: Car, catalogMode: string) {
    if (catalogMode === 'card') {
      if (event.target.closest('.widget-container').getElementsByClassName('card active').length) {
        event.target.closest('.widget-container').getElementsByClassName('card active').item(0).classList.remove('active');
      }
    } else {
      if (event.target.closest('.panel-group').getElementsByClassName('card active').length) {
        event.target.closest('.widget-container').getElementsByClassName('card active').item(0).classList.remove('active');
      }
    }
    event.target.closest('.card').classList.add('active');
    this.qfOpen = true;
    this.currentMark = mark;
    this.currentCar = car;
    this.qfTrAnimation = true;
    const intervalId = setInterval(() => {
      this.qfTrAnimation = false;
      clearInterval(intervalId);
    }, 300);
  }

  selectMark(event: any, markSelected: string) {
    if (event.target.checked) {
      this.searchMarks.push(markSelected);
    } else {
      this.searchMarks = this.searchMarks.filter(item => item !== markSelected);
    }
    this.filterData.mark = this.searchMarks;
    this.triggerAnimation = true;
    this.carsListFiltered = this.filterCar(this.carsList, this.filterData);
    this.delay(500).then(() => this.triggerAnimation = false);
  }

  filterCar = (array, filters) => {
    const filterKeys = Object.keys(filters);
    return array.filter(item => {
      return filterKeys.some(key => {
        if (!filters[key].length) return true;
        return filters[key].find(filter => filter === item[key]);
      });
    });
  };

  onFilterFieldSelect(filter: string) {
    this.filterFieldValue = '';
    this.filterField = filter;
  }

  onCatalogModeSelect(catalogMode: string) {
    this.triggerAnimation = true;
    this.store.dispatch(actionSettingsCatalogMode({ catalogMode }));
    this.delay(500).then(() => this.triggerAnimation = false);
  }

  closeQuickForm(flag: any) {
    this.qfOpen = flag;
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }

  summaryToggle(event: any, key: string) {
    if (event.target.checked) {
      document.getElementById(key).classList.add('active');
    } else document.getElementById(key).classList.remove('active');
  }
}
