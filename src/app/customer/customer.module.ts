import { CustomerAuthGuard } from './services/customer.auth.guard';
import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { CustomerLayoutComponent } from './components/customer-layout/customer-layout.component';
import { CouponsComponent } from './components/coupons/coupons.component';
import { CouponDetailsComponent } from './components/coupon-details/coupon-details.component';
import { CouponPurchaseComponent } from './components/coupon-purchase/coupon-purchase.component';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';

@NgModule({
    declarations: [
        CustomerLayoutComponent, 
        CouponsComponent, 
        CouponDetailsComponent, 
        CouponPurchaseComponent, 
        CustomerHomeComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '', component: CustomerLayoutComponent, children: [
                    {path: '', redirectTo: '/', pathMatch: 'full'},
                    {path: 'home', component: CustomerHomeComponent, canActivate: [CustomerAuthGuard]},
                    {path: 'coupons', component: CouponsComponent, canActivate: [CustomerAuthGuard]},
                    {path: 'coupons/data/:id', component: CouponDetailsComponent, canActivate: [CustomerAuthGuard]},
                    {path: 'purchase', component: CouponPurchaseComponent, canActivate: [CustomerAuthGuard]}
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
        CustomerAuthGuard
    ]
})
export class CustomerModule {
}