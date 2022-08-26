import { AlertService } from './../../../shared/services/alert.service';
import { CustomersService } from './../../../shared/services/customers.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/shared/interfaces/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {

  form: FormGroup

  constructor(
              private customersService: CustomersService,
              private router: Router,
              private alertService: AlertService
             ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    }) 
  }

  submit() {
    // if(this.form.valid) {
    //   //do something
    // }
    // console.log('Form: ', this.form)
    // const formData = {...this.form.value}
    // console.log('formData: ', formData)
    const newCustomer: Customer = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.customersService.add(newCustomer).subscribe( () => {
      // this.form.reset()
      this.alertService.success('Customer added')
      this.router.navigate(['/admin/customers'])
    }, (error) => {this.alertService.danger(error.error.message)}
    )
  }

  formReset() {
    this.form.reset()
  }
}
