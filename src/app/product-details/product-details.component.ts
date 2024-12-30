import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  productQuantity: number = 1;
  productData: undefined | product;
  removeCart= false;
  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService
  ) {}
  ngOnInit() {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.log(productId);
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        console.log(result);
        this.productData = result;
        let cartData = localStorage.getItem('localCart');
        if (productId && cartData) {
          // console.log(productId);
          // console.log(cartData); 
          
          
          let items = JSON.parse(cartData);
          // console.log(items);
          
          items = items.filter((item: product) => productId == item.id.toString());
          console.log(items);
          
          if (items.length) {
            this.removeCart = true;
          }else{
            this.removeCart=false
          }
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
      console.log(this.productData.quantity);
      console.log(this.productQuantity);

      if (!localStorage.getItem('user')) {
        this.product.localAddToCard(this.productData);
      } else {
        console.log('else');
      }
    }
  }
  removeToCart(productId:number){

  }
}
