import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AvatarService } from 'src/app/services/avatar.service';
import { Camera } from '@capacitor/camera';
import { CameraResultType, CameraSource } from '@capacitor/camera/dist/esm/definitions';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.page.html',
  styleUrls: ['./user-menu.page.scss'],
})
export class UserMenuPage implements OnInit {

  pageTitle = localStorage.getItem('ingreso');
  isNotHome = true;

  profile:any=null;

  constructor(
    private navController:NavController,
    private router:Router,
    private authService:AuthService,
    private avatarService: AvatarService,
    private alertCtrl:AlertController,
    private toastCtrl:ToastController,
    private loadingCtrl: LoadingController, 
    ) { this.loadProfile(); }

  ngOnInit() {
  }

  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('/',{replaceUrl:true})
  } 

  loadProfile(){
    this.avatarService.getUserProfile().subscribe(respuesta => {
      this.profile = respuesta;
    })
  }

  async uploadAvatar(){
    const avatar = await Camera.getPhoto({
      quality:90,
      allowEditing:false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });
    console.log(avatar);

    if(avatar){
      const loading = await this.loadingCtrl.create();
      await loading.present();
      const respuesta = await this.avatarService.uploadAvatar(avatar);
      await loading.dismiss();

      if(respuesta){
        this.toastPresent('Avatar ingresado!!!');
      }
      else{
        this.alertPresent('Subida Fallida','Por favor intente denuevo!!!');
      }
    }
  }

  async toastPresent(message:string){
    const toast = await this.toastCtrl.create({
      message:message,
      duration:1000,
    });
    await toast.present();
  }

  async alertPresent(header:string,message:string){
    const alert = await this.alertCtrl.create({
      header:header,
      message:message,
      buttons:['OK'],
    });
    await alert.present();
  }

}
