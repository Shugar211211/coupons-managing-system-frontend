import { FilterByMaxprice } from './../shared/pipes/filter-by-maxprice.pipe';
import { FilterByCategory } from './../shared/pipes/filter-by-category.pipe';
import { CompanyAuthGuard } from './services/company.auth.guard';
import { SharedModule } from './../shared/shared.module';
import { CompanyLayoutComponent } from './components/company-layout/company-layout.component';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from "@angular/core";
import { CouponsComponent } from './components/coupons/coupons.component';
import { CouponDetailsComponent } from './components/coupon-details/coupon-details.component';
import { CouponAddComponent } from './components/coupon-add/coupon-add.component';
import { CompanyHomeComponent } from './components/company-home/company-home.component';

@NgModule({
    declarations: [
        CompanyLayoutComponent,
        CouponsComponent, 
        CouponDetailsComponent, 
        CouponAddComponent, 
        CompanyHomeComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '', component: CompanyLayoutComponent, children: [
                    {path: '', redirectTo: '/', pathMatch: 'full'},
                    {path: 'home', component: CompanyHomeComponent, canActivate: [CompanyAuthGuard]},
                    {path: 'coupons', component: CouponsComponent, canActivate: [CompanyAuthGuard]},
                    {path: 'coupons/data/:id', component: CouponDetailsComponent, canActivate: [CompanyAuthGuard]},
                    {path: 'new', component: CouponAddComponent, canActivate: [CompanyAuthGuard]} 
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
        CompanyAuthGuard
    ]
})
export class CompanyModule{
}