import { AuthService } from './../../services/auth.service';
import { ClientType } from './../../client-type';
import { Client } from './../../interfaces/client';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup

  submitted = false

  client: String

  clientType: ClientType

  constructor(private route: ActivatedRoute,
              private router: Router,
              public authService: AuthService) { }

  ngOnInit(): void {

    this.route.params.subscribe( (params: Params) => {
      // console.log('Params', params)
      this.client = params.client
      if(this.client == 'admin') {
        this.clientType = ClientType.ADMINISTRATOR
      }
      else if(this.client == 'company') {
        this.clientType = ClientType.COMPANY
      }
      else{
        this.clientType = ClientType.CUSTOMER
      }
    })
    
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)])
    })
  }

  submit() {
    if(this.form.invalid) {
      this.submitted = false
      return
    }
    
    this.submitted = true

    const client: Client = {
      email: this.form.value.email,
      password: this.form.value.password,
      clientType: this.clientType
    }

    this.authService.login(client).subscribe( () => {
      this.form.reset()
      if(this.clientType == ClientType.ADMINISTRATOR) {
        this.router.navigate(['/admin', 'home'])
      }
      else if(this.clientType == ClientType.COMPANY) {
        this.router.navigate(['/company', 'home'])
      }
      else {
        this.router.navigate(['/customer', 'home'])
      }
    }, () => {this.submitted = false})
  }
}
