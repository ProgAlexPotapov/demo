import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CarSelected } from './car-selected.modele';
import { CarsList } from '../catalog/catalog.modele';

const carUnselected = {
  mark: '',
  car: {
    id: null,
    model: '',
    color: '',
    price: 0,
    bodyType: undefined,
    imgUrl: ''
  }
};

@Injectable()
export class CarSelectedService {

  carSelected: CarSelected = { ...carUnselected };
  carSelected$: BehaviorSubject<CarSelected> = new BehaviorSubject<CarSelected>(this.carSelected);

  constructor() {
  }

  selectCar(sCar: CarSelected) {
    if (sCar.car.id !== this.carSelected.car.id) {
      this.carSelected = sCar;
      this.carSelected$.next(sCar);
    }
  }

  unselectCar() {
    this.carSelected$.next({ ...carUnselected });
  }

  selectedCarVerification(carsList: CarsList[]) {
    if (!this.selectedCarIsInCarList(carsList)) {
      if (carsList.length > 0) {
        const newSelectedCar = {
          mark: carsList[0].mark,
          car: carsList[0].cars[0]
        };
        this.selectCar(newSelectedCar);
      } else {
        this.unselectCar();
      }
    }
  }

  selectedCarIsInCarList(carsList: CarsList[]): boolean {
    if (!this.carSelected.car.id) {
      return true;
    } else {
      const markInd = carsList
        .findIndex(item => item.mark === this.carSelected.mark);
      return markInd !== -1 && carsList[markInd].cars.some(
        el => el.id === this.carSelected.car.id
      );
    }
  }
}
