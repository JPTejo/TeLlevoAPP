import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Buscar Viaje', url: '/home', icon: 'paper-plane'},
    { title: 'Mis Viajes', url: '/mis-viajes', icon: 'archive' },
    { title: 'Favoritos', url: '/favoritos', icon: 'heart' },
    { title: 'Amigos', url: '/amigos', icon: 'warning' },
    { title: 'Contacto', url: '/contacto', icon: 'mail' },
  ];
  /** public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders']; **/
  constructor() {}
}
