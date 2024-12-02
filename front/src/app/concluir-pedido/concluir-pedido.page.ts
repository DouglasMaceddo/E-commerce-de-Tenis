import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Importar ActivatedRoute

@Component({
  selector: 'app-concluir-pedido',
  templateUrl: './concluir-pedido.page.html',
  styleUrls: ['./concluir-pedido.page.scss'],
})
export class ConcluirPedidoPage implements OnInit {
  qrCodeUrl: string = '';  // Variável para armazenar o QR Code

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // Captura o parâmetro qrCodeUrl da URL
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['qrCodeUrl']) {
        this.qrCodeUrl = params['qrCodeUrl'];  // Armazena a URL do QR Code
      }
    });
  }

}
