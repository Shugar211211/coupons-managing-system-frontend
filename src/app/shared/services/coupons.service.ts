import { Categories } from './../interfaces/categories';
import { Coupon } from './../interfaces/coupon';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CouponsService {

    constructor(private http: HttpClient) {}

    add(coupon: Coupon): Observable<Coupon> {
        return this.http.post<Coupon>(`${environment.apiUrl}/api/company/coupons`, coupon)
    }

    delete(id: number): Observable<string> {
        return this.http.delete<string>(`${environment.apiUrl}/api/company/coupons/${id}`)
    }

    deleteCouponPurchase(coupon: Coupon) {
        return this.http.put(`${environment.apiUrl}/api/customer/coupons`, coupon)
    }

    getAwailableCoupons(id: number) {
        return this.http.get<Coupon[]>(`${environment.apiUrl}/api/customer/coupons/awailable`)
    }

    getCompanyCoupons(): Observable<Coupon[]> {
        return this.http.get<Coupon[]>(`${environment.apiUrl}/api/company/coupons`)
    }

    getCategoriesForCompany(): Observable<Categories> {
        return this.http.get<Categories>(`${environment.apiUrl}/api/company/categories`)
    }

    getCategoriesForCustomer(): Observable<Categories> {
        return this.http.get<Categories>(`${environment.apiUrl}/api/customer/categories`)
    }

    getCompanyCouponById(id: number): Observable<Coupon> 
    {
        return this.http.get<Coupon>(`${environment.apiUrl}/api/company/coupons/${id}`)
    }

    getCustomerCoupons(): Observable<Coupon[]> {
        return this.http.get<Coupon[]>(`${environment.apiUrl}/api/customer/coupons`)
    }

    getCustomerCouponById(id: number): Observable<Coupon> 
    {
        return this.http.get<Coupon>(`${environment.apiUrl}/api/customer/coupons/${id}`)
    }

    purchaseCoupon(coupon: Coupon): Observable<Coupon> {
        return this.http.put<Coupon>(`${environment.apiUrl}/api/customer/coupons/awailable`, coupon)
    }

    update(coupon: Coupon): Observable<Coupon> {
        return this.http.put<Coupon>(`${environment.apiUrl}/api/company/coupons`, coupon)
    }
}