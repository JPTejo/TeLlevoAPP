import { Component, OnInit , Input} from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/services/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() id: string;
  usuario: Usuario = null;

  constructor(private usuarioService: UsuarioService, private modalCtrl:ModalController,
    private alertCtrl:AlertController,private toastCtrl:ToastController) { }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario(){
    this.usuarioService.selectUsuario(this.id).subscribe(respuesta => {
      this.usuario = respuesta;
    });
  }
  
  async toastPresent(message:string){
    const toast = await this.toastCtrl.create({
      message:message,
      duration:1000
    });
    toast.present();
  }

}
