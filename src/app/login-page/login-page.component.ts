import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { take, tap } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { AuthActions } from '../state/auth/auth.action';
import { Modal } from '../state/modal/modal.action';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    public authService: AuthenticationService,
    private store: Store,
    private router: Router
  ) {}

  email: string = '';
  password: string = '';

  signIn() {
    if (!this.email || !this.password) {
      this.store.dispatch(
        new Modal.Show({ message: 'Please fill all of the required fields' })
      );
      return;
    }
    this.store.dispatch(
      new AuthActions.Login({ email: this.email, password: this.password })
    );
  }

  goToSignUpPage() {
    this.router.navigate(['signup']);
  }

  googleLogin() {
    this.store.dispatch(new AuthActions.GoogleLogin());
  }

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.GetUserStatus());
  }
}
