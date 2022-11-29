import { compileClassMetadata } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, take } from 'rxjs';
import { AuthState } from '../state/auth/auth.state';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.store
        .select(AuthState.isLoggedIn)
        .pipe(take(1))
        .subscribe((isLoggedIn) => {
          if (isLoggedIn) observer.next(true);
          else this.router.navigate(['']);
          observer.complete();
        });
    });
  }
}
