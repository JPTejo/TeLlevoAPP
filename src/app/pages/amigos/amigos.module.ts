import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmigosPageRoutingModule } from './amigos-routing.module';

import { AmigosPage } from './amigos.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmigosPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [AmigosPage]
})
export class AmigosPageModule {}
