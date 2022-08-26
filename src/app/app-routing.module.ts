import { ErrorPageComponent } from './shared/components/error-page/error-page.component';
import { HomepageComponent } from './shared/components/homepage/homepage.component';
import { LoginComponent } from './shared/components/login/login.component';
import { EntryComponent } from './shared/components/entry/entry.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
// import { AdminAuthGuard } from './admin/services/admin.auth.guard';

const routes: Routes = [
  {path: '', component: HomepageComponent, children: [
    // {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: EntryComponent},
    {path: 'login/:client', component: LoginComponent}
  ]},
  {
    path: 'admin', loadChildren: () => import('src/app/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'company', loadChildren: () => import('src/app/company/company.module').then(m => m.CompanyModule)
  },
  {
    path: 'customer', loadChildren: () => import('src/app/customer/customer.module').then(m => m.CustomerModule)
  },
  {path: 'error', component: ErrorPageComponent},
  {path: '**', redirectTo: '/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    useHash: true
  }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
