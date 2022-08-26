import { ClientType } from './../../client-type';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  message: string

  constructor(
              private router: Router, 
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit(): void {
    
    if(this.authService.isAuthenticated()) {
      switch(this.authService.getClientRole()) {
        case ClientType.ADMINISTRATOR: {
          this.router.navigate(['/admin', 'home'])
          break;
        }
        case ClientType.COMPANY: {
          this.router.navigate(['/company', 'home'])
          break;
        }
        case ClientType.CUSTOMER: {
          this.router.navigate(['/customer', 'home'])
          break;
        }
        default: {
          // this.router.navigate(['/error']) 
          break; 
       } 
      }
         
    }

    this.route.queryParams.subscribe( (params: Params) => { 
      if(params['authStatus']) {
        this.message = 'Please log in'
      }
      else if(params['authFailed']) {
        this.message = 'Session is expired. Please log in.'
      }
    })
  }
}
