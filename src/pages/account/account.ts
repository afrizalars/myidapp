import { Component } from '@angular/core';
import { App } from 'ionic-angular';

// import { TabsPage } from '../tabs-page/tabs-page';
import { AlertController, NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';
import { ApiData } from '../../providers/api-data';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  username: string;
  profile: string;
  personalNumber: string;
  public DataProfile: any;
  public DataRiwayatPosisi: any;
  public DataRiwayatPangkat: any;
  public DataRiwayatPenilaian: any;
  public DataRiwayatPelatihan: any;
  public DataRiwayatKerja: any;
  public DataRiwayatPendidikan: any;
  constructor(public app: App, public alertCtrl: AlertController, public nav: NavController, public userData: UserData, public apiData: ApiData) {

  }
  ionViewWillEnter() {
    this.profile = 'profil';

  }
  ngAfterViewInit() {

   
    this.personalNumber = localStorage.getItem("PersonalNumber");
    this.getData();


  }

  getData() {
    this.apiData.getEmployeeProfile(this.personalNumber).subscribe((result) => {
      this.DataProfile = result.hasil;
    });
    this.apiData.getEmployeeRiwayatPosisi(this.personalNumber).subscribe((result) => {
      this.DataRiwayatPosisi = result.hasil;
    });
    this.apiData.getEmployeeRiwayatPangkat(this.personalNumber).subscribe((result) => {
      this.DataRiwayatPangkat = result.hasil;
    });
    this.apiData.getEmployeeRiwayatPenilaian(this.personalNumber).subscribe((result) => {
      this.DataRiwayatPenilaian = result.hasil;
    });
    this.apiData.getEmployeeRiwayatPelatihan(this.personalNumber).subscribe((result) => {
      this.DataRiwayatPelatihan = result.hasil;
    });
    this.apiData.getEmployeeRiwayatKerja(this.personalNumber).subscribe((result) => {
      this.DataRiwayatKerja = result.hasil;
    });
    this.apiData.getEmployeeRiwayatPendidikan(this.personalNumber).subscribe((result) => {
      this.DataRiwayatPendidikan = result.hasil;
    });

  }

 

  logout() {



    this.app.getRootNav().setRoot('LoginPage');
    this.userData.logout();
  }


}
