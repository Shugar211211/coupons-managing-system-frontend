import { AlertService } from './services/alert.service';
import { FilterByMaxprice } from './pipes/filter-by-maxprice.pipe';
import { FilterByCategory } from './pipes/filter-by-category.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, Provider } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule, DatePipe, registerLocaleData } from "@angular/common";
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { AlertComponent } from './components/alert/alert.component';
import { AuthInterceptor } from './auth.interceptor';
// import  enIlLocale from "@angular/common/locales/en-IL";

// registerLocaleData(enIlLocale, 'il')

const INTERCEPTOR_PROVIDER: Provider = {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: AuthInterceptor
  }

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    exports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        FilterByCategory,
        FilterByMaxprice,
        AlertComponent
    ],
    declarations: [
        FilterByCategory,
        FilterByMaxprice,
        ErrorPageComponent,
        AlertComponent
    ],
    providers: [
        DatePipe,
        AlertService,
        INTERCEPTOR_PROVIDER
    ]
})
export class SharedModule {

}