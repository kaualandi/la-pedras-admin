import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Md5 } from 'md5-typescript';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user';

interface ILogin {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private storage: StorageService) {}

  login(email: string, password: string) {
    const body = {
      email,
      password: Md5.init(password),
    };

    return this.http.post<ILogin>(`${environment.base_url}/auth/login`, body);
  }

  me() {
    const options = {
      headers: {
        Authorization: `Bearer ${this.storage.token}`,
      },
    };

    return this.http.get<IUser>(`${environment.base_url}/auth/me`, options);
  }
}
