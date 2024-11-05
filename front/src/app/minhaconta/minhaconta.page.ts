import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-minhaconta',
  templateUrl: './minhaconta.page.html',
  styleUrls: ['./minhaconta.page.scss'],
})
export class MinhacontaPage implements OnInit {

  infoUsuario = {
    cpf: '',
    email: '',
    nome: '',
    telefone: ''
  };

  addressForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private toastController: ToastController) {
    this.addressForm = this.formBuilder.group({
      Rua: ['', [Validators.required, Validators.minLength(5)]], // Mínimo de 5 caracteres
      Cidade: ['', [Validators.required, Validators.minLength(3)]], // Mínimo de 3 caracteres
      Estado: ['', Validators.required],
      CEP: ['', [Validators.required,Validators.pattern(/^\d{5}-\d{3}$/)]]
    });

  }
  validateCEP(CEP: string): boolean {
    // Remove caracteres não numéricos
    CEP = CEP.replace(/\D/g, '');

    // Verifica se o CEP possui 8 dígitos
    return CEP.length === 8;
  }
  ngOnInit() {}
  
    

  onSubmit() {
    if (this.addressForm.valid) {
      const enderecos = JSON.parse(localStorage.getItem('enderecos') || '[]');
      const usuarioLogado = localStorage.getItem('userId');
      // Verifica se já existe um endereço associado ao usuário
      const enderecoExistente = enderecos.find((endereco: any) => endereco.userId === usuarioLogado);

      const novoEndereco = {
        userId: usuarioLogado,
        Rua: this.addressForm.value.Rua,
        Cidade: this.addressForm.value.Cidade,
        Estado: this.addressForm.value.Estado,
        CEP: this.addressForm.value.CEP
      };

      if (!this.validateCEP(this.addressForm.value.CEP)) {
        this.presentToast('CEP inválido, Verifique e tente novamente.', 'danger');
        return;
      }

      if (enderecoExistente) {
        // Se já existir, atualiza o endereço
        enderecoExistente.Rua = novoEndereco.Rua;
        enderecoExistente.Cidade = novoEndereco.Cidade;
        enderecoExistente.Estado = novoEndereco.Estado;
        enderecoExistente.CEP = novoEndereco.CEP;
      } else {
        // Se não existir, adiciona um novo endereço
        enderecos.push(novoEndereco);
      }

      // Salva a lista de endereços de volta no localStorage
      localStorage.setItem('enderecos', JSON.stringify(enderecos));

      this.presentToast('Endereço cadastrado com sucesso!', 'success');
    } else {
      this.presentToast('Por favor, preencha todos os campos corretamente.', 'danger');
    }
  }

  sairConta() {
    this.infoUsuario = {
      cpf: '',
      email: '',
      nome: '',
      telefone: ''
    };

    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Tempo que o toast ficará visível
      color: color, // Cor do toast
      position: 'bottom', // Posição do toast na tela
      cssClass: 'custom-toast', // Classe CSS para personalização adicional
    });
    await toast.present();
  }
}
