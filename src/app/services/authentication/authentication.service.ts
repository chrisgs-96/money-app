import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { combineLatest, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    public afAuth: AngularFireAuth // Inject Firebase auth service
  ) {}
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    console.log('provider in authentication.service.ts type');
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        return '1';
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        return '2';
        console.log(error);
      });
  }

  /* Sign up */
  SignUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  GetUserState() {
    return this.afAuth.authState;
  }

  /* Sign out */
  SignOut() {
    return this.afAuth.signOut();
  }
}
