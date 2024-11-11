import {jwtDecode} from 'jwt-decode';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-minhaconta',
  templateUrl: './minhaconta.page.html',
  styleUrls: ['./minhaconta.page.scss'],
})
export class MinhacontaPage implements OnInit {
  infoUsuario = {
    name: '',
    cpf: '',
    email: '',
    telefone: ''
  };

  addressForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastController: ToastController,
    private http: HttpClient // Injeção do serviço HTTP
  ) {
    this.addressForm = this.formBuilder.group({
      Rua: ['', [Validators.required, Validators.minLength(5)]],
      Cidade: ['', [Validators.required, Validators.minLength(3)]],
      Estado: ['', Validators.required],
      Complemento: ['', Validators.required],
      CEP: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]]
    });
  }

  validateCEP(CEP: string): boolean {
    CEP = CEP.replace(/\D/g, '');
    return CEP.length === 8;
  }

  ngOnInit() {
    this.loadUserInfo();
  }

  loadUserInfo() {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.infoUsuario = {
        name: decoded.name,
        cpf: decoded.cpf,
        email: decoded.email,
        telefone: decoded.telefone
      };
    }
  }

  buscarEnderecoPorCEP() {
    const cep = this.addressForm.get('CEP')?.value.replace(/\D/g, '');

    if (this.validateCEP(cep)) {
      this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe(
        (data: any) => {
          if (!data.erro) {
            this.addressForm.patchValue({
              Rua: data.logradouro,
              Cidade: data.localidade,
              Estado: data.uf
            });
          } else {
            this.presentToast('CEP não encontrado.', 'danger');
          }
        },
        (error) => {
          this.presentToast('Erro ao buscar CEP. Tente novamente.', 'danger');
        }
      );
    } else {
      this.presentToast('CEP inválido. Verifique e tente novamente.', 'danger');
    }
  }

  onSubmit() {
    if (this.addressForm.valid) {
      const novoEndereco = {
        Rua: this.addressForm.value.Rua,
        Cidade: this.addressForm.value.Cidade,
        Estado: this.addressForm.value.Estado,
        Complemento: this.addressForm.value.Complemento,
        CEP: this.addressForm.value.CEP
      };

      if (!this.validateCEP(this.addressForm.value.CEP)) {
        this.presentToast('CEP inválido, Verifique e tente novamente.', 'danger');
        return;
      }

      this.presentToast('Endereço cadastrado com sucesso!', 'success');
    } else {
      this.presentToast('Por favor, preencha todos os campos corretamente.', 'danger');
    }
  }

  sairConta() {
    this.infoUsuario = {
      cpf: '',
      email: '',
      name: '',
      telefone: ''
    };
    sessionStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom',
      cssClass: 'custom-toast',
    });
    await toast.present();
  }
}
