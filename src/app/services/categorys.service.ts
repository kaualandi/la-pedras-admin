import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICategory } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategorysService {
  constructor(private http: HttpClient) {}

  getCategorys() {
    return this.http.get<ICategory[]>(`${environment.base_url}/categorys`);
  }
}
