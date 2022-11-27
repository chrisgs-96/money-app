import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { take } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { AuthActions } from '../state/auth/auth.action';
import { Modal } from '../state/modal/modal.action';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  constructor(
    public authService: AuthenticationService,
    private store: Store,
    private router: Router
  ) {}

  email: string = '';
  password: string = '';
  passwordConfirmation: string = '';

  signUp() {
    if (!this.email || !this.password || !this.passwordConfirmation) {
      this.store.dispatch(
        new Modal.Show({ message: 'Please fill all of the required fields' })
      );
      return;
    }
    if (this.password !== this.passwordConfirmation) {
      this.store.dispatch(
        new Modal.Show({
          message: 'Password must match the password confirmation',
        })
      );
      return;
    }
    if (this.password.length < 4) {
      this.store.dispatch(
        new Modal.Show({ message: 'Password must be at least 4 characters' })
      );
      return;
    }

    this.store.dispatch(
      new AuthActions.SignUp({ email: this.email, password: this.password })
    );
  }

  goToSignInPage() {
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    this.authService
      .GetUserState()
      .pipe(take(1))
      .subscribe((value) => {
        if (value?.email) console.log(value.email);
        // this.router.navigate(['/add'])
      });
  }
}
