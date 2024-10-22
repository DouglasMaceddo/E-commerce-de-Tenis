import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  enderecoUsuario: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.carregarEndereco();
  }

  carregarEndereco() {
    const usuarioLogado = localStorage.getItem('userId');
    const enderecos = JSON.parse(localStorage.getItem('enderecos') || '[]');
    this.enderecoUsuario = enderecos.find((endereco: any) => endereco.userId === usuarioLogado);
  }

  cadastrarend() {
    this.router.navigate(['/minhaconta']);
  }

  voltar() {
    this.router.navigate(['/carrinho']);
  }
}
