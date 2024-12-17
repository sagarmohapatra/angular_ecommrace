import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss'],
})
export class SellerUpdateProductComponent {
  constructor(private route: ActivatedRoute, private product: ProductService) {}
   productData:undefined |product;
   productMessage:undefined | string;
  ngOnInit() {
    let productId = this.route.snapshot.paramMap.get('id');
    console.log(productId);
    productId &&
      this.product.getProduct(productId).subscribe((data) => {
        console.log(data);
        this.productData=data
      });
  }
  addProducts(data: product) {
    console.log(data);
    if(this.productData){
      data.id=this.productData.id
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.productMessage="Product has update"
      }
    })
    setTimeout(()=>{
      this.productMessage=undefined
    },3000)
  }
}
