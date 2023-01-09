import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserTotal() {
    return this.http.get(environment.endpoint + 'User/total');
  }

  getUserPagination(afterID: number, limit: number) {
    return this.http.get<[]>(environment.endpoint + 'User/paginate?afterID=' + afterID + '&limit=' + limit);
  }

  getUserByID(id: number) {
    return this.http.get(environment.endpoint + 'User/search?id=' + id);
  }

  createUser(user: User) {
    return this.http.post(environment.endpoint + 'User', {
      "data": user
    });
  }

  updateUser(user: User) {
    return this.http.put(environment.endpoint + 'User/update', {
      "data": user
    });
  }

  deleteUser(user: User) {
    return this.http.delete(environment.endpoint + 'User/delete?id=' + user.id);
  }

  getUserByEmail(email: string | null) {
    return this.http.get(environment.endpoint + 'User/auth?email=' + email);
  }
}
