import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinhacontaPageRoutingModule } from './minhaconta-routing.module';

import { MinhacontaPage } from './minhaconta.page';
import { CepMaskDirective } from './Mascara-CEP/cep-mask.directive'

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MinhacontaPageRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CepMaskDirective
  ],
  declarations: [MinhacontaPage]
})
export class MinhacontaPageModule {}
