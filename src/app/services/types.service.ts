import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { IType } from '../models/type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TypesService {
  constructor(private http: HttpClient, private storage: StorageService) {}

  options = {
    headers: {
      Authorization: `Bearer ${this.storage.token}`,
    },
  };

  getTypes(name: string) {
    const options = {
      params: {
        name,
      },
    };

    return this.http.get<IType[]>(`${environment.base_url}/types`, options);
  }

  getType(id: number) {
    return this.http.get<IType>(`${environment.base_url}/types/${id}`);
  }

  updateType(type: IType) {
    const typePatch = {
      ...type,
      product_id: parseInt(type.product_id.toString()),
    };

    return this.http.patch<IType>(
      `${environment.base_url}/types/${type.id}`,
      typePatch,
      this.options
    );
  }

  createType(type: IType) {
    const typePost = {
      ...type,
      product_id: parseInt(type.product_id.toString()),
    };

    return this.http.post<IType>(
      `${environment.base_url}/types`,
      typePost,
      this.options
    );
  }

  deleteType(id: number) {
    return this.http.delete(
      `${environment.base_url}/types/${id}`,
      this.options
    );
  }
}
