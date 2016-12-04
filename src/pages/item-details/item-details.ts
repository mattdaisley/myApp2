import { Component, AfterViewInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/core';

import { NavController, NavParams, Loading, LoadingController, Keyboard } from 'ionic-angular';

// import { SearchPage } from '../';

import { Geolocation } from 'ionic-native';
// import { GoogleMap } from 'ionic-native';
// import { GoogleMapsEvent } from 'ionic-native';
// import { GoogleMapsLatLng, CameraPosition, GoogleMapsMarker, GoogleMapsMarkerOptions } from 'ionic-native';

import { CONFIG } from '../../app/config'

declare var google;

@Component({
  selector: 'item-details-page',
  templateUrl: 'item-details.html',
  providers: [],
  animations: [
    trigger(
      'openClose',
      [
        state('collapsed, void', style({
          transform: 'translateY(100%)'
        })),
        state('expanded', style({
          transform: 'translateY(0)'
        })),
        transition('collapsed <=> expanded', animate('400ms ease-in-out'))
      ]
    )
  ]
})
export class ItemDetailsPage implements AfterViewInit {
  showSearch:boolean = false;

  apiKey: String = CONFIG.API_KEY_FOR_JS;
  map:any;
  marker: any;
  lat: number;
  lng: number;

  loading: Loading;

  stateExpression: string;
  expand() { this.stateExpression = 'expanded'; this.showSearch = true; }
  collapse() { this.stateExpression = 'collapsed'; this.showSearch = false; }

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public keyboard: Keyboard) {
    this.collapse();
  }

  ngAfterViewInit() {
    let script = document.getElementById('googleMaps');
    if ( script ) script.parentNode.removeChild(script);

    this.loadMap();
  }

  loadMap(){

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    if(typeof google == "undefined" || typeof google.maps == "undefined"){

      this.loading.present();

      //Load the SDK
      window['mapInit'] = () => {
        this.initMap();
      }

      let script = document.createElement("script");
      script.id = "googleMaps";

      if(this.apiKey){
        script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
      } else {
        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';       
      }

      document.body.appendChild(script);  
  
    } else {
      this.initMap();
    } 
  }

  initMap() {

    let options = {timeout: 10000, enableHighAccuracy: true};

    this.lat = 39.8055381;
    this.lng = -105.082577;

    if ( !this.lat || !this.lng ) {
      Geolocation.getCurrentPosition(options).then((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        this.drawMap();
      });
    } else {
      this.drawMap();
    }
  }

  drawMap() {
    let latLng = new google.maps.LatLng(this.lat, this.lng);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(document.querySelector('#map'), mapOptions);
    // var x = document.querySelector('#map');

    this.marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: 'You',
    });

    this.loading.dismiss();
  }

  gotoSearch() {
    this.expand();
    // this.keyboard.close();
    // this.navCtrl.push(SearchPage);
  }


  
}