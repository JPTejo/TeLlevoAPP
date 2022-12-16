import { Component } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/services/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalPage } from '../modal/modal.page';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

const API_URL = environment.openWeather_URL;
const API_KEY = environment.openWeather_KEY;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todayDate = new Date()
  pageTitle = 'TeLlevo';
  isNotHome = false;
  weatherTemp :any
  cityName :any
  weatherIcon:any
  weatherDetails:any
  lat:any
  lon:any

  usuarios: Usuario[] = [];

  constructor(
    private usuarioService: UsuarioService,
    public httpClient:HttpClient,
    private alertCtrl:AlertController,
    private toastCtrl: ToastController,
    private modalCtrl:ModalController,
    private geolocation: Geolocation
    ) {
    this.loadData();
  }



  loadData(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;
      console.log(this.lat);
      console.log(this.lon);
     }).catch((error) => {
       console.log('Error obteniendo la ubicacion', error);
     });
    this.httpClient.get(`${API_URL}/onecall?lat=${this.lat}&lon=${this.lon}&exclude=hourly,daily&units=metric&appid=${API_KEY}`).subscribe(results => {
    console.log(results);
    this.weatherTemp = results['current']
    this.cityName = results['timezone']
    console.log(this.weatherTemp);
    this.weatherDetails = results['current']['weather'][0]['icon']
    console.log(this.weatherDetails);
    this.weatherIcon = `http://openweathermap.org/img/wn/${this.weatherDetails}@2x.png`

    })
  }

  async openDetailUsuario(usuario:Usuario){
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id:usuario.id },
      breakpoints: [0,0.5,0.8,1],
      initialBreakpoint:1
    });
    modal.present();
  }

  async toastPresent(message:string){
    const toast = await this.toastCtrl.create({
      message:message,
      duration:1000
    });
    toast.present();
  }


  ngOnInit() {
  }

}
