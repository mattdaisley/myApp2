import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Profile } from './profile';
import { ProfileService } from './profile.service';


@Component({
  selector: 'profile-page',
  templateUrl: 'profile.html',
  providers: [ProfileService]
})
export class ProfilePage implements OnInit {
  profile: Profile;

  constructor(public navCtrl: NavController, public navParams: NavParams, private profileService: ProfileService) {
    // If we navigated to this page, we will have an item available as a nav param
    
  }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    this.profileService.getProfile()
      .then( profile => this.profile = profile );
  }

  updateProfile(): void {
    this.profileService.updateProfile( this.profile ).then( profile => console.log(profile) );
  }

  toggleNotifications(): void {
    this.profile.notifications = !this.profile.notifications;
  }

  toggleVibrate(): void {
    this.profile.vibrate = !this.profile.vibrate;
  }

  toggleSound(): void {
    this.profile.sound = !this.profile.sound;
  }
  
  
}
