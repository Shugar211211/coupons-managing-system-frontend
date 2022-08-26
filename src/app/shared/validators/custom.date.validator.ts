import { formatDate } from "@angular/common";
import { FormControl } from "@angular/forms";

export class CustomDateValidator {

    static expiredDate(control: FormControl): {[key: string]: boolean} {

        // let dateToday = formatDate(new Date().setDate(new Date().getDate()-1), 'yyyy-MM-dd', 'en_US')
        let dateToday = formatDate(new Date(), 'yyyy-MM-dd', 'en_US')
        // dateToday.setDate(dateToday.getDate()-1)
        let controlDate = formatDate(control.value, 'yyyy-MM-dd', 'en_US') 
        if(controlDate < dateToday) {
            return { 'datePassed': true }
        }
        return null
    }

    // https://www.youtube.com/watch?v=2PfMVL0OIGg
    static stopDateBeforeStartDate(date1: Date) {
        return (control: FormControl): {[key: string]: boolean} => {
            const stopDate = formatDate(control.value, 'yyyy-MM-dd', 'en_US')
            const startDate = formatDate(date1, 'yyyy-MM-dd', 'en_US')
            if(startDate > stopDate) {
                return { 'stopDateBeforeStartDate': true }
            }
            return null
        }
    }
}