import { Component } from '@angular/core';

import { App, NavController, ModalController, ViewController } from 'ionic-angular';
 import { AttendentHistoryPage } from '../attendent-history/attendent-history';


@Component({
  template: `
    <ion-list>
     
      <button ion-item (click)="historyAttendent()">History</button>
    </ion-list>
  `
})
export class AttendentPopoverPage {

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public app: App,
    public modalCtrl: ModalController
  ) { }

  historyAttendent() {
     this.navCtrl.push(AttendentHistoryPage);
    this.viewCtrl.dismiss();
  }

  close(url: string) {
    window.open(url, '_blank');
    this.viewCtrl.dismiss();
  }
  
  
}