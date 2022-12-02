import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

const API_URL = environment.currencyData_URL;
const API_KEY = environment.currencyData_KEY;

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.page.html',
  styleUrls: ['./conversor.page.scss'],
})

export class ConversorPage implements OnInit {

  pageTitle = 'Conversor';
  isNotHome = true;

  currencyList : any;

  result : any;

  inputValue : any;

  currentCurrencyIn : any;
  currentCurrencyOut : any;


  constructor(public httpClient:HttpClient) { 
    this.getList();
    //this.transform();
    // console.log(Object.keys(Object.values(this.currencyList)[0]['currencies']));
    // console.log((Object.values(this.currencyList)[0]['currencies']));
    // this.currencyList = (Object.values(this.currencyList)[0]['currencies']);
    // console.log((this.result[0])['result']);
    // this.result = (this.result[0])['result'];
    //this.currencyList = (Object.keys(Object.values(this.currencyList)[0]['currencies']))
  }

  ngOnInit(
  ) {
    
  }

  transform(){
    this.currencyList = Object.keys(this.currencyList['currencies']);
  }

  getList(){
    this.httpClient.get(`${API_URL}/list?apikey=${API_KEY}`).subscribe(results => {
      console.log('Test');
      console.log(Object.keys(results['currencies']));
      this.currencyList = results['currencies'];
      console.log(this.currencyList);
    })
  }

  convertCurrency() {
    this.httpClient.get(`${API_URL}/convert?to=${this.currentCurrencyOut}&from=${this.currentCurrencyIn}&amount=${this.inputValue}&apikey=${API_KEY}`).subscribe( results => {
      console.log(results['result']);
      this.result = results['result']
    })

  }

  inCurrency(ev) {
    this.currentCurrencyIn = ev.target.value;
  }

  outCurrency(ev) {
    this.currentCurrencyOut = ev.target.value;
    this.convertCurrency();
  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

}
