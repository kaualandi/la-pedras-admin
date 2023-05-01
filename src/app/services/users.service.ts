import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user';
import { Md5 } from 'md5-typescript';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private storage: StorageService) {}

  options = {
    headers: {
      Authorization: `Bearer ${this.storage.token}`,
    },
  };

  getUsers(name: string) {
    const options = {
      params: {
        name,
      },
      headers: this.options.headers,
    };

    return this.http.get<IUser[]>(`${environment.base_url}/users`, options);
  }

  getUser(id: number) {
    return this.http.get<IUser>(`${environment.base_url}/users/${id}`);
  }

  updateUser(user: IUser) {
    const userPatch: Partial<IUser> = {
      name: user.name,
      email: user.email,
      is_admin: user.is_admin,
    };
    if (user.password) {
      userPatch.password = Md5.init(user.password);
    }

    return this.http.patch<IUser>(
      `${environment.base_url}/users/${user.id}`,
      userPatch,
      this.options
    );
  }

  createUser(user: IUser) {
    const userPost = {
      ...user,
      password: Md5.init(user.password),
    };

    return this.http.post<IUser>(
      `${environment.base_url}/users`,
      userPost,
      this.options
    );
  }

  deleteUser(id: number) {
    return this.http.delete(
      `${environment.base_url}/users/${id}`,
      this.options
    );
  }
}
