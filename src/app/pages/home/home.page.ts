import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pageTitle = 'TeLlevo';
  isNotHome = false;

  constructor() {}


  ngOnInit() {
  }

}
