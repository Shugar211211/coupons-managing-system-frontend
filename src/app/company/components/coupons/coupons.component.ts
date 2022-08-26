import { AlertService } from './../../../shared/services/alert.service';
import { Categories } from './../../../shared/interfaces/categories';
import { Coupon } from './../../../shared/interfaces/coupon';
import { Subscription } from 'rxjs';
import { CouponsService } from './../../../shared/services/coupons.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {

  loading = false
  categoriesObj: Categories
  categoriesList: string[] = []
  coupons: Coupon[] = []
  cSub: Subscription
  maxPrice = 0
  selectedCategory: Categories = null

  constructor(private couponsService: CouponsService,
              private alertService: AlertService
             ) { }

  ngOnInit(): void {
    this.loading = true
    this.cSub = this.couponsService.getCompanyCoupons().subscribe( coupons => { 
      this.coupons = coupons
      // console.log('Coupons in coupons component: ', coupons)
      this.loading = false
    }, error => { this.alertService.danger(error.error.message) }
    )

    this.couponsService.getCategoriesForCompany().subscribe(categoriesObj => { 
      this.categoriesObj = categoriesObj
      this.categoriesList = this.categoriesObj.categories
     }, error => { this.alertService.danger(error.error.message) }
     )
  }

  ngOnDestroy() {
    if(this.cSub) { this.cSub.unsubscribe() }
  }
}
