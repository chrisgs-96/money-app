import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { take } from 'rxjs';
import { PasswordMatchValidator } from 'src/app/validators/password-match.validator';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { AuthActions } from '../../state/auth/auth.action';
import { Modal } from '../../state/modal/modal.action';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    public authService: AuthenticationService,
    private store: Store,
    private router: Router
  ) {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      passwordConfirmation: new FormControl('', {
        validators: [Validators.required, Validators.minLength(4), PasswordMatchValidator('password')],
        updateOn: 'submit'
      }),
    });
  }

  signUp() {
    if (this.signUpForm.status === 'VALID')
      this.store.dispatch(new AuthActions.SignUp({
        email: this.signUpForm.value.email, password: this.signUpForm.value.password
      }));
    else this.signUpForm.markAllAsTouched();
  }

  goToSignInPage() {
    this.router.navigate(['']);
  }

  ngOnInit(): void {
  }
}
