import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConcluirPedidoPageRoutingModule } from './concluir-pedido-routing.module';

import { ConcluirPedidoPage } from './concluir-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConcluirPedidoPageRoutingModule
  ],
  declarations: [ConcluirPedidoPage]
})
export class ConcluirPedidoPageModule {}
