import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [

    {path : "register" ,component : RegisterComponent},
    {path : "login" ,component : LoginComponent},
    {path : "" ,redirectTo: "/login", pathMatch : "full"},
    {    
        path: "", component:LayoutComponent, children: [
            {path: "", redirectTo: "/product", pathMatch: "full"},
            {path: "product", component:ProductListComponent, canActivate: [authGuard]},
            {path: "product/add", component:ProductAddComponent, canActivate: [authGuard]},
            {path: "product/edit/:id", component:ProductEditComponent, canActivate: [authGuard]}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
