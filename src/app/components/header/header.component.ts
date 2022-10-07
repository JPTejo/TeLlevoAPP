import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() pageTitle : string;
  @Input() isNotHome : boolean;

  constructor(private route: Router) { }

  ngOnInit() {}

  userMenu() {
    this.route.navigate(['/user-menu']);
  }

}
