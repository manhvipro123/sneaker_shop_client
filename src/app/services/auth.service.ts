import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }


  login() {
    return from(new Promise<User>(async (resolve, reject) => {
      try {
        let credential = await signInWithPopup(this.auth, new GoogleAuthProvider());
        // await this.SetUserData(credential.user);
        // let idToken = await credential.user.getIdToken();
        let user: User = {
          name: credential.user.displayName,
          role: 'customer',
          id: 0,
          email: credential.user.email,
          photoURL: credential.user.photoURL
        }
        resolve(user);
      } catch {
        reject('Cannot login with google');
      }
    }));
  }


  async logout() {
    // Sign out
    return from(new Promise<any>(async (resolve, reject) => {
      try {
        await signOut(this.auth);
        resolve("log out");
      }
      catch {
        reject("logout fail");
      }
    }))

  }
}
