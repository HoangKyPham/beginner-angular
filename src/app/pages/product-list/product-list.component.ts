import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  products!: IProduct[]

  constructor(private productService: ProductService){
    this.productService.getAll().subscribe(products => {
      this.products = products
    })
  }

  removeProduct(id : number | undefined){
    this.productService.delete(id).subscribe(() => {
      this.products = this.products.filter(product => product.id != id);
    })
  }

}
