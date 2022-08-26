import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private router: Router, 
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit(): void {

    // this.route.queryParams.subscribe( (params: Params) => {
    //   if(params['path']) {
    //     const path = params['path']
    //     console.log('path: ', path)
    //     // this.router.navigate([path])
    //   }
    //   else {
        
    //   }
    // })

    // console.log('redirecting to home')
    this.router.navigate(['/home'])

    // if(!this.authService.isAuthenticated()) {
    //   console.log('redirecting to home')
    //   this.router.navigate(['/home'])
    // }
    // else {
    //   console.log('redirecting to login')
    //   this.router.navigate(['/login/',this.authService.getClientRole])
    // }

    

    
  }

}
