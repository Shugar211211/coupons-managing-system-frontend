import { AlertService } from './../../../shared/services/alert.service';
import { CustomersService } from './../../../shared/services/customers.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/shared/interfaces/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  loading = false
  customers: Customer[] = []
  cSub: Subscription
  searchStr=''

  constructor(
    public customersService: CustomersService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.loading = true
    this.cSub = this.customersService.getAll().subscribe( (customers) => {
      this.customers = customers
      this.loading = false
    }, error => { this.alertService.danger(error.error.message)} 
    )
  }

  ngOnDestroy() {
    if(this.cSub) { this.cSub.unsubscribe() }
  }
}
