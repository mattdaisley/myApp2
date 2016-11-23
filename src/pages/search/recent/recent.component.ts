import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Observable, Observer } from 'rxjs';

import { ItemDetailsPage } from '../../';

import { SearchOptions } from '../search-options';
import { SearchResult } from '../search-result';
import { SearchService } from '../search.service';

@Component({
  selector: 'search-recent-page',
  templateUrl: 'recent.html'
})
export class RecentPage {

  data: Observable<any>;
  dataObserver: Observer<any>;

  recent: Array<SearchResult>;
  recentOptions: SearchOptions;

  constructor(public navCtrl: NavController, public navParams: NavParams, public searchService: SearchService) {

    this.recentOptions = new SearchOptions();
    this.recentOptions.limit = 15;

    this.data = new Observable(observer => {
      this.dataObserver = observer
      this.filterItems('');
    });
  }

  initializeItems(): Promise<SearchResult[]> {
    return new Promise<SearchResult[]>( resolve => {
      this.searchService.getRecent( this.recentOptions ).then( recent => {
        resolve(recent);
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
      .then( recent => {
        let filtered = recent;
        // if the value is an empty string don't filter the items
        if (string && string.trim() != '') {
           filtered = recent.filter((item) => {
            return (item.title.toLowerCase().indexOf(string.toLowerCase()) > -1 || item.address.toLowerCase().indexOf(string.toLowerCase()) > -1);
          });
            // update your data 
        }
        this.dataObserver.next(filtered);
      } );
  }
}
