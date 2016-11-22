import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { FormsModule }   from '@angular/forms';

import { Storage } from '@ionic/storage';

import { 
  HomePage,
  ItemDetailsPage,
  ListPage,
  SearchPage,
  SignOut, 
  SignupPage,
  ProfilePage,
  ProfileButton,
  
  AuthService
} from '../pages';

import { Focuser } from '../util/focuser.directive';

@NgModule({
  declarations: [
    MyApp,
    Focuser,
    HomePage,
    ItemDetailsPage,
    ListPage,
    ProfilePage,
    ProfileButton,
    SearchPage,
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
    SearchPage,
    SignupPage,
    SignOut
  ],
  providers: [
    Storage,
    AuthService
  ]
})
export class AppModule {}
