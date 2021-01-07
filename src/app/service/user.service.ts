import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {
  }

  // @ts-ignore
  getAllUser(): Observable<any> {
    return this.http.get(this.API);
  }

  create(user: IUser): Observable<any> {
    return this.http.post<IUser>(this.API, user);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }

  update(user: IUser): Observable<any> {
    return this.http.put<IUser>(`${this.API}/${user.id}`, user);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.API}/${id}`);
  }
}
