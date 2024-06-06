import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {

  userForm : FormGroup;
  isFormSubmitted : boolean = false;


  constructor(private productService: ProductService,  private router: Router){
    this.userForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      image: new FormControl("", [Validators.required]),
      price : new FormControl("", [Validators.required, Validators.min(0)]),
      description : new FormControl("", [Validators.required, Validators.minLength(5)])
    })
   }

  onHandleAdd(){
    const isFormValid = this.userForm.valid;
    this.isFormSubmitted =  true;
    if(isFormValid){
      this.productService.add(this.userForm.value).subscribe(product => {
        this.userForm.reset();
        this.router.navigate(['/product']);
      })
    }
  }

  

}
