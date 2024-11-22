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
      Cidade: ['', [Validators.required, Validators.minLength(3)]],
      Estado: ['', Validators.required],
      Complemento: ['', Validators.required],
      CEP: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]]
    });
  }

  ngOnInit() {
    this.loadUserInfo();
  }

  validateCEP(CEP: string): boolean {
    CEP = CEP.replace(/\D/g, ''); // Remove qualquer caractere não numérico
    return CEP.length === 8; // Valida se o CEP tem 8 dígitos
  }

  // Carregar as informações do usuário a partir do token JWT
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
  
  carregarEnderecos() {
    this.enderecoService.getEnderecos().subscribe({
      next: (response) => {
        if (response.success) {
          // Exibe os endereços no console ou os armazena em uma variável local
          console.log(response.data);
          this.presentToast('Endereços carregados com sucesso!', 'success');
        } else {
          this.presentToast('Não foi possível carregar os endereços.', 'danger');
        }
      },
      error: () => {
        this.presentToast('Erro ao carregar os endereços. Tente novamente mais tarde.', 'danger');
      }
    });
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
        cep: this.addressForm.value.CEP,       // Corrigido para 'cep' conforme esperado no backend
        rua: this.addressForm.value.Rua,       // Corrigido para 'rua'
        cidade: this.addressForm.value.Cidade, // Corrigido para 'cidade'
        estado: this.addressForm.value.Estado, // Corrigido para 'estado'
        complemento: this.addressForm.value.Complemento // Corrigido para 'complemento'
      };

      // Valida o CEP antes de enviar a requisição
      if (!this.validateCEP(novoEndereco.cep)) {
        this.presentToast('CEP inválido. Verifique e tente novamente.', 'danger');
        return;
      }

      this.presentToast('Salvando endereço...', 'primary');

      // Chama o serviço para salvar o endereço
      this.enderecoService.salvarEndereco(novoEndereco).subscribe(
        (response) => {
          // Sucesso
          if (response.success) {
            this.presentToast('Endereço atualizado com sucesso!', 'success');
            this.carregarEnderecos();
          } else {
            this.presentToast('Erro ao atualizar o endereço. Tente novamente.', 'danger');
          }
        },
        (error) => {
          this.presentToast('Erro ao atualizar o endereço. Tente novamente mais tarde.', 'danger');
        }
      );
    } else {
      this.presentToast('Por favor, preencha todos os campos corretamente.', 'warning');
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

    // Remover o token de autenticação
    sessionStorage.removeItem('authToken');
    const userId = this.carrinhoService.getCpf();
    if (userId) {
      sessionStorage.removeItem(`cart_${userId}`);
    }
    
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
