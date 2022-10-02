import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pageTitle = 'TeLlevo';
  isNotHome = false;
  loading: HTMLIonLoadingElement;

  constructor(private loadingCtrl:LoadingController) {}

  ngOnInit(){
    this.cargarLoading('Bienvenido a TeLLevoApp');
    console.log('ngOnInit');
  }

  ngOnDestroy(){
    this.cargarLoading('Estaremos esperando su retorno!');
    console.log('ngOnDestroy');
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter');
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter');
  }

  ionViewWillLeave(){
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave(){
    console.log('ionViewDidLeave');
  }

  cargarLoading(message:string){
    this.presentLoading(message);

    setTimeout(() => {
      this.loading.dismiss();
    }, 2000);
  }

  async presentLoading(message:string){
    this.loading = await this.loadingCtrl.create({
      message,
    });
    await this.loading.present();
  }

}
