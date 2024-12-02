import { Component, OnInit } from '@angular/core';
import { PixService } from '../service/pix.service';

@Component({
  selector: 'app-pagamento-pix',
  templateUrl: './pagamento-pix.page.html',
  styleUrls: ['./pagamento-pix.page.scss'],
})
export class PagamentoPixPage implements OnInit {

  chavePix: string = '1234567890abcd'; // Exemplo de chave PIX do recebedor
  valor: number = 150.75;  // Exemplo de valor do pagamento
  identificador: string = 'pedido12345'; // Identificador único do pedido
  qrCodeImage: string = '';  // Imagem do QR Code gerado

  constructor(private pixService: PixService) { }

  ngOnInit() {
    // Gerando o QR Code com as informações do PIX
    this.pixService.gerarQRCodePix(this.chavePix, this.valor, this.identificador)
      .then(qrCode => {
        this.qrCodeImage = qrCode;  // Atribuindo o QR Code gerado à variável
      })
      .catch(error => {
        console.error('Erro ao gerar o QR Code:', error);
      });
  }
}

