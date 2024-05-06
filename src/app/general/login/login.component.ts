import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registrasiForm: FormGroup;
  buttonSubmitIsAble: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.registrasiForm = this.formBuilder.group({
      namaLengkapIbu: [null, Validators.required],
      nomorHP: [null, Validators.required],
      hariPertamaHaidTerakhir: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.registrasiForm.valueChanges.subscribe(() => {
      if (this.registrasiForm.invalid) {
        this.buttonSubmitIsAble = false
      } else {
        this.buttonSubmitIsAble = true
      }
    })
  }


  openPage(pageName: string) {
    if (pageName === 'registrasi') {
      this.router.navigate(['/auth', 'registrasi'])
    }
  }

  login() {
    
  }
}
