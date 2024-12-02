import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagamentoPixPageRoutingModule } from './pagamento-pix-routing.module';

import { PagamentoPixPage } from './pagamento-pix.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagamentoPixPageRoutingModule
  ],
  declarations: [PagamentoPixPage]
})
export class PagamentoPixPageModule {}
