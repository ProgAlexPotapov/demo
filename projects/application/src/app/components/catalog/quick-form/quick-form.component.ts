import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { CarSelectedService } from '../catalog-data/car-selected/car-selected.service';
import { CarSelected } from '../catalog-data/car-selected/car-selected.modele';

@Component({
  selector: 'app-quick-form',
  templateUrl: 'quick-form.html',
  host: { class: 'layoutPanel panelResizable west elevation-z1' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class QuickFormComponent implements OnInit {
  trAnimation$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  car$: Observable<CarSelected>

  constructor(private cardService: CarSelectedService) {
  }

  ngOnInit() {
    this.car$ = this.cardService.carSelected$
      .pipe(
        tap(() => this.trAnimation$.next(true)),
        debounceTime(500),
        tap(() => this.trAnimation$.next(false))
      );
  }

  closeQuickForm() {
    this.cardService.unselectCar();
  }
}
