import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll() : Observable<IProduct[]>{
    return this.http.get<IProduct[]>(`http://localhost:3000/products`)
  }

  delete(id : number | undefined) : Observable<IProduct | {} > {
    return this.http.delete<IProduct | {}>(`http://localhost:3000/products/${id}`)
  }

  add(product : IProduct) : Observable<IProduct> {
    return this.http.post<IProduct>(`http://localhost:3000/products`, product)
  }

  getById(id : number | undefined) : Observable<IProduct> {
    return this.http.get<IProduct>(`http://localhost:3000/products/${id}`)
  }

  edit(id : number | undefined, product : IProduct) : Observable<IProduct> {
    return this.http.put<IProduct>(`http://localhost:3000/products/${id}`, product)
  }


}
