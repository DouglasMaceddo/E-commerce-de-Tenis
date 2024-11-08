import {jwtDecode} from 'jwt-decode';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {Component, OnInit} from "@angular/core";

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

  constructor(private formBuilder: FormBuilder, private router: Router, private toastController: ToastController) {
    this.addressForm = this.formBuilder.group({
      Rua: ['', [Validators.required, Validators.minLength(5)]],
      Cidade: ['', [Validators.required, Validators.minLength(3)]],
      Estado: ['', Validators.required],
      CEP: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]]
    });
  }

  validateCEP(CEP: string): boolean {
    // Remove caracteres não numéricos
    CEP = CEP.replace(/\D/g, '');

    // Verifica se o CEP possui 8 dígitos
    return CEP.length === 8;
  }

  ngOnInit() {
    this.loadUserInfo();
  }

  loadUserInfo() {
    const token = sessionStorage.getItem('authToken'); // Obtém o token armazenado
    if (token) {
      const decoded: any = jwtDecode(token); // Decodifica o token usando jwtDecode
      this.infoUsuario = {
        name: decoded.name,
        cpf: decoded.cpf,
        email: decoded.email,
        telefone: decoded.telefone
      };
    }
  }

  onSubmit() {
    if (this.addressForm.valid) {
      const novoEndereco = {
        Rua: this.addressForm.value.Rua,
        Cidade: this.addressForm.value.Cidade,
        Estado: this.addressForm.value.Estado,
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

    sessionStorage.removeItem('authToken'); // Remove o token ao sair
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
