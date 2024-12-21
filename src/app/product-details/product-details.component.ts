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
      });
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      // this.productQuantity+=1
      this.productQuantity = this.productQuantity + 1;
    }else if(this.productQuantity>1 && val==='min'){
      this.productQuantity-=1
    }
  }
}
