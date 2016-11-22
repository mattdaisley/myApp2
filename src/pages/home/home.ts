import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { SearchPage } from '../';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) {

  }

  gotoSearch() {
      this.navCtrl.push(SearchPage);
  }
}
