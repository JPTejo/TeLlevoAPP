import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserMenuPageRoutingModule } from './user-menu-routing.module';

import { UserMenuPage } from './user-menu.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserMenuPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [UserMenuPage]
})
export class UserMenuPageModule {}
