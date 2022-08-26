import { AlertService } from './../../../shared/services/alert.service';
import { Company } from './../../../shared/interfaces/company';
import { CompaniesService } from './../../../shared/services/companies.service';
import { CouponsService } from './../../../shared/services/coupons.service';
import { Categories } from './../../../shared/interfaces/categories';
import { Coupon } from './../../../shared/interfaces/coupon';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CustomDateValidator } from 'src/app/shared/validators/custom.date.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coupon-add',
  templateUrl: './coupon-add.component.html',
  styleUrls: ['./coupon-add.component.scss']
})
export class CouponAddComponent implements OnInit {

  form: FormGroup

  loading = false
  categoriesObj: Categories
  categoriesList: string[] = []
  dateToday = new Date(Date.now())
  startDateValue = new Date(Date.now())
  endDateValue = new Date(Date.now())
  company: Company
  setAttributeToDate1 = false
  setAttributeToDate2 = false

  constructor(
              private couponsService: CouponsService,
              private companiesService: CompaniesService,
              private router: Router,
              private alertService: AlertService
             ) { }

  ngOnInit(): void {
    this.loading = true
    this.couponsService.getCategoriesForCompany().subscribe(categoriesObj => { 
                                                                    this.categoriesObj = categoriesObj
                                                                    this.categoriesList = this.categoriesObj.categories
                                                                   })
    this.companiesService.getCompanyDetails(+localStorage.getItem('id')).subscribe( (company) => {
                                                                                        this.company = company
                                                                                        this.loading = false
                                                                                       })
    this.form = new FormGroup({
      category: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required, 
                                  Validators.maxLength(255)]),
      description: new FormControl('', [Validators.required, 
                                        Validators.maxLength(4000)]),
      startDate: new FormControl(this.dateToday, [
                                                  Validators.required, 
                                                  CustomDateValidator.expiredDate
                                                 ]),
      endDate: new FormControl(this.dateToday, [
                                                Validators.required, 
                                                CustomDateValidator.expiredDate, 
                                                // CustomDateValidator.stopDateBeforeStartDate(this.startDateValue)
                                               ]),
      amount: new FormControl(1, [Validators.required]),
      price: new FormControl('', [Validators.required]),
      image: new FormControl('')
    }) 
  }
  submit() {
    // if(this.form.valid) {
    //   //do something
    // }
    // const formData = {...this.form.value}
    const newCoupon: Coupon = {
      // companyId: +localStorage.getItem('id'),
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
    if(!newCoupon.image) { newCoupon.image = 'assets/images/coupon-icon.png' }
    this.couponsService.add(newCoupon).subscribe( () => {
      this.alertService.success('Coupon added')
      this.router.navigate(['/company/coupons'])
    }, (error) => {this.alertService.danger(error.error.message)} )
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

  formReset() {
    this.form.reset()
  }
}
