import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CarSelectedService } from '../car-selected/car-selected.service';
import { CatalogService } from '../catalog/catalog.service';
import { CarsList } from '../catalog/catalog.modele';
import { mainFilterList } from './filter.data';
import { Filter, MainFilter } from './filter.modele';

function arraysAreEqual(arr1: string[], arr2: string[]): boolean {
  return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
}

function mainFilterAreEqual(obj1: MainFilter, obj2: MainFilter): boolean {
  return obj1
    && obj1.filterValue === obj2.filterValue
    && obj1.filterName === obj2.filterName;
}

function copyObj(obj: Filter): Filter {
  return JSON.parse(JSON.stringify(obj));
}

@Injectable()
export class FilterService {

  carsList: CarsList[] = this.catalogService.loadCarList();
  markList: string[] = this.catalogService.loadMarkList();
  carsListFiltered: CarsList[] = this.carsList;
  carsListFiltered$: BehaviorSubject<CarsList[]> = new BehaviorSubject<CarsList[]>(this.carsListFiltered);

  filter: Filter = {
    markList: this.markList,
    mainFilter: {
      filterName: 'model',
      filterValue: ''
    }
  };
  filter$: BehaviorSubject<Filter> = new BehaviorSubject<Filter>(this.filter);

  constructor(private cardService: CarSelectedService, private catalogService: CatalogService) {
  }

  getMainFilterList(): MainFilter[] {
    return mainFilterList;
  }

  setMainFilterName(filterName: string) {
    const newFilter = copyObj(this.filter);
    if (filterName !== newFilter.mainFilter.filterName) {
      newFilter.mainFilter.filterValue = '';
    }
    newFilter.mainFilter.filterName = filterName;
    this.updateDataFiltered(newFilter);
  }

  setMainFilterValue(filterValue: string) {
    const newFilter = copyObj(this.filter);
    newFilter.mainFilter.filterValue = filterValue;
    this.updateDataFiltered(newFilter);
  }

  setFilterMarkList(markList: string[]) {
    const newFilter = copyObj(this.filter);
    newFilter.markList = markList;
    this.updateDataFiltered(newFilter);
  }

  updateDataFiltered(filter: Filter) {
    this.setCarsList(filter);
    this.setFilters(filter);
  }

  setFilters(filter: Filter) {
    this.filter$.next(filter);
  }

  setCarsList(filter: Filter) {
    let carsList: CarsList[] = this.carsList;
    if (!arraysAreEqual(filter.markList, this.filter.markList)) {
      carsList = this.filterCarsListByMark(filter.markList);
    }
    if (!mainFilterAreEqual(filter.mainFilter, this.filter.mainFilter) ||
      filter.mainFilter.filterValue.trim().length > 0) {
      carsList = this.filterCarsListByMainFilter(filter.mainFilter, carsList);
    }
    this.carsListFiltered = carsList;
    this.carsListFiltered$.next(carsList);
    this.filter = filter;
    this.cardService.selectedCarVerification(carsList);
  }

  filterCarsListByMark(markList: string[]): CarsList[] {
    return this.carsList
      .filter(item => markList.some(mark => mark === item.mark));
  }

  filterCarsListByMainFilter(filter: MainFilter, carsList: CarsList[]): CarsList[] {
    if (filter.filterValue.trim()) {
      return carsList
        .map(
          el => {
            const carList = el.cars.filter(
              car => car[filter.filterName].toLowerCase().includes(filter.filterValue.toLowerCase())
            );
            if (carList.length > 0) {
              return {
                mark: el.mark,
                markImgUrl: el.markImgUrl,
                cars: carList
              };
            }
          }
        )
        .filter(el => el);
    } else {
      return carsList;
    }
  }

}
