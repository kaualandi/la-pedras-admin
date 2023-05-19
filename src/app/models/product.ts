import { IMeasure } from './measure';

export interface IImage {
  id: number;
  url: string;
  created_at: Date;
  updated_at: Date;
  product_id: number;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  code: string;
  images: IImage[];
  category_id: number;
  measure_id: number;
  measure: IMeasure;
  price: number;
  created_at: Date;
  updated_at: Date;
}
