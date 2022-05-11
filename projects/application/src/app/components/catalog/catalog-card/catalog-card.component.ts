import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { CarSelectedService } from '../catalog-data/car-selected/car-selected.service';
import { Observable } from 'rxjs';
import { Car } from '../catalog-data/catalog/catalog.modele';
import { CarSelected } from '../catalog-data/car-selected/car-selected.modele';

@Component({
  selector: 'app-catalog-card',
  templateUrl: './catalog-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogCardComponent implements OnInit {
  @Input() carItem: {
    mark: string;
    rowInd: number;
    colInd: number;
    car: Car;
  };

  carSelected$: Observable<CarSelected>;

  constructor(private cardService: CarSelectedService) {
  }

  ngOnInit(): void {
    this.carSelected$ = this.cardService.carSelected$;
  }

  selectCar(mark: string, car: Car) {
    this.cardService.selectCar({ mark, car });
  }

  summaryToggle(event: any, key: string) {
    const elTarget = event.target;
    if (elTarget.checked) {
      document.getElementById(key).classList.add('active');
    } else document.getElementById(key).classList.remove('active');
  }
}
