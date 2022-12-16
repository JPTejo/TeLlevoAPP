import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmailComposer, EmailComposerOptions } from '@awesome-cordova-plugins/email-composer/ngx';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {

  hasAccount:any;
  
  pageTitle = 'contacto';
  isNotHome = true;
  priority: any;
  formData: FormGroup<{ title: FormControl<any>; }>;
  route: any;

  constructor(private emailComposer: EmailComposer) { }

  async checkAccount () {
    this.hasAccount = await this.emailComposer.hasAccount();
  }

  async openEmail() {
    const email: EmailComposerOptions = {
      to: 'be.zunigan@duocuc.cl',
      cc: 'be.zunigan@duocuc.cl',
      body: '',
    };

    await this.emailComposer.open(email);
  }

  ngOnInit() {
    this.priority = this.route.snapshot.paramMap.get('priority');

    this.formData = new FormGroup ({
      title: new FormControl()
    });
  }

  onSubmit() { //falta hacer que el onSubmit button haga que envie el mensaje al email, he intentado varias cosas y no resultan, ni idea que hacer
    console.log(this.formData.value)
    //send "mensaje" to openEmail, lo ultimo que se me ocurrio
  }

}
