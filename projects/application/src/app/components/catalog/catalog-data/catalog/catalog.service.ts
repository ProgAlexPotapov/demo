import { Injectable } from '@angular/core';
import { dataCars } from './catalog.data';
import { CarsList } from './catalog.modele';

@Injectable()
export class CatalogService {

  constructor() {
  }

  loadCarList(): CarsList[] {
    return dataCars;
  }

  loadMarkList(): string[] {
    return dataCars.map(el => el.mark);
  }

}
