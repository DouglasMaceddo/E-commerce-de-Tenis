import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-minhaconta',
  templateUrl: './minhaconta.page.html',
  styleUrls: ['./minhaconta.page.scss'],
})
export class MinhacontaPage implements OnInit {

  userInfo = {
    name: 'João da Silva',
    email: 'joao@example.com',
    phone: '1234-5678'
  };

  addressForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.addressForm = this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('^[0-9]{5}-[0-9]{3}$')]] // Formato: 12345-678
    });
  }
  ngOnInit(){
    
  }
  
  onSubmit() {
    if (this.addressForm.valid) {
      console.log('Endereço cadastrado:', this.addressForm.value);
      // Aqui você pode adicionar a lógica para salvar o endereço
    }
  }
}
