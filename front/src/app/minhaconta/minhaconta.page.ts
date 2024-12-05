import { jwtDecode } from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NavController, ToastController } from "@ionic/angular";
import { HttpClient } from '@angular/common/http';
import { CarrinhoService } from "../service/carrinho.service";
import { EnderecoService } from '../service/endereco.service';

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
  enderecos: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private carrinhoService: CarrinhoService,
    private enderecoService: EnderecoService,
    private router: Router,
    private toastController: ToastController,
    private http: HttpClient,
    private navCtrl: NavController
  ) {

    this.addressForm = this.formBuilder.group({
      Rua: ['', [Validators.required, Validators.minLength(5)]],
      Bairro: ['', Validators.required],
      Cidade: ['', [Validators.required, Validators.minLength(3)]],
      Estado: ['', Validators.required],
      Complemento: ['', Validators.required],
      CEP: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]]
    });
  }

  ngOnInit() {
    this.loadUserInfo();
    this.carregarEnderecos();
  }

  validateCEP(CEP: string): boolean {
    CEP = CEP.replace(/\D/g, ''); // Remove qualquer caractere não numérico
    return CEP.length === 8; // Valida se o CEP tem 8 dígitos
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
              Bairro: data.bairro,
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

  carregarEnderecos() {
    this.enderecoService.getEnderecos().subscribe({
      next: (response) => {
        if (response.success) {
          this.enderecos = response.data; // Atualiza a lista de endereços
        } else {
          this.presentToast('Não foi possível carregar os endereços.', 'danger');
        }
      },
      error: () => {
        this.presentToast('Erro ao carregar os endereços. Tente novamente mais tarde.', 'danger');
      }
    });
  }

  onSubmit() {
    if (this.addressForm.valid) {
      const novoEndereco = {
        cep: this.addressForm.value.CEP,
        rua: this.addressForm.value.Rua,
        bairro: this.addressForm.value.Bairro,
        cidade: this.addressForm.value.Cidade,
        estado: this.addressForm.value.Estado,
        complemento: this.addressForm.value.Complemento
      };

      this.enderecoService.salvarEndereco(novoEndereco).subscribe({
        next: (response) => {
          if (response.success) {
            this.presentToast('Endereço atualizado com sucesso!', 'success');
            this.carregarEnderecos();
            this.addressForm.reset();
          }
        },
        error: () => {
          this.presentToast('Erro ao salvar o endereço. Tente novamente.', 'danger');
        }
      });
    } else {
      this.presentToast('Preencha os campos corretamente.', 'warning');
    }
  }


  voltar(){
    this.navCtrl.back();
  }

  sairConta() {
    this.infoUsuario = {
      cpf: '',
      email: '',
      name: '',
      telefone: ''
    };

    sessionStorage.removeItem('authToken');
    const userId = this.carrinhoService.getCpf();
    if (userId) {
      sessionStorage.removeItem(`cart_${userId}`);
    }
    sessionStorage.removeItem('temp_cart');
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
