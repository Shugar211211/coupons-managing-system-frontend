import { Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { Alert } from '../interfaces/alert';

@Injectable()
export class AlertService {
    public alert$ = new Subject<Alert>()

    success(text: string) {
        this.alert$.next({type: 'success', text})
    }

    warning(text: string) {
        this.alert$.next({type: 'warning', text})
    }

    danger(text: string) {
        this.alert$.next({type: 'danger', text})
    }
}