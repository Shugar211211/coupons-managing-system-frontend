import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  url = ''

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToHomePage() {
    switch(localStorage.getItem('role')) {
      case 'ADMINISTRATOR': {
        this.url = 'admin/home'
        break
      }
      case 'COMPANY': {
        this.url = 'company/home'
        break
      }
      case 'CUSTOMER': {
        this.url = 'customer/home'
        break
      }
      default: {
        this.url = ''
        break
      }
    }
    this.router.navigate([this.url])
  }

}
