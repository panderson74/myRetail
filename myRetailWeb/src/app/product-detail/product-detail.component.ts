import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';
import { ProductService }  from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @Input() product:any;

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

}
