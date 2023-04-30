import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IMeasure } from '../models/measure';

@Injectable({
  providedIn: 'root',
})
export class MeasuresService {
  constructor(private http: HttpClient) {}

  getMeasures() {
    return this.http.get<IMeasure[]>(`${environment.base_url}/measures`);
  }
}
