import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss'],
})
export class SellerAddProductComponent {
  addProductMessagae:string|undefined
  constructor(private product: ProductService) {}
  addProducts(data: product) {
    this.product.addProduct(data).subscribe((result)=>{
      console.log(result);
      if(result){
        this.addProductMessagae="Product is successfully added"
      }
      setTimeout(()=>(this.addProductMessagae=undefined),3000)
    })
    console.log(data);
  }
}
