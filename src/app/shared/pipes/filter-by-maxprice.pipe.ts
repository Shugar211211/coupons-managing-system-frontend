import { Coupon } from '../interfaces/coupon';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterByMaxprice'
})
export class FilterByMaxprice implements PipeTransform {
    transform(coupons: Coupon[], maxprice: number): Coupon[] {
        if(!maxprice || maxprice==0) {
            return coupons
        }
        return coupons.filter( (coupon) => {
            return coupon.price < maxprice
        } )
    }
    
}