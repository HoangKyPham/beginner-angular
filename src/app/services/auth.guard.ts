import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IUser } from '../interfaces/user';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)

  const localData = localStorage.getItem('user');
  const user: IUser = JSON.parse(localData || '{}');

    if (user.role === 1) {
      return true
    } else {
      router.navigateByUrl('/home')
      return false
    }

};
