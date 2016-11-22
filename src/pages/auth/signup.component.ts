import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { HelloIonicPage } from '../hello-ionic/hello-ionic';

import { Profile } from '../profile/profile';
import { AuthService } from './auth.service';

@Component({
  selector: 'signup-page',
  templateUrl: 'signup.html',
  providers: []
})
export class SignupPage implements OnInit {
  profile: Profile;
  submitted: Boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.profile = new Profile();
    this.submitted = false;
  }

  ngOnInit(): void {
      
  }

  onSubmit(): void {
      this.submitted = true;
      this.authService.putProfileToStorage(this.profile).then( () => { this.navCtrl.setRoot(HelloIonicPage); } );
  }

  validateEmail(): void {
    // console.log('validateEmail');
  }
  
  
}
