import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss'],
})
export class SellerHomeComponent {
  productMessage: undefined | string;
  productList: undefined | product[];
  icon =faTrash;
  constructor(private product: ProductService) {}
  ngOnInit() {
    this.List();
  }
  List() {
    this.product.productList().subscribe((result) => {
      console.log(result);
      this.productList = result;
    });
  }
  deleteProduct(id: any) {
    console.log('rest', id);
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product is deleted';
        this.List();
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }
}
