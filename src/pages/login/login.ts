import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { NavController, AlertController } from 'ionic-angular';
import firebase from 'firebase';

import { AuthService, LoginState } from './auth.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  isAuthenticated: boolean;
  currentUser: firebase.User | null;


  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public auth: AuthService,
    public cd: ChangeDetectorRef,
  ) { }


  ngOnInit() { 
    this.auth.loginState$.subscribe(state => {
      this.isAuthenticated = state.isAuthenticated;
      this.currentUser = state.currentUser;
      this.cd.detectChanges();
    });
  }


  login(): void {
    this.auth.login();
  }


  logout(): void {
    this.auth.logout();
    const alert = this.alertCtrl.create({
      title: 'LOG OUT',
      // subTitle: '',
      // buttons: ['OK']
    });
    alert.present();
  }


  get loginState(): Observable<LoginState> {
    return this.auth.loginState$;
  }

  // get isAuthenticated(): Observable<boolean> {
  //   return this.loginState.map(s => s.isAuthenticated);
  // }

  // get currentUser(): Observable<firebase.User | null> {
  //   return this.loginState.map(s => s.currentUser);
  // }

}
