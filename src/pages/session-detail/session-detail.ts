import { Component } from '@angular/core';
import { IonicPage, NavParams, Config, ActionSheet, ActionSheetController, ActionSheetOptions, } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';
import { EmployeeData } from '../../providers/employee-data';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
export interface ActionSheetButton {
  text?: string;
  role?: string;
  icon?: string;
  cssClass?: string;
  handler?: () => boolean | void;
};

@IonicPage({
  segment: 'username/:username'
})
@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  actionSheet: ActionSheet;
  item: any;
  public DataIndividu: any;
  lala: string;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public dataProvider: ConferenceData,
    public employeeData: EmployeeData,
    public config: Config,
    public navParams: NavParams
  ) {
    this.item = this.navParams.get('item');
    // this.ResultTest = await this.userData.checkAuth(this.login.username, this.login.password);
    // console.log(this.employeeData.getDataIndividu()) 
    this.getDataIndividu()
  }
  
  getDataIndividu() {
    // this.DataIndividu = this.employeeData.getDataIndividu()
    this.lala = "rizal"
  }
  
  openContact(speaker: any) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contact ' + speaker.Nama,
      buttons: [
        {
          text: `Email ( ${speaker.userLoginName}@lps.go.id )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + speaker.email);
          }
        } as ActionSheetButton,
        {
          text: `Call ( ${speaker.MobilePhone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + speaker.MobilePhone);
          }
        } as ActionSheetButton
      ]
    } as ActionSheetOptions);

    actionSheet.present();
  }
}
