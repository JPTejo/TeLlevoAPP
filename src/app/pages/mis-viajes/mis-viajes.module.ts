import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisViajesPageRoutingModule } from './mis-viajes-routing.module';

import { MisViajesPage } from './mis-viajes.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisViajesPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [MisViajesPage]
})
export class MisViajesPageModule {}
