import { Company } from './company';
export interface Coupon {
    id?: number;
    company: Company;
    category: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    amount: number;
    price: number;
    image: string;
}