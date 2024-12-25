import { Component } from '@angular/core';
import { logIn, signUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss'],
})
export class UserAuthComponent {
  showLogin: boolean = true;
  constructor(private user: UserService) {}
  signUp(data: signUp) {
    // console.log(data);
    this.user.userSignUp(data);
  }
  ngOnInit() {
    this.user.userAuthReload();
  }
  logIn(data: logIn) {
    console.log(data);
    this.user.userLogin(data);
  }
  openSignup() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;
  }
}
