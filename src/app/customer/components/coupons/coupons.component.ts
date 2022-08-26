import { AlertService } from './../../../shared/services/alert.service';
import { CouponsService } from './../../../shared/services/coupons.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Categories } from 'src/app/shared/interfaces/categories';
import { Coupon } from 'src/app/shared/interfaces/coupon';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {

  loading = false
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
    this.cSub = this.couponsService.getCustomerCoupons().subscribe( coupons => { 
      this.coupons = coupons
      this.loading = false
    }, error => { this.alertService.danger(error.error.message) })

    this.couponsService.getCategoriesForCustomer().subscribe(categoriesObj => { 
      this.categoriesObj = categoriesObj
      this.categoriesList = this.categoriesObj.categories
     }, error => { this.alertService.danger(error.error.message) })
  }

  // deteleCouponPurchase(coupon: Coupon) {
  //   // console.log('coupon', coupon)
  //   this.couponsService.deleteCouponPurchase(coupon).subscribe((coupon) => {
  //     console.log('Coupon purchase deleted: ', coupon)
  //   }, error => { this.alertService.danger(error.error.message) }
  //   )
  //   this.loadCoupons()
  // }
}
