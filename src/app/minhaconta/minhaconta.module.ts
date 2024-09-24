import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinhacontaPageRoutingModule } from './minhaconta-routing.module';

import { MinhacontaPage } from './minhaconta.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MinhacontaPageRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [MinhacontaPage]
})
export class MinhacontaPageModule {}
