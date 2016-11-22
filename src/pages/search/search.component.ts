import { Component } from '@angular/core';

import { NavController, NavParams, Searchbar } from 'ionic-angular';

import { ItemDetailsPage } from '../';

@Component({
  selector: 'search-page',
  templateUrl: 'search.html'
})
export class SearchPage {

  selectedItem: any;
  icons: string[];
  nearby: Array<{title: string, address: string, id: number}>;
  recent: Array<{title: string, address: string, id: number}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param

    this.nearby = [
      { title: 'First person', address: '123 first st', id: 1 },
      { title: 'Second person', address: '345 second dr', id: 2 },
      { title: 'Third person', address: '678 third pl', id: 3 },
      { title: 'Fourth person', address: '910 fourth circle', id: 4 }
    ];

    this.recent = [
      { title: 'Recent First person', address: '123 first st', id: 4 },
      { title: 'Recent Second person', address: '345 second dr', id: 5 }
    ];
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
