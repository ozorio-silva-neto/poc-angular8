import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthenticationService } from '../_services/AuthenticationService';
import { MyserviceService} from '../myservice.service';
import { User } from '../_models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {
  loading: boolean;
  registerForm: FormGroup;
  submitted = false;
  todaydate: any;
  constructor(private formBuilder: FormBuilder, private myservice: MyserviceService, private auth: AuthenticationService) {}

  ngOnInit() {
    this.todaydate = this.myservice.todayDate();
    // tslint:disable-next-line:no-unused-expression
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
      // confirmPassword: ['', Validators.required]
    }, {
      // validator: MustMatch('password', 'confirmPassword')
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onFormSubmit() {
    this.submitted = true;
    this.loading = true;

    console.log('submited');
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log('invalid form');
      return;
    }
    console.log('init service auth');
    console.log('username', this.registerForm.value.username);
    console.log('password', this.registerForm.value.password);

    this.auth.login(this.registerForm.value.username,  this.registerForm.value.password)
        .subscribe(
            data => {
              // this.router.navigate(['/']);
              console.log('success login');
            },
            error => {
              console.log('erro login');
              // this.toastr.error(error.error.message, 'Error');
              this.loading = false;
            });
  }


}
