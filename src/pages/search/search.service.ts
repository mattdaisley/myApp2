import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { SearchResult } from './search-result';
import { SearchOptions } from './search-options';

import { RECENTHISTORY } from './recent/mock-recent';
import { NEARBY } from './nearby/mock-nearby';

@Injectable()
export class SearchService {

  constructor(public storage: Storage) {
    
  }

  getRecent( options: SearchOptions ): Promise<SearchResult[]> {
    return new Promise<SearchResult[]>( resolve => {
        let result = RECENTHISTORY.slice(options.offset, options.limit);
        resolve(result);
    });
  }

  getNearby( options: SearchOptions ): Promise<SearchResult[]> {
    return new Promise<SearchResult[]>( resolve => {
        let result = NEARBY.slice(options.offset, options.limit);
        resolve(result);
    });
  }

}