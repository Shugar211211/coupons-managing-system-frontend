import { Categories } from '../interfaces/categories';
import { Coupon } from '../interfaces/coupon';
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filterByCategory'
})
export class FilterByCategory implements PipeTransform {
    transform(coupons: Coupon[], category: Categories): Coupon[] {
        if(!category) {
            return coupons
        }
        return coupons.filter( (coupon) => {
            return coupon.category.toString().toLowerCase().includes(category.toString().toLowerCase())
        } )
    }

}
