import { Component, ViewChild, OnDestroy } from '@angular/core';

import { Subscription }   from 'rxjs/Subscription';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from 'ionic-native';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { ProfilePage } from '../pages/profile/profile.component';
import { SignupPage } from '../pages/auth/signup.component';
import { SignOut } from '../pages/auth/signout.component';

import { ProfileService } from '../pages/profile/profile.service';
import { AuthService } from '../pages/auth/auth.service';


@Component({
  templateUrl: 'app.html',
  providers: [ ProfileService ]
})
export class MyApp implements OnDestroy {
  @ViewChild(Nav) nav: Nav;
  subscription: Subscription;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;
  pages: Array<{title: string, component: any}>;
  authPages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    private authService: AuthService,
    private profileService: ProfileService
  ) {
    this.initializeApp();

    this.initializePages();

    this.subscription = this.authService.authChange$.subscribe(
      () => this.initializePages()
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  initializePages() {
    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage }
    ];
    this.authPages = [];

    this.profileService.getProfileFromStorage().then( profile => {
      if ( profile ) { 
        this.authPages.push( { title: 'My Profile', component: ProfilePage } ); 
        this.authPages.push( { title: 'Sign Out', component: SignOut } ); 
      } else { 
        this.authPages.push( { title: 'Signup', component: SignupPage } ); 
        this.authPages.push( { title: 'Signin', component: SignupPage } ); 
      }
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
