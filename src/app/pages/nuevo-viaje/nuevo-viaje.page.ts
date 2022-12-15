import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nuevo-viaje',
  templateUrl: './nuevo-viaje.page.html',
  styleUrls: ['./nuevo-viaje.page.scss'],
})
export class NuevoViajePage implements OnInit {

  pageTitle = 'Nuevo Viaje';
  isNotHome = true;
  
  constructor() { }

  ngOnInit() {
  }

}
