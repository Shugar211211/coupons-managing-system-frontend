import { AlertService } from './../../../shared/services/alert.service';
import { CompaniesService } from './../../../shared/services/companies.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Company } from 'src/app/shared/interfaces/company';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.scss']
})
export class CompanyAddComponent implements OnInit {

  form: FormGroup

  constructor(
              private companiesService: CompaniesService, 
              private router: Router,
              private alertService: AlertService
              ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    }) 
  }

  submit() {
    const newCompany: Company = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.companiesService.add(newCompany).subscribe( () => {
      this.alertService.success('Company added')
      this.router.navigate(['/admin/companies'])
    }, (error) => {this.alertService.danger(error.error.message)}
    )
  }

  formReset() {
    this.form.reset()
  }
}
