import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.scss']
})
export class CustomerLayoutComponent implements OnInit {

  public name: string

  constructor(private router: Router,
              private autheService: AuthService) { }

  ngOnInit(): void {
    this.name = sessionStorage.getItem('name')
  }

  logout(event: Event) {
    event.preventDefault();
    this.autheService.logout();
    this.router.navigate(['/']);
  }
}
