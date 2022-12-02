import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

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
    private router:Router
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
      this.router.navigateByUrl('/home',{replaceUrl:true});
    }
    else{
      this.alertPresent('Registro Fallido','Por favor, intente otra vez!!');
    }
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
