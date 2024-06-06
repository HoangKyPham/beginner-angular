import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  signup(userRegister : IUser) : Observable<IUser> {
    return this.http.post<IUser>(`http://localhost:3000/users`, userRegister)
  }

  signin() : Observable<IUser[]> {
    return this.http.get<IUser[]>(`http://localhost:3000/users`)
  }

  
}
