import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICategory } from '../models/category';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient, private storage: StorageService) {}

  options = {
    headers: {
      Authorization: `Bearer ${this.storage.token}`,
    },
  };

  getCategories(name: string) {
    const options = {
      params: {
        name,
      },
    };
    return this.http.get<ICategory[]>(
      `${environment.base_url}/categorys`,
      options
    );
  }

  updateCategory(category: ICategory) {
    return this.http.patch<ICategory>(
      `${environment.base_url}/categorys/${category.id}`,
      category,
      this.options
    );
  }

  createCategory(category: ICategory) {
    return this.http.post<ICategory>(
      `${environment.base_url}/categorys`,
      category,
      this.options
    );
  }

  deleteCategory(id: number) {
    return this.http.delete<ICategory>(
      `${environment.base_url}/categorys/${id}`,
      this.options
    );
  }
}
