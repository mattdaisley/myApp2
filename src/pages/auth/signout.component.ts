import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { SignupPage, Profile } from '../';

import { AuthService } from './auth.service';

@Component({
  selector: 'signup-page',
  templateUrl: 'signup.html',
  providers: []
})
export class SignOut implements OnInit {
  profile: Profile;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService) {
    // If we navigated to this page, we will have an item available as a nav param
  }

  ngOnInit(): void {
      this.authService.removeFromStorage().then( () => { this.navCtrl.setRoot(SignupPage); } );
  }
  
  
}
