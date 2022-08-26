// import { Company } from './../../shared/interfaces/company';
import { Pipe, PipeTransform } from "@angular/core";
import { Customer } from "src/app/shared/interfaces/customer";

@Pipe({name: 'findCustomerByName'})
export class FindCustomerByName implements PipeTransform {

    transform(customers: Customer[], search = ''): Customer[] {
        if( ! search.trim()) {
            return customers
        }
        
        return customers.filter( (customer) => { return customer.firstName.toLowerCase().includes(search.toLowerCase())} )
    }
}