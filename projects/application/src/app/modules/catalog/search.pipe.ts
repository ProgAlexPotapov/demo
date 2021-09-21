import { Pipe, PipeTransform } from '@angular/core';
import { Car } from './catalog.data';
@Pipe({
  name: 'searchCar'
})

export class SearchCarPipe implements PipeTransform {
  transform(cars: Car[], searchField: string, search = ''): Car[] {
    if (!search.trim()) {
      return cars;
    }
    return cars.filter(car => {
      return car[searchField].toLowerCase().includes(search.toLowerCase());
    });
  }
}
