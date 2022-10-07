import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pageTitle = 'TeLlevo';
  isNotHome = false;

  constructor(private alertController:AlertController) {}


  ngOnInit() {
    this.presentAlert();
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      header: 'Bienvenido',
      message: 'Has accedido correctamente!',
      buttons: ['Entrar']
    });

    await alert.present();
  }
}
