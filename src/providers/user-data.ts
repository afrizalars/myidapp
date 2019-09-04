import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
// import { NavController } from 'ionic-angular';
// import { LoginPage } from '../pages/login/login';

import { UniqueDeviceID } from '@ionic-native/unique-device-id';

@Injectable()
export class UserData {
  deviceID: string;
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_REGISERED_DEVICEID = 'hasRegisteredDeviceID';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';


  constructor(
    public events: Events,
    public storage: Storage,
    private uniqueDeviceID: UniqueDeviceID,
    private device: Device,
    // public navCtrl: NavController,
    // public loginPage: LoginPage,
    public http: Http
  ) { }

  hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  };

  removeFavorite(sessionName: string): void {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };

  login(username: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:login');
  };

  async checkAuth(username: string, password: string) {
    this.registerDeviceID();


    console.log(this.deviceID);
    let input = {
      user_name: username,
      password: password,
      devId: this.deviceID
    };

    return new Promise(resolve => {
      this.http.post('http://192.168.10.130:3030/loginUserEmpl', input)
        .subscribe(
          data => {
            console.log(input)
            resolve(JSON.parse(data['_body']));
          }
        );
    });

  };


  public regDeviceID(username: string) {


    this.registerDeviceID();
    
    //return this.http.get('http://192.168.11.113/lpsmobileappws.asmx/registerDeviceID?username='+username+'&deviceID='+this.deviceID+'&tokenID=').map(res =>
    return this.http.get('http://192.168.10.130:3030/register_user?username=' + username + '&devId=' + this.deviceID + '&tokenID=').map(res => {
   
      console.log("Masuk");
      let data = res.json();
      console.log("Success : " + JSON.stringify(data));
      return data;
    })

  };




  signup(username: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:signup');
  };

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    // this.navCtrl.push(loginPage);
    this.events.publish('user:logout');

  };

  setUsername(username: string): void {
    this.storage.set('username', username);
  };
  setGroup(username: string): void {
    this.storage.set('Group', username);
    
  };

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      
      return value;
    });
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };

  registerDeviceID(): void {
    this.uniqueDeviceID.get()
      .then((uuid: any) => this.deviceID = uuid)
      .catch((error: any) => console.log(error));
    this.deviceID == 'undefined';
    console.log("Your DeviceID_ = " + this.deviceID);
    console.log("Your DeviceID = " + this.device.uuid);
  };


}
