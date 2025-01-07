import { Component } from '@angular/core';
import { cart, logIn, product, signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss'],
})
export class UserAuthComponent {
  showLogin: boolean = true;
  constructor(private user: UserService, private product: ProductService) {}
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
    this.localCartToRemoteCart();
  }
  openSignup() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;
  }
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);

      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId: userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.log('item store');
            }
          });
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 1000);
      });
    }
    setTimeout(()=>{
      this.product.getCartList(userId);
    },2000)
    
  }
}
