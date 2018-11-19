import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products:Product[] = [];

  getProducts() {
    this.productService.getProducts()
      .subscribe((data: {}) => {
        this.products = Product.listFromJSON(data);
      });
  }

  selectedProduct: Product;
  onSelect(product: Product): void {
    this.enrichProduct(product);
    this.selectedProduct = product;
  }

  private enrichProduct(product: Product){
    var imageUrl = "";
    var priceInfo = "";
    this.productService.getRedSkyData(product.tcin)
      .subscribe((data: {}) => {
        imageUrl = this.imageUrlFromRedSkyJSON(data);
        priceInfo = this.priceFromRedSkyJSON(data);
        console.log(imageUrl);
        console.log(priceInfo);
        product.imageUrl = imageUrl;
        product.price += priceInfo;
        console.log(product);
      });
  }

  private imageUrlFromRedSkyJSON(json): string {
    var base_url = json["product"]["item"]["enrichment"]["images"][0]["base_url"];
    var primary = json["product"]["item"]["enrichment"]["images"][0]["primary"];
    var imageUrl = base_url + primary;
    return imageUrl;
  }

  private priceFromRedSkyJSON(json): string {
    var listPrice = json["product"]["price"]["listPrice"]["formattedPrice"];
    var offerPrice = json["product"]["price"]["offerPrice"]["formattedPrice"];
    var priceInfo = " (list: " + listPrice + ", offer: " + offerPrice + ")";
    return priceInfo;
  }

  constructor(private productService: ProductService) { }

  ngOnInit() {
  	this.getProducts();
  }
}