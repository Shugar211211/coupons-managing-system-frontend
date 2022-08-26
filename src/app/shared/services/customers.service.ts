import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Customer } from '../interfaces/customer';

@Injectable({providedIn: 'root'})
export class CustomersService {

    constructor(private http: HttpClient) {}

    add(customer: Customer): Observable<Customer> {
        return this.http.post<Customer>(`${environment.apiUrl}/api/admin/customers`, customer)
    }

    delete(id: number): Observable<string> {
        return this.http.delete<string>(`${environment.apiUrl}/api/admin/customers/${id}`)
    }

    getAll(): Observable<Customer[]> {
        return this.http.get<Customer[]>(`${environment.apiUrl}/api/admin/customers`)
    }

    getById(id: number): Observable<Customer> {
        return this.http.get<Customer>(`${environment.apiUrl}/api/admin/customers/${id}`)
    }

    update(customer: Customer): Observable<Customer> {
        return this.http.put<Customer>(`${environment.apiUrl}/api/admin/customers`, customer)
    }
}