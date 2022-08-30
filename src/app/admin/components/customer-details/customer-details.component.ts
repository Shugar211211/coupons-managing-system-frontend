import { AlertService } from './../../../shared/services/alert.service';
import { CustomersService } from './../../../shared/services/customers.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/shared/interfaces/customer';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  form: FormGroup
  customer: Customer
  loading = false
  update = false
  resetPassword = false;
  submitting = false
  dSub: Subscription

  constructor(
              private route: ActivatedRoute,
              private customersService: CustomersService,
              private router: Router,
              private alertService: AlertService
             ) { }

  ngOnInit(): void {
    this.loadCustomer()
  }

  ngOnDestroy() {
    if(this.dSub) {this.dSub.unsubscribe()}
  }

  delete() {
    this.dSub = this.customersService.delete(this.customer.id).subscribe( () => {
      this.alertService.success('Customer deleted')
      this.router.navigate(['/admin/customers'])
    }, error => { this.alertService.danger(error.error.message) })
  }

  loadCustomer() {
    this.loading=true
    this.route.params.subscribe( (params: Params) => {
      this.customersService.getById(params.id).subscribe( (customer) => {
        this.customer = customer
        if(this.customer != null) {
          this.loading=false
        }
        this.customer.password = '**********'
      }, error => { this.alertService.danger(error.error.message) })
    })
  }

  submit() {
    if(this.form.invalid) {
      return
    }

    this.submitting = true

    const updatedCustomer: Customer = {
      id: this.customer.id,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      // password: this.form.value.password
      // if password field value was changed, then save it, else set password value as null
      password: this.form.get('password').touched?this.form.value.password:null
    }

    this.customersService.update(updatedCustomer).subscribe( () => {
      this.update = false
      this.submitting = false
      this.alertService.success('Customer updated')
      this.loadCustomer()
    }, error => { this.alertService.danger(error.error.message) }
    )
  }

  setUpdate() {
    this.update = true
    this.form = new FormGroup({
      firstName: new FormControl(this.customer.firstName, [Validators.required]),
      lastName: new FormControl(this.customer.lastName, [Validators.required]),
      email: new FormControl(this.customer.email, [Validators.email, Validators.required]),
      password: new FormControl(this.customer.password, [Validators.required, Validators.minLength(3)])
    }) 
  }
}
