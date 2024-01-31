import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { order } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit{

  orderData:order[]|undefined;
  constructor(private product:ProductService, private router:Router){}
  
  ngOnInit(): void {
    this.getOrderList();
  }

  cancelOrder(orderId:number|undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      this.getOrderList();
    })
  }

  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.orderData = result;
    })
  }
}
