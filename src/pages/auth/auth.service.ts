import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

import { Storage } from '@ionic/storage';

import { Profile } from '../';
// import { PROFILE } from './mock-profile';

@Injectable()
export class AuthService {

  private authChangeSource = new Subject<void>();

  authChange$ = this.authChangeSource.asObservable();

  constructor(public storage: Storage) {
    
  }

  putProfileToStorage( profile:Profile): Promise<Profile> {
    return new Promise<Profile>( resolve =>
      this.storage.set('profile', profile ).then( () => {
          this.authChangeSource.next();
          resolve();
      })
    )
  }

  removeFromStorage(): Promise<void> {
      return new Promise<void>( resolve =>
      this.storage.remove('profile').then( () => {
          this.authChangeSource.next();
          resolve();
      })
    )
  }
}