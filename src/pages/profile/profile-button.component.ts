import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ProfilePage } from './profile.component';
import { ProfileService } from './profile.service';

@Component({
  selector: 'profile-button',
  templateUrl: 'profile-button.html'
})
export class ProfileButton implements OnInit {
  visible: Boolean = false;

  constructor(public navCtrl: NavController, public profileService: ProfileService) {

  }

  ngOnInit() {
    this.profileService.getProfileFromStorage().then( profile => {
      if ( profile ) { 
        this.visible = true;
      }
    });
  }

  gotoProfile() {
      this.navCtrl.push(ProfilePage);
  }
}
