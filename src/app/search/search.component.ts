import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchResult: undefined | product[];
  constructor(
    private activRoute: ActivatedRoute,
    private product: ProductService
  ) {}
  ngOnInit() {
    let query = this.activRoute.snapshot.paramMap.get('query');
    console.log("show",query);
    query &&
      this.product.searchProducts(query).subscribe((result) => {

        
        this.searchResult = result;
        console.log(this.searchResult);
        
      });
  }
}
