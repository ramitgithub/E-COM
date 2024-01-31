import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData:cart[] |undefined; 
  priceSummary:priceSummary={
    price:0,
    discount:0,
    tax:0,
    deliveryCharge:0,
    total:0
  }
  constructor(private product:ProductService, private router:Router) {}

  ngOnInit(): void {
    this.LoadDetails();
  }

  checkout(){
    this.router.navigate(['/checkout']);
  }

  removeToCart(cartId:number | undefined){
    cartId && this.product.removeToCart(cartId).subscribe((result)=>{
      this.LoadDetails();
    })
  }



  LoadDetails(){
    this.product.currentCart().subscribe((result)=>{
      this.cartData = result;
      let price = 0;
      result.forEach((item)=>{
        if(item.quantity){
          price = price + (+item.price * +item.quantity);
        }
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price/10;
      this.priceSummary.tax = price/10;
      this.priceSummary.deliveryCharge = 60;
      this.priceSummary.total = this.priceSummary.price + this.priceSummary.deliveryCharge +this.priceSummary.tax - this.priceSummary.discount;
      // Or   this.priceSummary.total = price +(price/10) + 60 - (price/10);
    })
  }
}
