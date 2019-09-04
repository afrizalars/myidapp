import { Component } from '@angular/core';

import {  NavController, ViewController } from 'ionic-angular';
 import { MeetingAttendanceListPage } from '../meeting-attendance-list/meeting-attendance-list';


@Component({
  template: `
    <ion-list>
     
      <button ion-item (click)="historyAttendent()">Meeting List</button>
    </ion-list>
  `
})
export class MeetingAttendancePovrPage {

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController
    
   // public modalCtrl: ModalController
  ) { }

  historyAttendent() {
     this.navCtrl.push(MeetingAttendanceListPage);
    this.viewCtrl.dismiss();
  }

  // close(url: string) {
   
    // this.viewCtrl.dismiss();
  // }
  
  
}