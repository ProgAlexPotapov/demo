enum bodyTypeVal {
  Wagon = 'Wagon',
  Sedan = 'Sedan',
  SUV = 'SUV'
}

export class Car {
  model: string;
  color: string;
  price: number;
  bodyType: bodyTypeVal = bodyTypeVal.Sedan;
  imgUrl: string;
}

export class CarsList {
  mark: string;
  markImgUrl: string;
  cars: Car[];
}

export const dataCars: CarsList[] = [
  {
    mark: 'Toyota',
    markImgUrl: '/assets/images/cars/toyota/toyota-logo.png',
    cars: [
      { model: 'Corolla', color: 'Blue', price: 26000, bodyType: bodyTypeVal.Sedan, imgUrl: '/assets/images/cars/toyota/corolla.webp' },
      { model: 'Rav4', color: 'White', price: 35000, bodyType: bodyTypeVal.SUV, imgUrl: '/assets/images/cars/toyota/rav4.webp' },
      { model: 'Camry', color: 'White', price: 30000, bodyType: bodyTypeVal.Sedan, imgUrl: '/assets/images/cars/toyota/camry.webp' },
    ]
  },
  {
    mark: 'Nissan',
    markImgUrl: '/assets/images/cars/nissan/nissan-logo.png',
    cars: [
      { model: 'Maxima', color: 'Red', price: 36000, bodyType: bodyTypeVal.Sedan, imgUrl: '/assets/images/cars/nissan/maxima.webp' },
      { model: 'Murano', color: 'Orange', price: 45000, bodyType: bodyTypeVal.Wagon, imgUrl: '/assets/images/cars/nissan/murano.webp' },
      { model: 'Rogue', color: 'Grey', price: 26000, bodyType: bodyTypeVal.SUV, imgUrl: '/assets/images/cars/nissan/rogue.webp' },
    ]
  },
  {
    mark: 'BMW',
    markImgUrl: '/assets/images/cars/bmw/bmw-logo.png',
    cars: [
      { model: 'I8 Roadster', color: 'Silver', price: 120000, bodyType: bodyTypeVal.Sedan, imgUrl: '/assets/images/cars/bmw/i8roadster.webp' },
      { model: 'M8', color: 'Black', price: 170000, bodyType: bodyTypeVal.Sedan, imgUrl: '/assets/images/cars/bmw/m8.webp' },
      { model: '330I- 7', color: 'Blue', price: 90000, bodyType: bodyTypeVal.Sedan, imgUrl: '/assets/images/cars/bmw/330i-7.webp' },
    ]
  },
  {
    mark: 'Mercedes',
    markImgUrl: '/assets/images/cars/mercedes/mercedes-logo.png',
    cars: [
      { model: 'C Class', color: 'Silver', price: 120000, bodyType: bodyTypeVal.Sedan, imgUrl: '/assets/images/cars/mercedes/c-class.webp' },
      { model: 'GLE', color: 'White', price: 170000, bodyType: bodyTypeVal.SUV, imgUrl: '/assets/images/cars/mercedes/gle.webp' },
      { model: 'CLA', color: 'Yellow', price: 90000, bodyType: bodyTypeVal.Sedan, imgUrl: '/assets/images/cars/mercedes/cla.webp' },
    ]
  }
];
