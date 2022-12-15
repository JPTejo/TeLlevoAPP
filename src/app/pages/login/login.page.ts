import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/services/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials!: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private auth:AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl:LoadingController,
    private router:Router,
    private usuarioService: UsuarioService,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  get email(){
    return this.credentials?.get('email');
  }

  get password(){
    return this.credentials?.get('password');
  }

  createForm(){
    this.credentials = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    const user = await this.auth.login(this.credentials.value.email,this.credentials.value.password);
    await loading.dismiss();

    if(user){
      this.router.navigateByUrl('/home',{replaceUrl:true});
    }
    else{
      this.alertPresent('Ingreso Fallido','Por favor, intente otra vez!!');
    }
  }

  async register(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    const user = await this.auth.register(this.credentials.value.email,this.credentials.value.password);
    await loading.dismiss();

    if(user){
      this.alertPresent('Usuario Creado!','Por favor presione "ok" parar continuar y rellene sus datos de su perfil a su conveniencia.');
      this.router.navigateByUrl('/home',{replaceUrl:true});
    }
    else{
      this.alertPresent('Registro Fallido','Por favor, intente otra vez!!');
    }
  }

  async addUsuario(){
    const alert = await this.alertCtrl.create({
      header:'Agregar Usuario',
      inputs: [
        {
          name:'nombre',
          type:'text',
          placeholder:'Nombre'
        },
        {
          name:'apellido',
          type:'text',
          placeholder:'Apellido'
        },
        {
          name:'genero',
          type:'text',
          placeholder:'Genero'
        },
        {
          name:'edad',
          type:'number',
          placeholder:'Edad'
        },
        {
          name:'email',
          type:'email',
          placeholder:'correo@correo.cl'
        },
        {
          name:'password',
          type:'password',
          placeholder:'Contraseña'
        },
      ],
      buttons: [
        {
          text:'Cancel',
          role:'cancel'
        },
        {
          text:'Save',
          role:'confirm',
          handler:(data) => {
            const user = this.auth.register(this.credentials.value.email,this.credentials.value.password);
            this.usuarioService.addUsuario(data);

            this.toastPresent('User added!!!');
          }
        }
      ]
    });
    alert.present();
  }

  async toastPresent(message:string){
    const toast = await this.toastCtrl.create({
      message:message,
      duration:1000
    });
    toast.present();
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
