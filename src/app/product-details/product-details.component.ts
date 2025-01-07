import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  productQuantity: number = 1;
  productData: undefined | product;
  removeCart = false;
  constructor(
    private activeRoute: ActivatedRoute, // to use a param we have use activatedRoute
    private product: ProductService
  ) {}
  ngOnInit() {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.log('new_year', productId);
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        // console.log(result);
        this.productData = result;
        console.log(this.productData);
        let cartData = localStorage.getItem('localCart');
        // console.log(cartData);

        if (productId && cartData) {
          console.log(productId);
          // console.log(cartData);

          let items = JSON.parse(cartData);
          // console.log(items);

          items = items.filter(
            (item: product) => productId === item.id.toString()
          );
          // console.log('fghj', items.length);

          if (items.length > 0) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }
        let user = localStorage.getItem('user');
        if (user) {
          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);
          this.product.cardData.subscribe(() => {
            let item = result.filter((item: product) => {
              productId!.toString() === item.productId?.toString();
            });
            // if ( item.length) {
            //   this.removeCart = true;
            // }
          });
        }
      });
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      // this.productQuantity+=1
      this.productQuantity = this.productQuantity + 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }
  AddToCard() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      // console.log(this.productData);
      // console.log(this.productQuantity);

      if (!localStorage.getItem('user')) {
        this.product.localAddToCard(this.productData);
        this.removeCart = true;
      } else {
        console.log('else');
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        // console.log(userId);
        let cartData: cart = {
          ...this.productData,
          userId: userId,
          productId: this.productData.id,
        };
        delete cartData.id;
        console.log(cartData);
        this.product.addToCart(cartData).subscribe((result) => {
          console.log(result);
          this.product.getCartList(userId);
          this.removeCart = true;
        });
      }
    }
  }
  removeToCart(productId: number) {
    this.product.removeItemFromCart(productId);
    this.removeCart = false;
  }
}
