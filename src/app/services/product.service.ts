import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cart, product } from '../data-type';
import { ARIA_LIVE_DELAY_FACTORY } from '@ng-bootstrap/ng-bootstrap/util/accessibility/live';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cardData = new EventEmitter<product[] | []>();
  constructor(private http: HttpClient) {}
  addProduct(data: product) {
    // console.log("service call");
    return this.http.post('http://localhost:3000/products', data);
  }
  productList() {
    return this.http.get<product[]>('http://localhost:3000/products');
  }
  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }
  updateProduct(product: product) {
    console.log(product);

    return this.http.put<product>(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }
  popularProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3'); ///display three product for corasule
  }
  trendyProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=5');
  }
  searchProducts(query: string) {
    return this.http.get<product[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }
  localAddToCard(data: product) {
    let carData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([]));
      this.cardData.emit([data]);
    } else {
      carData = JSON.parse(localCart);
      carData.push(data);
      localStorage.setItem('localCart', JSON.stringify(carData));
      this.cardData.emit(carData);
    }
    
  }
  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      console.log(items);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cardData.emit(items);
    }
  }
  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }
  getCartList(userId: number) {
    return this.http
      .get<product[]>('http://localhost:3000/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cardData.emit(result.body);
        }
      });
  }
}
