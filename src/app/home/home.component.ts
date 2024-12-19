import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
constructor(private product:ProductService){}
popularProducts:undefined | product[]
trendyProduct:undefined |product[]
ngOnInit(){
  this.product.popularProducts().subscribe((data)=>{
    console.log(data);
    this.popularProducts=data
  })
  this.product.trendyProducts().subscribe((data)=>{
    this.trendyProduct=data
  })
}
}
