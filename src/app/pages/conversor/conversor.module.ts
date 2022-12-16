import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConversorPageRoutingModule } from './conversor-routing.module';

import { ConversorPage } from './conversor.page';
import { ComponentsModule } from 'src/app/components/components.module';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConversorPageRoutingModule,
    ComponentsModule,
    HttpClientModule,
  ],
  declarations: [ConversorPage]
})
export class ConversorPageModule {}
