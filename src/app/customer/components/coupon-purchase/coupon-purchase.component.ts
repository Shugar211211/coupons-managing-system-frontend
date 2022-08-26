import { AlertService } from './../../../shared/services/alert.service';
import { CustomersService } from './../../../shared/services/customers.service';
import { Categories } from './../../../shared/interfaces/categories';
import { Subscription } from 'rxjs';
import { CouponsService } from './../../../shared/services/coupons.service';
import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/shared/interfaces/coupon';

@Component({
  selector: 'app-coupon-purchase',
  templateUrl: './coupon-purchase.component.html',
  styleUrls: ['./coupon-purchase.component.scss']
})
export class CouponPurchaseComponent implements OnInit {

  loading = false
  purchasing = false
  cSub: Subscription
  coupons: Coupon[] = []
  maxPrice = 0
  selectedCategory: Categories = null
  categoriesObj: Categories
  categoriesList: string[] = []

  constructor(
              private couponsService: CouponsService,
              private alertService: AlertService
             ) { }

  ngOnInit(): void {
    this.loadCoupons()
  }

  ngOnDestroy() {
    if(this.cSub) { this.cSub.unsubscribe() }
  }

  loadCoupons() {
    this.loading = true
    this.cSub = this.couponsService.getAwailableCoupons(+localStorage.getItem('id')).subscribe( coupons => { 
      this.coupons = coupons
      // console.log('Coupons in coupons component: ', coupons)
      this.loading = false
    }, error => { this.alertService.danger(error.error.message) }
    )

    this.couponsService.getCategoriesForCustomer().subscribe(categoriesObj => { 
      this.categoriesObj = categoriesObj
      this.categoriesList = this.categoriesObj.categories
     }, error => { this.alertService.danger(error.error.message) }
     )
  }

  purchase(coupon: Coupon) {
    // console.log('coupon', coupon)
    this.purchasing = true
    this.couponsService.purchaseCoupon(coupon).subscribe((coupon) => {
      this.alertService.success('Coupon purchased')
      this.loadCoupons()
      this.purchasing = false
      // console.log('Coupon purchased: ', coupon)
    }, error => { this.alertService.danger(error.error.message) }
    )
  }
}
