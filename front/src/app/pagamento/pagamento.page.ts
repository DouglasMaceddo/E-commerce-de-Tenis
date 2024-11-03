import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
})
export class PagamentoPage implements OnInit {

  savedCard: any = null; // Para armazenar os dados do cartão

  constructor(private alertController: AlertController) {}

  ngOnInit() {}
  
  async onSubmit(form: NgForm) { // Especificando o tipo do parâmetro
    this.savedCard = {
      cardName: form.value.cardName,
      cardNumber: form.value.cardNumber,
      expiryDate: form.value.expiryDate,
      cvv: form.value.cvv,
    };
  
    const alert = await this.alertController.create({
      header: 'Sucesso!',
      message: 'Dados do cartão salvos com sucesso.',
      buttons: ['OK'],
    });
  
    await alert.present();
  }
}