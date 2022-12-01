import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthActions } from '../../state/auth/auth.action';
import { AuthState } from '../../state/auth/auth.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store) { }
  @Select(AuthState.isLoggedIn) isLoggedIn$: Observable<Boolean>;
  @Select(AuthState.email) email$: Observable<string>;

  logout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnInit(): void {
  }
}
