import { Observable, Subscription } from 'rxjs';
import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../interfaces/product.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  product$!: Observable<Product>;
  productId!: number;
  private routeSub: Subscription | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productsSvc: ProductsService,
    private readonly location: Location
  ) {
    console.log('DetailsComponent Constructor');
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.productId = +params['productId']; // '+' converts the string to a number
      this.loadProductDetails(); // Call a method to load the product details
      this.product$ = this.productsSvc.getProductById(this.productId);
    });
    console.log('DetailsComponent ngOnInit');
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
  loadProductDetails(): void {
    // Logic to load the product details based on this.productId
    console.log(`Loading details for product ID: ${this.productId}`);
  }
  goBack(): void {
    this.location.back();
  }
}
