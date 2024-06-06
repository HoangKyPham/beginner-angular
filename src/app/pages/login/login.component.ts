import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userForm !: FormGroup;
  isFormSubmitted = false;

  constructor(private userService: UserService, private router: Router) {
    this.userForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    })
  }



  onHandleLogin() {
    const isFormValid = this.userForm.valid;
    this.isFormSubmitted = true

    if (isFormValid) {
      this.userService.signin().subscribe(users => {
        const user = users.find((user: IUser) => {
          return user.email === this.userForm.value.email && user.password === this.userForm.value.password
        })

        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/product'])
          this.userForm.reset()
        } else {
          alert("Email or password incorrect")
        }
      })
    }

  }



}
