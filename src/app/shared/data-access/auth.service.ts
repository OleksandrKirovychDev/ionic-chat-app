import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { from } from 'rxjs';

import { ICredentials } from '../interfaces/credentials.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public auth$ = authState(this.auth);

  constructor(private auth: Auth) {}

  public login(credentials: ICredentials) {
    return from(
      signInWithEmailAndPassword(
        this.auth,
        credentials.email,
        credentials.password
      )
    );
  }

  public async createAccount(credentials: ICredentials) {
    return from(
      createUserWithEmailAndPassword(
        this.auth,
        credentials.email,
        credentials.password
      )
    );
  }

  public logOut() {
    return from(signOut(this.auth));
  }
}
