import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import { SellerService } from './services/seller.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn:'root'
})
export class authGuard implements CanActivate {
  constructor(private sellerService: SellerService) {}

  canActivate(
    route: ActivatedRouteSnapshot, 
    state :RouterStateSnapshot):Observable<boolean |UrlTree> | Promise < boolean | UrlTree >| boolean{
    if (localStorage.getItem('seller')) {
      return true;
    }
    
    return this.sellerService.isSellerLoggedIn;
  }
}