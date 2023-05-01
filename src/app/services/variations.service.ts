import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { IVariation } from '../models/variation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VariationsService {
  constructor(private http: HttpClient, private storage: StorageService) {}

  options = {
    headers: {
      Authorization: `Bearer ${this.storage.token}`,
    },
  };

  getVariations(name: string) {
    const options = {
      params: {
        name,
      },
    };

    return this.http.get<IVariation[]>(
      `${environment.base_url}/variations`,
      options
    );
  }

  getVariation(id: number) {
    return this.http.get<IVariation>(
      `${environment.base_url}/variations/${id}`
    );
  }

  updateVariation(variation: IVariation) {
    const variationPatch = {
      ...variation,
      product_id: parseInt(variation.product_id.toString()),
    };

    return this.http.patch<IVariation>(
      `${environment.base_url}/variations/${variation.id}`,
      variationPatch,
      this.options
    );
  }

  createVariation(variation: IVariation) {
    const variationPost = {
      ...variation,
      product_id: parseInt(variation.product_id.toString()),
    };

    return this.http.post<IVariation>(
      `${environment.base_url}/variations`,
      variationPost,
      this.options
    );
  }

  deleteVariation(id: number) {
    return this.http.delete(
      `${environment.base_url}/variations/${id}`,
      this.options
    );
  }
}
