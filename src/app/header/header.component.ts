import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName:string=""
  constructor(private route: Router) {}
  ngOnInit() {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        // console.log(val.url);

        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.log('seller area');
          this.menuType = 'seller';
          if(localStorage.getItem("seller")){
            let sellerStore=localStorage.getItem("seller")
            let sellerData=sellerStore &&JSON.parse(sellerStore)
            this.sellerName=sellerData.name;
          }
        } else {
          console.log('outside seller');
          this.menuType = 'default';
        }
      }
    });
  }
  logout(){
    localStorage.removeItem("seller")
    this.route.navigate(["/"])
  }
}
