import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoViajePageRoutingModule } from './nuevo-viaje-routing.module';

import { NuevoViajePage } from './nuevo-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoViajePageRoutingModule
  ],
  declarations: [NuevoViajePage]
})
export class NuevoViajePageModule {}
