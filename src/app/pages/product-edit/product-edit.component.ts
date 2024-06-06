import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/product';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {

  userForm!: FormGroup;
  isFormSubmitted: boolean = false;

  product: IProduct = {
    id: 0,
    name: "",
    price: 0,
    image: "",
    description: "",
  }

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) {

  }

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      image: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required, Validators.min(0)]),
      description: new FormControl("", [Validators.required, Validators.minLength(5)])
    });

    this.route.params.subscribe(params => {
      const id = params['id'];
      this.productService.getById(id).subscribe(product => {
        this.product = product;
        if (this.userForm) { 
          this.userForm.patchValue(product); // Cập nhật giá trị của form
        }
      });
    });
  }


  onHandleEdit() {
    const isFormValid = this.userForm.valid;
    this.isFormSubmitted = true;
    if (isFormValid) {
      this.productService.edit(this.product.id, this.userForm.value).subscribe(product => {
        this.userForm.reset();
        this.router.navigate([`/product`])
      })
    }
  }





}
