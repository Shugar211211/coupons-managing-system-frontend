import { FindCustomerByName } from './pipes/find-customer-by-name.pipe';
import { FindCompanyByName } from './pipes/find-company-by-name.pipe';
import { SharedModule } from './../shared/shared.module';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CompaniesComponent } from './components/companies/companies.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CompanyAddComponent } from './components/company-add/company-add.component';
import { CustomerAddComponent } from './components/customer-add/customer-add.component';
import { AdminAuthGuard } from './services/admin.auth.guard';

@NgModule({
    declarations: [
        AdminLayoutComponent,
        AdminHomeComponent,
        CompaniesComponent,
        CustomersComponent,
        CompanyDetailsComponent,
        CustomerDetailsComponent,
        CompanyAddComponent,
        CustomerAddComponent,
        FindCompanyByName,
        FindCustomerByName
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '', component: AdminLayoutComponent, children: [
                    {path: '', redirectTo: '/', pathMatch: 'full'},
                    {path: 'home', component: AdminHomeComponent, canActivate: [AdminAuthGuard]},
                    {path: 'companies', component: CompaniesComponent, canActivate: [AdminAuthGuard]},
                    {path: 'customers', component: CustomersComponent, canActivate: [AdminAuthGuard]},
                    {path: 'companies/data/:id', component: CompanyDetailsComponent, canActivate: [AdminAuthGuard]},
                    {path: 'customers/data/:id', component: CustomerDetailsComponent, canActivate: [AdminAuthGuard]},
                    {path: 'companies/new', component: CompanyAddComponent, canActivate: [AdminAuthGuard]},
                    {path: 'customers/new', component: CustomerAddComponent, canActivate: [AdminAuthGuard]}
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AdminAuthGuard,
    ]
})
export class AdminModule {
}