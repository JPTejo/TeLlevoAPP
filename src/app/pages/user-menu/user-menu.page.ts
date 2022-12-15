import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AvatarService } from 'src/app/services/avatar.service';
import { Camera } from '@capacitor/camera';
import { CameraResultType, CameraSource } from '@capacitor/camera/dist/esm/definitions';
import { Usuario } from 'src/app/services/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalPage } from '../modal/modal.page';


import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.page.html',
  styleUrls: ['./user-menu.page.scss'],
})
export class UserMenuPage implements OnInit {

  pageTitle = localStorage.getItem('ingreso');
  isNotHome = true;

  profile:any=null;
  user:any;
  id: string;
  usuario:any;


  constructor(
    private router:Router,
    private authService:AuthService,
    private avatarService: AvatarService,
    private alertCtrl:AlertController,
    private toastCtrl:ToastController,
    private loadingCtrl: LoadingController, 
    private usuarioService: UsuarioService,
    private modalCtrl:ModalController, 
    private auth: Auth,
    private firestore: Firestore,
    ) { }

  ngOnInit() {
    this.getUsuario();
    this.loadProfile(); 
  
  }

  getUsuario(){
      this.usuarioService.getUsuarioById(this.id).subscribe(respuesta => {
      console.log(respuesta);
      this.usuario = respuesta;
    });
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
  
  async deleteUsuario(){    
    const alert = await this.alertCtrl.create({
      header:'Delete',
      message: 'Estas seguro que deseas eliminar al usuario?',
      buttons: [
        {
          text:'Cancel',
          role:'cancel'
        },
        {
          text:'Yes',
          role:'confirm',
          handler: () => {
            this.usuarioService.deleteUsuario(this.usuario);
            this.modalCtrl.dismiss();
            this.toastPresent('User deleted!!!');
            this.authService.logout();
            this.router.navigateByUrl('/',{replaceUrl:true})
          }
        }
       ]
    });
    alert.present();
  }

  updateUsuario(){
    this.usuarioService.updateUsuario(this.usuario);
    this.toastPresent('User updated!!!!');
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

  
  async openDetailUsuario(usuario:Usuario){
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id:usuario.id },
      breakpoints: [0,0.5,0.8,1],
      initialBreakpoint:1
    });
    modal.present();
  }

}
