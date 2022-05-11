import { BodyTypeVal, CarsList } from './catalog.modele';

export const dataCars: CarsList[] = [
  {
    mark: 'Toyota',
    markImgUrl: '/assets/images/cars/toyota/toyota-logo.png',
    cars: [
      {
        id: 1,
        model: 'Corolla',
        color: 'Blue',
        price: 26000,
        bodyType: BodyTypeVal.Sedan,
        imgUrl: '/assets/images/cars/toyota/corolla.webp'
      },
      {
        id: 2,
        model: 'Rav4',
        color: 'White',
        price: 35000,
        bodyType: BodyTypeVal.SUV,
        imgUrl: '/assets/images/cars/toyota/rav4.webp'
      },
      {
        id: 3,
        model: 'Camry',
        color: 'White',
        price: 30000,
        bodyType: BodyTypeVal.Sedan,
        imgUrl: '/assets/images/cars/toyota/camry.webp'
      }
    ]
  },
  {
    mark: 'Nissan',
    markImgUrl: '/assets/images/cars/nissan/nissan-logo.png',
    cars: [
      {
        id: 4,
        model: 'Maxima',
        color: 'Red',
        price: 36000,
        bodyType: BodyTypeVal.Sedan,
        imgUrl: '/assets/images/cars/nissan/maxima.webp'
      },
      {
        id: 5,
        model: 'Murano',
        color: 'Orange',
        price: 45000,
        bodyType: BodyTypeVal.Wagon,
        imgUrl: '/assets/images/cars/nissan/murano.webp'
      },
      {
        id: 6,
        model: 'Rogue',
        color: 'Grey',
        price: 26000,
        bodyType: BodyTypeVal.SUV,
        imgUrl: '/assets/images/cars/nissan/rogue.webp'
      }
    ]
  },
  {
    mark: 'BMW',
    markImgUrl: '/assets/images/cars/bmw/bmw-logo.png',
    cars: [
      {
        id: 7,
        model: 'I8 Roadster',
        color: 'Silver',
        price: 120000,
        bodyType: BodyTypeVal.Sedan,
        imgUrl: '/assets/images/cars/bmw/i8roadster.webp'
      },
      {
        id: 8,
        model: 'M8',
        color: 'Black',
        price: 170000,
        bodyType: BodyTypeVal.Sedan,
        imgUrl: '/assets/images/cars/bmw/m8.webp'
      },
      {
        id: 9,
        model: '330I- 7',
        color: 'Blue',
        price: 90000,
        bodyType: BodyTypeVal.Sedan,
        imgUrl: '/assets/images/cars/bmw/330i-7.webp'
      }
    ]
  },
  {
    mark: 'Mercedes',
    markImgUrl: '/assets/images/cars/mercedes/mercedes-logo.png',
    cars: [
      {
        id: 10,
        model: 'C Class',
        color: 'Silver',
        price: 120000,
        bodyType: BodyTypeVal.Sedan,
        imgUrl: '/assets/images/cars/mercedes/c-class.webp'
      },
      {
        id: 11,
        model: 'GLE',
        color: 'White',
        price: 170000,
        bodyType: BodyTypeVal.SUV,
        imgUrl: '/assets/images/cars/mercedes/gle.webp'
      },
      {
        id: 12,
        model: 'CLA',
        color: 'Yellow',
        price: 90000,
        bodyType: BodyTypeVal.Sedan,
        imgUrl: '/assets/images/cars/mercedes/cla.webp'
      }
    ]
  }
];

