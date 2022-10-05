import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-viajes',
  templateUrl: './mis-viajes.page.html',
  styleUrls: ['./mis-viajes.page.scss'],
})
export class MisViajesPage implements OnInit {

  pageTitle = 'Mis Viajes';
  isNotHome = true;

  constructor() { }

  ngOnInit() {
  }

}
