import { Component } from '@angular/core';

import { NavController, NavParams, Searchbar } from 'ionic-angular';

import { ItemDetailsPage } from '../';

import { SearchOptions } from './search-options';
import { SearchResult } from './search-result';
import { SearchService } from './search.service';

@Component({
  selector: 'search-page',
  templateUrl: 'search.html'
})
export class SearchPage {

  nearby: Array<SearchResult>;
  recent: Array<SearchResult>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public searchService: SearchService) {
    // If we navigated to this page, we will have an item available as a nav param

    let nearbyOptions = new SearchOptions();
    nearbyOptions.limit = 12;
    this.searchService.getNearby( nearbyOptions ).then( nearby => {this.nearby = nearby; } );

    let recentOptions = new SearchOptions();
    recentOptions.limit = 2;
    this.searchService.getRecent( recentOptions ).then( recent => {this.recent = recent; } );
  }

  itemTapped(event, item:SearchResult) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
