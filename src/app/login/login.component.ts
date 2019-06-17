import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
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
  error:'';
  constructor(private router: Router,private authService:AuthService,private http: HttpClient) {
          if(!this.authService.isLoggedIn()){
              this.router.navigate(['/']);
          }
   }

  ngOnInit() {
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  signIn(){
    if(this.userprofile.username && this.userprofile.password){
        this.authService.login(this.userprofile).pipe().subscribe(
          data => {
              this.router.navigate(['/']);
          },
          error => {
            console.error("Error", error);
              this.error = error;
              // this.loading = false;
          });;
    }else{

    }
  };

}

