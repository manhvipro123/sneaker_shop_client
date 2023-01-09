import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: Auth) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (value) => {
        if (value) {
          // console.log(value)
          resolve(true);
        } else {
          // console.log(value)
          resolve(false);
          this.router.navigate(["./"]);//nếu chưa đăng nhập chuyển sang trang login
          // alert('Vui lòng đăng nhập tài khoản để có thể truy cập vào trang!!!');
        }
      })
    })
  }

}
