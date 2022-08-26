import { Company } from './../../shared/interfaces/company';
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'findCompanyByName'})
export class FindCompanyByName implements PipeTransform {

    transform(companies: Company[], search = ''): Company[] {
        if( ! search.trim()) {
            return companies
        }
        
        return companies.filter( (company) => { return company.name.toLowerCase().includes(search.toLowerCase())} )
    }
}