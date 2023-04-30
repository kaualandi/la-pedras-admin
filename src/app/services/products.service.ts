import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient, private storage: StorageService) {}

  options = {
    headers: {
      Authorization: `Bearer ${this.storage.token}`,
    },
  };

  getProducts(name: string) {
    const options = {
      params: {
        name,
      },
    };

    return this.http.get<IProduct[]>(
      `${environment.base_url}/products`,
      options
    );
  }

  getProduct(id: number) {
    return this.http.get<IProduct>(`${environment.base_url}/products/${id}`);
  }

  updateProduct(product: IProduct) {
    const imagesUrlArray = product.images.map((image) => image.url);
    const imagesUrlArrayFiltered = imagesUrlArray.filter((url) => {
      return !url.startsWith('http');
    });
    const productPatch = {
      ...product,
      category_id: parseInt(product.category_id.toString()),
      measure_id: parseInt(product.measure_id.toString()),
      images: imagesUrlArrayFiltered,
    };

    return this.http.patch<IProduct>(
      `${environment.base_url}/products/${product.id}`,
      productPatch,
      this.options
    );
  }

  createProduct(product: IProduct) {
    const imageAddUrlArray = product.images.map((image) => image.url);
    const productPost = {
      ...product,
      category_id: parseInt(product.category_id.toString()),
      measure_id: parseInt(product.measure_id.toString()),
      images: imageAddUrlArray,
    };

    return this.http.post<IProduct>(
      `${environment.base_url}/products`,
      productPost,
      this.options
    );
  }

  deleteProduct(id: number) {
    return this.http.delete(
      `${environment.base_url}/products/${id}`,
      this.options
    );
  }

  deleteImage(id: number) {
    return this.http.delete(
      `${environment.base_url}/images/${id}`,
      this.options
    );
  }
}
