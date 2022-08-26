import { AlertService } from './../../../shared/services/alert.service';
import { Company } from './../../../shared/interfaces/company';
import { CompaniesService } from './../../../shared/services/companies.service';
import { Categories } from './../../../shared/interfaces/categories';
import { CustomDateValidator } from './../../../shared/validators/custom.date.validator';
import { FormControl, Validators } from '@angular/forms';
import { CouponsService } from './../../../shared/services/coupons.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Coupon } from './../../../shared/interfaces/coupon';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-coupon-details',
  templateUrl: './coupon-details.component.html',
  styleUrls: ['./coupon-details.component.scss']
})
export class CouponDetailsComponent implements OnInit {

  @Input()
  company: Company
  form: FormGroup
  coupon: Coupon
  categoriesObj: Categories
  categoriesList: string[] = []
  loading = false
  update = false
  submitting = false
  dSub: Subscription
  startDateValue = new Date(Date.now())
  endDateValue = new Date(Date.now())
  image = ''

  constructor(
              private route: ActivatedRoute,
              private router: Router,
              private couponsService: CouponsService,
              private companiesService: CompaniesService,
              private datePipe: DatePipe,
              private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loadCoupon()
  }

  ngOnDestroy() {
    if(this.dSub) {this.dSub.unsubscribe()}
  }

  delete() {
    this.dSub = this.couponsService.delete(this.coupon.id).subscribe( () => {
      this.alertService.success('Coupon deleted')
      this.router.navigate(['/company/coupons'])
    }, error => { this.alertService.danger(error.error.message) }
    )
  }

  loadCoupon() {
    this.loading=true

    this.couponsService.getCategoriesForCompany().subscribe(categoriesObj => { 
      this.categoriesObj = categoriesObj
      this.categoriesList = this.categoriesObj.categories
     }, error => { this.alertService.danger(error.error.message) }
     )

    // load this company details
    this.companiesService.getCompanyDetails(+localStorage.getItem('id')).subscribe((company) => {
      this.company=company
      }, error => { this.alertService.danger(error.error.message) }
      )

    this.route.params.subscribe( (params: Params) => {
      this.couponsService.getCompanyCouponById(params.id).subscribe( (coupon) => {
        this.coupon = coupon
        if(this.coupon != null) {
          this.image = this.coupon.image
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

    const updatedCoupon: Coupon = {
      id: this.coupon.id,
      company: this.company,
      category: this.form.value.category,
      title: this.form.value.title,
      description: this.form.value.description,
      startDate: this.form.value.startDate,
      endDate: this.form.value.endDate,
      amount: this.form.value.amount,
      price: this.form.value.price,
      image: this.form.value.image
    }
    if(!updatedCoupon.image) { updatedCoupon.image = 'assets/images/coupon-icon.png' }
    this.couponsService.update(updatedCoupon).subscribe( () => {
      this.update = false
      this.submitting = false
      this.alertService.success('Coupon updated')
      this.loadCoupon()
    }, error => { this.alertService.danger(error.error.message) }
    )
    // this.loadCoupon()
  }

  setUpdate() {
    this.update = true
    this.form = new FormGroup({
      category: new FormControl(this.coupon.category, [Validators.required]),
      title: new FormControl(this.coupon.title, [Validators.required, 
                                                 Validators.maxLength(255)]),
      description: new FormControl(this.coupon.description, [Validators.required, 
                                                             Validators.maxLength(4000)]),
      startDate: new FormControl(this.datePipe.transform(this.coupon.startDate, "yyyy-MM-dd"), [
                                                  Validators.required
                                                 ]),
      endDate: new FormControl(this.datePipe.transform(this.coupon.endDate, "yyyy-MM-dd"), [
                                                Validators.required, 
                                                CustomDateValidator.expiredDate, 
                                                // CustomDateValidator.stopDateBeforeStartDate(this.startDateValue)
                                               ]),
      amount: new FormControl(this.coupon.amount, [Validators.required]),
      price: new FormControl(this.coupon.price, [Validators.required]),
      image: new FormControl(this.image)
    })
  }

  onInputDate1(event) {
    this.startDateValue = event.target.value
    this.compareDates()
  }

  onInputDate2(event) {
    this.endDateValue = event.target.value
    this.compareDates()
  }

  compareDates() {
    if(this.endDateValue < this.startDateValue) {
      console.log('invalid dates!!!')
      this.form.controls['endDate'].setErrors({'endDateBeforeStartDate': true})
    }
  }

  preloadImage(event) {
    this.image = event.target.value
  }
}
