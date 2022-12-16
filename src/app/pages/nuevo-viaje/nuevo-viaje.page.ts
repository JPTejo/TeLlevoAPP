import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nuevo-viaje',
  templateUrl: './nuevo-viaje.page.html',
  styleUrls: ['./nuevo-viaje.page.scss'],
})
export class NuevoViajePage implements OnInit {

  @ViewChild('map')
  mapRef: ElementRef;
  newMap: GoogleMap;

  center: any = {
    lat: -33.435207,
    lng: -70.703599,
  }


  pageTitle = 'Nuevo Viaje';
  isNotHome = true;
  
  constructor() { }

  ngOnInit() {

  }

  ionViewDidEnter(){
    this.createMap();
  }

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'capacitor-google-maps',
      element: this.mapRef.nativeElement,
      apiKey: environment.google_maps_api_KEY,
      forceCreate: true,
      config: {
        center: this.center,
        zoom: 13,
      },
    });
    this.addMarkers();
  }

  async addMarkers(){
    const markers: Marker [] = [
      {
        coordinate: this.center,
        title: 'localhost',
        snippet: 'Best place on earth'
      },
      {
        coordinate: this.center,
        title: 'random place',
        snippet: 'not sure',
      },
    ];

    await this.newMap.addMarkers(markers);

    this.newMap.setOnMarkerClickListener(async (marker) => {
      console.log(marker);
    })
  }

}
