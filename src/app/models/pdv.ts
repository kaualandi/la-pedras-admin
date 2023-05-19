import { IProduct } from './product';
import { IUser } from './user';

export interface IItemOrder {
  id: number;
  product_id: number;
  product: IProduct;
  quantity: number;
  price: number;
  created_at: Date;
  updated_at: Date;
}

export interface IOrder {
  id: number;
  user_id: number;
  user: IUser;
  total: number;
  created_at: Date;
  updated_at: Date;
  items: IItemOrder[];
}
