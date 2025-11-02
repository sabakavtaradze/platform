import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  // Use a constant for the storage key for robustness
  private readonly PRODUCT_ID_KEY = 'productId'; 

  private productIdSubject = new BehaviorSubject<string | null>(
    // Initialize from the correct localStorage key
    localStorage.getItem(this.PRODUCT_ID_KEY) || null
  );
  productId$ = this.productIdSubject.asObservable();

  updateProductId(newProductId: string | null) {
    this.productIdSubject.next(newProductId);
    // 🔑 FIX: Use the consistent PRODUCT_ID_KEY for localStorage
    if (newProductId) {
        localStorage.setItem(this.PRODUCT_ID_KEY, newProductId); 
    } else {
        localStorage.removeItem(this.PRODUCT_ID_KEY);
    }
  }

  
  private scrollPositionSubject = new BehaviorSubject<boolean>(true);

  setScrollPosition(headerVisiable: boolean) {
    this.scrollPositionSubject.next(headerVisiable);
  }

  getScrollPosition(): Observable<boolean> {
    return this.scrollPositionSubject.asObservable();
  }
}