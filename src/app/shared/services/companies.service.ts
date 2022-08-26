import { environment } from './../../../environments/environment';
import { Company } from './../interfaces/company';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CompaniesService {

    constructor(private http: HttpClient) {}

    add(company: Company): Observable<Company> {
        return this.http.post<Company>(`${environment.apiUrl}/api/admin/companies`, company)
    }

    delete(id: number): Observable<string> {
        return this.http.delete<string>(`${environment.apiUrl}/api/admin/companies/${id}`)
    }

    getAll(): Observable<Company[]> {
        return this.http.get<Company[]>(`${environment.apiUrl}/api/admin/companies`)
    }

    getById(id: number): Observable<Company> {
        return this.http.get<Company>(`${environment.apiUrl}/api/admin/companies/${id}`)
    }

    getCompanyDetails(id: number): Observable<Company> {
        return this.http.get<Company>(`${environment.apiUrl}/api/company/details`)
    }

    update(company: Company): Observable<Company> {
        return this.http.put<Company>(`${environment.apiUrl}/api/admin/companies`, company)
    }
}