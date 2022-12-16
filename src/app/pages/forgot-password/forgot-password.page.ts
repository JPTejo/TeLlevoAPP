import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  isLoading = false;

  constructor(
    private navCtrl: NavController,
    private auth: AuthService, 
    private global: GlobalService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if(!form.valid) return;
    this.isLoading = true;
    this.auth.resetPassword(form.value.email).then(() => {     
      this.global.successToast('Se envio un Link a su correo para reestablecer la contraseña');
      this.isLoading = false;
      this.navCtrl.back();
    })
    .catch(e => {
      console.log(e);   
      this.isLoading = false;
      this.global.showAlert('Ups! Hubo un error');
    });
  }

}
