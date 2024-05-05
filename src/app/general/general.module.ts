import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { RegistrasiComponent } from './registrasi/registrasi.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "registrasi",
    component: RegistrasiComponent
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    RegistrasiComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class GeneralModule { }
