import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { Product } from './interfaces/product.interface';

@Component({
  selector: 'app-products',
  template: `
    <!-- products.component.html en mf-products -->
    <div class="products-container">
      <h1>Products (mf-products)</h1>
      <router-outlet></router-outlet>

      <ng-container *ngIf="products$ | async as products; else loading">
        <div class="row">
          <div
            class="col-sm-3 d-flex my-3 align-items-stretch"
            *ngFor="let product of products; trackBy: trackBy"
          >
            <app-product-card [product]="product"></app-product-card>
          </div>
        </div>
      </ng-container>
      <ng-template #loading> loading....... </ng-template>
    </div>
  `,
})
export class ProductsComponent implements OnInit {
  products$!: Observable<Product[]>;

  constructor(private readonly productsSvc: ProductsService) {}

  ngOnInit(): void {
    this.products$ = this.productsSvc.getProducts();
    console.log('ProductsComponent ProductsModule Mf-Products');
  }

  trackBy(index: number, product: Product): number {
    return product.id;
  }
}
