import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

    //Close the modal
    ionViewDidEnter(){
      setTimeout(() => {
        this.modalController.dismiss();
      }, 2000);
    }

}
