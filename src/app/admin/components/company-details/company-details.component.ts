import { AlertService } from './../../../shared/services/alert.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from './../../../shared/interfaces/company';
import { CompaniesService } from './../../../shared/services/companies.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  form: FormGroup
  company: Company
  loading = false
  update = false
  submitting = false
  dSub: Subscription

  constructor(
              private route: ActivatedRoute,
              private companiesService: CompaniesService,
              private router: Router,
              private alertService: AlertService
              ) { }

  ngOnInit() {
    this.loadCompany()
  }

  ngOnDestroy() {
    if(this.dSub) {this.dSub.unsubscribe()}
  }

  delete() {
    this.dSub = this.companiesService.delete(this.company.id).subscribe( () => {
      this.alertService.success('Company deleted')
      this.router.navigate(['/admin/companies'])
    }, error => { this.alertService.danger(error.error.message) }
    )
  }

  loadCompany() {
    this.loading=true
    this.route.params.subscribe( (params: Params) => {
      this.companiesService.getById(params.id).subscribe( (company) => {
        this.company = company
        if(this.company != null) {
          this.loading=false
        }
      }, error => { this.alertService.danger(error.error.message) }
      )
    })
  }

  submit() {
    if(this.form.invalid) {
      return
    }

    this.submitting = true

    // const company = {...this.form.value}
    const updatedCompany: Company = {
      id: this.company.id,
      name: this.company.name,
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.companiesService.update(updatedCompany).subscribe( () => {
      this.update = false
      this.submitting = false
      this.alertService.success('Company updated')
      this.loadCompany()
    }, error => { this.alertService.danger(error.error.message) }
    )
  }

  setUpdate() {
    this.update = true
    this.form = new FormGroup({
      email: new FormControl(this.company.email, [Validators.email, Validators.required]),
      password: new FormControl(this.company.password, [Validators.required, Validators.minLength(3)])
    }) 
  }
}