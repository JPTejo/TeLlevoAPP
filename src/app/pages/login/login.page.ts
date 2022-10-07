import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  pageTitle = 'Login';
  isNotHome = true;

  formularioLogin: FormGroup;

  listaUsuarios : any = [
    {
      user: 'ADMIN',
      password: 'ADMIN',
    },
    {
      user: 'USER',
      password: 'USER',
    },
  ];

  jsonobjs : JSON;

  constructor(private formBuilder: FormBuilder,
    private alertController: AlertController,
    private navController: NavController) { 

    this.formularioLogin = this.formBuilder.group({
      'user': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });

  }

  ngOnInit() {
  }

   async login() {

    var ingreso = this.formularioLogin.value;
    var validado = false;
    
    this.listaUsuarios.forEach(element => {
      if (element.user == ingreso.user && element.password == ingreso.password){
        validado = true;
        console.log('Validado');
      };
    });

    if (validado) {
      console.log('Ingresado');
      localStorage.setItem('ingresado', 'true');
      localStorage.setItem('ingreso', ingreso.user);
      this.navController.navigateRoot('home');
    }
    else{
      const alert = await this.alertController.create({
        header: 'Datos Incorrectos',
        message: 'Los datos que ingresaste son incorrectos',
        buttons: ['Aceptar']
      });

      await alert.present();
    }

  }

}
