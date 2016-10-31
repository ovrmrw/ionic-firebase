import { Component,ChangeDetectorRef } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../pages/login/auth.service';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform, public auth: AuthService,public cd:ChangeDetectorRef) {

    platform.ready().then(() => {
      this.auth.loginState$.subscribe(state => {
        if (state.isAuthenticated) {
          this.rootPage = TabsPage;
          this.cd.detectChanges();          
        } else {
          this.rootPage = LoginPage;
          this.cd.detectChanges();
        }
      });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // StatusBar.styleDefault();
      // Splashscreen.hide();
    });
  }
}
