import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  searchResult:undefined|product[];
  constructor(private activeRoute:ActivatedRoute, private product:ProductService, private router : Router){}

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    query && this.product.searchProducts(query).subscribe((result)=>{
      this.searchResult = result;
    })
  }
}
