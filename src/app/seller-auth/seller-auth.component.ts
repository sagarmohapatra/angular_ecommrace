import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SellService } from '../services/sell.service';
import { Router } from '@angular/router';
import { signUp } from '../data-type';
import { logIn } from '../data-type';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss'],
})
export class SellerAuthComponent {
  showLogin: boolean = false;
  authError:string=""
  constructor(private seller: SellService, private router: Router) {}
  ngOnInit() {
    this.seller.reloadSeller();
  }
  signUp(data: signUp) {
    // console.log(data);
    this.seller.userSignUp(data);
    // .subscribe((result) => {
    //   // console.log(result);
    //   if (result) {
    //     this.router.navigate(['seller-home']);
    //   }
    // });
  }
  login(data: logIn) { 
    this.authError=""
    console.log(data);
    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
         this.authError="Email or password is not correct"
      }
    })
  }
  openLogin() {
    this.showLogin = true;
  }
  openSignup() {
    this.showLogin = false;
  }
}
