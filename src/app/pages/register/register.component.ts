import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userForm !: FormGroup;
  isFormSubmitted = false;

  constructor(private userService: UserService, private router : Router){
    this.userForm = new FormGroup({
      name : new FormControl("", [Validators.required]),
      email : new FormControl("", [Validators.required, Validators.email]),
      password : new FormControl("", [Validators.required, Validators.minLength(6)])
    })
  }

  onHandleRegister(){
    const isFormValid = this.userForm.valid
    this.isFormSubmitted = true
    
    if (isFormValid) {
        this.userService.signup({...this.userForm.value, role : 2}).subscribe(user => {
          console.log(user)
          this.userForm.reset();
          this.router.navigate(['/login'])
        })
    }


  }





}
