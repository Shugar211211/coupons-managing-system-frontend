import { AlertService } from './../../../shared/services/alert.service';
import { CouponsService } from './../../../shared/services/coupons.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Coupon } from 'src/app/shared/interfaces/coupon';

@Component({
  selector: 'app-coupon-details',
  templateUrl: './coupon-details.component.html',
  styleUrls: ['./coupon-details.component.scss']
})
export class CouponDetailsComponent implements OnInit {

  loading = false
  dSub: Subscription
  coupon: Coupon

  constructor(
              private couponsService: CouponsService,
              private router: Router,
              private route: ActivatedRoute,
              private alertService: AlertService
             ) { }

  ngOnInit(): void {
    this.loadCoupon()
  }

  ngOnDestroy() {
    if(this.dSub) {this.dSub.unsubscribe()}
  }

  deleteCouponPurchase() {
    this.dSub = this.couponsService.deleteCouponPurchase(this.coupon).subscribe( () => {
      this.alertService.success('Coupon purchase deleted')
      this.router.navigate(['/customer/coupons'])
    }, error => { this.alertService.danger(error.error.message) }
    )
  }

  loadCoupon() {
    this.loading=true
    this.route.params.subscribe( (params: Params) => {
      this.couponsService.getCustomerCouponById(params.id).subscribe( (coupon) => {
        this.coupon = coupon
        if(this.coupon != null) {
          this.loading=false
        }
      }, error => { this.alertService.danger(error.error.message) }
      )
    })
  }
}
