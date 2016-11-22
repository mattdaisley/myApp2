import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { FormsModule }   from '@angular/forms';

import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

import { 
  SignOut, 
  SignupPage,
  ProfilePage,
  
  AuthService
} from '../pages';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ItemDetailsPage,
    ListPage,
    ProfilePage,
    SignupPage,
    SignOut
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ItemDetailsPage,
    ListPage,
    ProfilePage,
    SignupPage,
    SignOut
  ],
  providers: [
    Storage,
    AuthService
  ]
})
export class AppModule {}
