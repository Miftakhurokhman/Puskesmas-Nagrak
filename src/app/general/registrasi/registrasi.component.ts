import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrasi',
  templateUrl: './registrasi.component.html',
  styleUrls: ['./registrasi.component.css']
})
export class RegistrasiComponent implements OnInit {

  registrasiForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.registrasiForm = this.formBuilder.group({
      namaLengkapIbu: [null, Validators.required],
      usia: [null, Validators.required],
      nomorHP: [null, Validators.required],
      alamat: [null, Validators.required],
      usiaKehamilan: [null, Validators.required],
      password: [null, Validators.required],
      hariPertamaHaidTerakhir: [null, Validators.required],
      hariTaksiranPersalinan: [null, Validators.required],
      namaSuami: [null, Validators.required]
    });
  }

  buttonNextIsAble : boolean = false;
  buttonSubmitIsAble : boolean = false;
  onFirstForm: boolean = true;
  openSpinner: boolean = false;
  displayPasswordRules: boolean = false;
  previousValue: string = '';

  ngOnInit(): void {
    this.registrasiForm.valueChanges.subscribe(() => {
      if (this.registrasiForm.get('namaLengkapIbu')?.invalid || this.registrasiForm.get('usia')?.invalid || this.registrasiForm.get('alamat')?.invalid || this.registrasiForm.get('usiaKehamilan')?.invalid || this.registrasiForm.get('nomorHP')?.invalid) {
        this.buttonNextIsAble = false;
      } else {
        this.buttonNextIsAble = true;
      }

      if (this.registrasiForm.invalid) {
        this.buttonSubmitIsAble = false
      } else if (this.displayPasswordRules) {
        this.buttonSubmitIsAble = false
      } else {
        this.buttonSubmitIsAble = true
      }
    })

    this.registrasiForm.get('password')?.valueChanges.subscribe((value) => {
      const pattern: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+{};:,<.>])(?=.*[0-9]).{8,}$/;
      if (!pattern.test(value)) {
        this.displayPasswordRules = true;
      } else {
        this.displayPasswordRules = false;
      }
    });


    this.registrasiForm.get('nomorHP')?.valueChanges.subscribe((value) => {
      const pattern: RegExp = /^[0-9]+$/;
      if (value === '') {
        this.previousValue = value;
      } else if (!pattern.test(value)) {
        this.registrasiForm.patchValue({
          nomorHP: this.previousValue
        }, { emitEvent: false });
      } else {
        this.previousValue = value;
      }
    });
  }

  openPage(pageName: string) {
    if (pageName === 'login') {
      this.router.navigate(['/auth', 'login'])
    }
  }

  changeForm() {
    this.onFirstForm = !this.onFirstForm;
    console.log(this.registrasiForm);
    
  }

  submitForm() {
    Swal.fire({
      title: 'Apakah data yang diisi benar?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, lanjutkan',
      cancelButtonText: 'Tidak, batalkan',
    }).then((result) => {
      if (result.isConfirmed) {
        this.sendFormData();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Proses dibatalkan
        console.log('Proses dibatalkan');
      }
    });
  }

  sendFormData(){
    console.log(this.registrasiForm.value);
    
    this.openSpinner = true
  }
}
