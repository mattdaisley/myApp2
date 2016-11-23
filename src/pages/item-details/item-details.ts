import { Component, OnInit } from '@angular/core';

import { NavController, NavParams, Loading, LoadingController } from 'ionic-angular';

import { Geolocation } from 'ionic-native';
// import { GoogleMap } from 'ionic-native';
// import { GoogleMapsEvent } from 'ionic-native';
// import { GoogleMapsLatLng, CameraPosition, GoogleMapsMarker, GoogleMapsMarkerOptions } from 'ionic-native';

import { CONFIG } from '../../app/config'

declare var google;

@Component({
  selector: 'item-details-page',
  templateUrl: 'item-details.html',
  providers: []
})
export class ItemDetailsPage implements OnInit {
  map:any;

  lat: number;
  lng: number;

  loading: Loading;

  apiKey: String = CONFIG.API_KEY_FOR_JS;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.loadMap();
  }

  loadMap(){

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present();

    if(typeof google == "undefined" || typeof google.maps == "undefined"){
  
      console.log("Google maps JavaScript needs to be loaded.");
      // this.disableMap();
  
      console.log("online, loading map");

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
    console.log('loading map');

    let options = {timeout: 10000, enableHighAccuracy: true};
    //ENABLE THE FOLLOWING:
    
    Geolocation.getCurrentPosition(options).then((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      let latLng = new google.maps.LatLng(this.lat, this.lng);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(document.querySelector('#map'), mapOptions);
      var x = document.querySelector('#map');
      console.log(x);

      let marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: 'You',
      });
      
      this.loading.dismiss();

       /* var element = angular.element(document.querySelector('#mycart'));
                element.text(basket.cartDataCounter());*/
    });
  }
}