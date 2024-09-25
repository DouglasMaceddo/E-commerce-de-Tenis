import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
})
export class PagamentoPage implements OnInit {

  constructor(private alertController: AlertController) {}
  ngOnInit() {
  }

  async onSubmit(form: { value: { cardName: any; cardNumber: any; expiryDate: any; cvv: any; }; }) {
    const cardData = {
      cardName: form.value.cardName,
      cardNumber: form.value.cardNumber,
      expiryDate: form.value.expiryDate,
      cvv: form.value.cvv,
    };

    // Aqui você pode chamar uma API para salvar os dados no banco de dados

    // Exemplo de alerta de sucesso
    const alert = await this.alertController.create({
      header: 'Sucesso!',
      message: 'Dados do cartão salvos com sucesso.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
