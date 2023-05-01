import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IMeasure } from '../models/measure';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class MeasuresService {
  constructor(private http: HttpClient, private storage: StorageService) {}

  options = {
    headers: {
      Authorization: `Bearer ${this.storage.token}`,
    },
  };

  getMeasures(name = '') {
    const options = {
      params: {
        name,
      },
    };

    return this.http.get<IMeasure[]>(
      `${environment.base_url}/measures`,
      options
    );
  }

  getMeasure(id: number) {
    return this.http.get<IMeasure>(`${environment.base_url}/measures/${id}`);
  }

  updateMeasure(measure: IMeasure) {
    return this.http.patch<IMeasure>(
      `${environment.base_url}/measures/${measure.id}`,
      measure,
      this.options
    );
  }

  createMeasure(measure: IMeasure) {
    return this.http.post<IMeasure>(
      `${environment.base_url}/measures`,
      measure,
      this.options
    );
  }

  deleteMeasure(id: number) {
    return this.http.delete(
      `${environment.base_url}/measures/${id}`,
      this.options
    );
  }
}
