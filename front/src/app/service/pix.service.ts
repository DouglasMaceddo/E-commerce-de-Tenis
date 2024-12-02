import { Injectable } from '@angular/core';
import * as QRCode from 'qrcode';

@Injectable({
  providedIn: 'root'
})
export class PixService {

  constructor() { }

  // Método para gerar o QR Code do PIX
  gerarQRCodePix(chavePix: string, valor: number, identificador: string): Promise<string> {
    // Construindo o código Pix, você pode precisar de mais parâmetros
    const pixPayloadBase: string = `00020101021226820014BR.GOV.BCB.PIX0114${chavePix}520400005303986540${valor.toFixed(2).replace('.', '')}5802BR5925${identificador}6009br.gov.bcb.pix`;
    const checksum: string = this.calcularChecksum(pixPayloadBase);
    const pixPayload: string = `${pixPayloadBase}${checksum}`;
    return QRCode.toDataURL(pixPayload); // Gerando o QR Code
  }

  // Função para calcular o checksum do código Pix (conforme especificado no manual)
  private calcularChecksum(payload: string): string {
    let checksum = 0;
    for (let i = 0; i < payload.length; i++) {
      checksum = (checksum + payload.charCodeAt(i)) % 256;
    }
    return checksum.toString().padStart(2, '0');
  }
}