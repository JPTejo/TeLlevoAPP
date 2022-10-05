import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Buscar Viaje', redirectTo: '/home', icon: 'paper-plane'},
    { title: 'Mis Viajes', redirectTo: '/mis-viajes', icon: 'archive' },
    { title: 'Favoritos', redirectTo: '/favoritos', icon: 'heart' },
    { title: 'Amigos', redirectTo: '/amigos', icon: 'warning' },
    { title: 'Contacto', redirectTo: '/contacto', icon: 'mail' },
  ];
  /** public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders']; **/
  constructor(private modalController: ModalController) {
    this.presentSplashScreen();
  }

  async presentSplashScreen(){
    const modal = await this.modalController.create({
      component: SplashScreenComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}