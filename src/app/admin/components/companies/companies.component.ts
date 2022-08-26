import { AlertService } from './../../../shared/services/alert.service';
import { Company } from './../../../shared/interfaces/company';
import { CompaniesService } from '../../../shared/services/companies.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit, OnDestroy {

  loading = false
  companies: Company[] = []
  cSub: Subscription
  searchStr=''

  constructor(public companiesService: CompaniesService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.loading = true
    this.cSub = this.companiesService.getAll().subscribe( companies => { 
      this.companies = companies
      this.loading = false
    }, error => { this.alertService.danger(error.error.message) }
    )
  }

  ngOnDestroy() {
    if(this.cSub) { this.cSub.unsubscribe() }
  }
}
