import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { take, tap } from 'rxjs';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { AuthActions } from '../../state/auth/auth.action';
import { Modal } from '../../state/modal/modal.action';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public authService: AuthenticationService,
    private store: Store,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  signIn() {
    if (this.loginForm.status === 'VALID')
      this.store.dispatch(new AuthActions.Login(this.loginForm.value));
    else this.loginForm.markAllAsTouched();
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
