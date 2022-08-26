import { CompaniesService } from './../../../shared/services/companies.service';
import { Company } from './../../../shared/interfaces/company';
import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-layout',
  templateUrl: './company-layout.component.html',
  styleUrls: ['./company-layout.component.scss']
})
export class CompanyLayoutComponent implements OnInit {

  public name: string
  // private company: Company

  constructor(private router: Router,
              private authService: AuthService,
              private companiesService: CompaniesService) { }

  ngOnInit(): void {
    this.name=sessionStorage.getItem('name')
    // this.companiesService.getCompanyDetails(+localStorage.getItem('id')).subscribe(company => this.company=company)
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
