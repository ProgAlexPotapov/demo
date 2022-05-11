export enum BodyTypeVal {
  Wagon = 'Wagon',
  Sedan = 'Sedan',
  SUV = 'SUV'
}

export interface Car {
  id: number;
  model: string;
  color: string;
  price: number;
  bodyType: BodyTypeVal | undefined;
  imgUrl: string;
}

export interface CarsList {
  mark: string;
  markImgUrl: string;
  cars: Car[];
}
