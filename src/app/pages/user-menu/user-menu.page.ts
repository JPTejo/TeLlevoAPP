import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.page.html',
  styleUrls: ['./user-menu.page.scss'],
})
export class UserMenuPage implements OnInit {

  pageTitle = localStorage.getItem('ingreso');
  isNotHome = true;

  constructor(private navController:NavController) { }

  ngOnInit() {
  }

  logOut() {
    localStorage.removeItem('ingresado')
    localStorage.removeItem('ingreso')
    this.navController.navigateRoot('login')
  }

}
