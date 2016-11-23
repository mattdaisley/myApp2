import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Observable, Observer } from 'rxjs';

import { ItemDetailsPage } from '../../';

import { SearchOptions } from '../search-options';
import { SearchResult } from '../search-result';
import { SearchService } from '../search.service';

@Component({
  selector: 'search-nearby-page',
  templateUrl: 'nearby.html'
})
export class NearbyPage {

  data: Observable<any>;
  dataObserver: Observer<any>;

  nearby: Array<SearchResult>;
  nearbyOptions: SearchOptions;

  constructor(public navCtrl: NavController, public navParams: NavParams, public searchService: SearchService) {

    this.nearbyOptions = new SearchOptions();
    this.nearbyOptions.limit = 15;

    this.data = new Observable(observer => {
      this.dataObserver = observer
      this.filterItems('');
    });
  }

  initializeItems(): Promise<SearchResult[]> {
    return new Promise<SearchResult[]>( resolve => {
      this.searchService.getNearby( this.nearbyOptions ).then( nearby => {
        resolve(nearby);
      });
    });
  }

  itemTapped(event, item:SearchResult) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }

  filterEvent(ev: any) {
    // set val to the value of the searchbar
    let val = ev.target.value;
    this.filterItems(val);
  }

  filterItems(string) {
    // Reset items back to all of the items
    this.initializeItems()
      .then( nearby => {
        let filtered = nearby;
        // if the value is an empty string don't filter the items
        if (string && string.trim() != '') {
           filtered = nearby.filter((item) => {
            return (item.title.toLowerCase().indexOf(string.toLowerCase()) > -1 || item.address.toLowerCase().indexOf(string.toLowerCase()) > -1);
          });
            // update your data 
        }
        this.dataObserver.next(filtered);
      } );
  }
}
