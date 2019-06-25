import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({"Content-Type":"application/json"})
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userprofile = {username: '',password:''};
  userform: FormGroup;
  loginError:'';
  constructor(private fb: FormBuilder,private router: Router,private authService:AuthService,private http: HttpClient) {
          if(!this.authService.isLoggedIn()){
              this.router.navigate(['/']);
          }
   }

  ngOnInit() {
    this.userform = this.fb.group({
      'username': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
  });
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  signIn(){
    if(this.userprofile.username && this.userprofile.password){
        this.authService.login(this.userprofile).pipe().subscribe(
          data => {
            if(data.error){
              this.loginError = data.error.errorMessage;
            }
             else{
              this.router.navigate(['/']);
             }
          },
          error => {
            console.error("Error", error);
              // this.loading = false;
          });
    }else{

    }
  };

}

