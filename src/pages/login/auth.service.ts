import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs/Rx';
import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyB6KpgtfXS2w6d86Hh3BPxPPf1trEbhgAg",
  authDomain: "ionic2-b451c.firebaseapp.com",
  databaseURL: "https://ionic2-b451c.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "223592582659"
};


@Injectable()
export class AuthService {
  // private _loginState$ = new BehaviorSubject<LoginState>({ isAuthenticated: false, currentUser: null });
  private _loginState$ = new ReplaySubject<LoginState>();


  constructor() {
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged((user: firebase.User) => {
      if (user) {
        console.log('LOG-IN');
        this._loginState$.next({ isAuthenticated: true, currentUser: user });
      } else {
        console.log('LOG-OFF');
        this._loginState$.next({ isAuthenticated: false, currentUser: null });
      }
    });
  }


  login(): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(result => console.log('auth result:', result))
      .catch(err => console.error(err));
  }


  logout(): void {
    firebase.auth().signOut();
  }


  get loginState$(): Observable<LoginState> {
    return this._loginState$.asObservable();
  }
}


export interface LoginState {
  isAuthenticated: boolean;
  currentUser: firebase.User | null;
}
