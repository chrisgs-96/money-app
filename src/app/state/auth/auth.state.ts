import {
  State,
  Action,
  StateContext,
  Select,
  Store,
  Selector,
} from '@ngxs/store';
import { Injectable, setTestabilityGetter } from '@angular/core';
import { pipe, take } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { state } from '@angular/animations';
import { Loader } from '../loader/loader.action';
import { Modal } from '../modal/modal.action';
import { AuthActions } from './auth.action';
import { AuthStateModel, EmailPayloadObj } from './auth.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { HttpClientXsrfModule } from '@angular/common/http';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    email: '',
    isLoggedIn: false,
  },
})
@Injectable()
export class AuthState {
  authService: AuthenticationService;

  constructor(
    private store: Store,
    authService: AuthenticationService,
    private router: Router
  ) {
    this.authService = authService;
  }

  @Selector()
  static isLoggedIn(state: AuthStateModel) {
    return state.isLoggedIn;
  }

  @Action(AuthActions.GetUserStatus)
  getUserStatus(ctx: StateContext<AuthStateModel>) {
    this.store.dispatch(new Loader.Show());
    this.authService
      .GetUserState()
      .pipe(take(1))
      .subscribe((userData) => {
        if (userData?.email) {
          ctx.setState({
            email: userData.email,
            isLoggedIn: true,
          });
          this.router.navigate(['add']);
        } else {
          this.router.navigate(['']);
        }
        this.store.dispatch(new Loader.Hide());
      });
  }

  @Action(AuthActions.Login)
  login(ctx: StateContext<AuthStateModel>, data: EmailPayloadObj) {
    this.store.dispatch(new Loader.Show());
    this.authService
      .SignIn(data.payload.email, data.payload.password)
      .then((_) => {
        ctx.setState({
          email: data.payload.email,
          isLoggedIn: true,
        });
        this.router.navigate(['add']);
      })
      .catch((err) => this.store.dispatch(new Modal.Show({ message: err })))
      .finally(() => this.store.dispatch(new Loader.Hide()));
  }

  @Action(AuthActions.SignUp)
  signUp(ctx: StateContext<AuthStateModel>, data: EmailPayloadObj) {
    this.store.dispatch(new Loader.Show());
    this.authService
      .SignUp(data.payload.email, data.payload.password)
      .then((_) => {
        ctx.setState({
          email: '',
          isLoggedIn: false,
        });
        this.router.navigate(['/']);
        this.store.dispatch(
          new Modal.Show({ message: 'Signed up succesfully' })
        );
      })
      .catch((err) => this.store.dispatch(new Modal.Show({ message: err })))
      .finally(() => this.store.dispatch(new Loader.Hide()));
  }

  @Action(AuthActions.Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    this.store.dispatch(new Loader.Show());
    this.authService
      .SignOut()
      .then((_) => {
        ctx.setState({
          email: '',
          isLoggedIn: false,
        });
        this.router.navigate(['/']);
      })
      .catch((err) => this.store.dispatch(new Modal.Show({ message: err })))
      .finally(() => this.store.dispatch(new Loader.Hide()));
  }

  @Action(AuthActions.GoogleLogin)
  googleLogin(ctx: StateContext<AuthStateModel>) {
    this.store.dispatch(new Loader.Show());
    this.authService
      .GoogleAuth()
      .then(() => {
        this.authService  
          .GetUserState()
          .pipe(take(1))
          .subscribe((data) => {
            if (data?.email) {
              ctx.setState({
                email: data.email,
                isLoggedIn: true,
              });
              this.router.navigate(['add']);
            } else if (!data) {
              const message = 'There was an error with Google Authentication.'
              this.store.dispatch(new Modal.Show({ message }))
            }
          });
      })
      .catch((err) => this.store.dispatch(new Modal.Show({ message: err })))
      .finally(() => this.store.dispatch(new Loader.Hide()));
  }
}
