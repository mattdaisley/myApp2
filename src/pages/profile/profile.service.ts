import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Profile } from './profile';
// import { PROFILE } from './mock-profile';

@Injectable()
export class ProfileService {

  constructor(public storage: Storage) {
    
  }

  getProfile(): Promise<Profile> {
    return new Promise<Profile>( resolve =>
      this.getProfileFromStorage().then( profile => {
        if ( profile ) { resolve(profile) } 
        else { 
          /*goto login page*/ 
          /*this.storage.set('profile', PROFILE); resolve(PROFILE);*/
        }
      })
    );
  }

  updateProfile( profile:Profile ): Promise<Profile> {
    return new Promise<Profile>( resolve =>
      this.putProfileToStorage(profile).then( profile => {
        resolve(profile);
      })
    );
  }

  getProfileFromStorage(): Promise<Profile> {
    return this.storage.get('profile');
  }

  putProfileToStorage( profile:Profile): Promise<Profile> {
    return new Promise<Profile>( resolve =>
      this.storage.set('profile', profile ).then( () => 
        this.getProfileFromStorage().then( profile => {
          resolve(profile);
        })
      )
    )
  }
}