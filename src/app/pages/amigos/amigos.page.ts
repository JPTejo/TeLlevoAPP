import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/services/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.page.html',
  styleUrls: ['./amigos.page.scss'],
})
export class AmigosPage implements OnInit {
  ngOnInit() {this.getUsuarios()
  }
  usuarios: Usuario[] = [];
  pageTitle = 'amigos';
  isNotHome = true;
  altAvatar = "https://static.thenounproject.com/png/193752-200.png"

  getUsuarios(){
    this.usuarioService.getUsuarios().subscribe(respuesta => {
      console.log(respuesta);
      this.usuarios = respuesta;
    })
  }


  constructor(private usuarioService: UsuarioService, private alertCtrl:AlertController,
    private toastCtrl: ToastController, private modalCtrl:ModalController) { }

    async openDetailUsuario(usuario:Usuario){
      const modal = await this.modalCtrl.create({
        component: ModalPage,
        componentProps: { id:usuario.id },
        breakpoints: [0,0.5,0.8,1],
        initialBreakpoint:0.5
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
}
