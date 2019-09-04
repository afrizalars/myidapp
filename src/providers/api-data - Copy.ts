import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';



import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class ApiData {
	deviceID : string;
 
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_REGISERED_DEVICEID = 'hasRegisteredDeviceID';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
   data: any;
   profileInfo :any;
  constructor(
 public events: Events,
    public storage: Storage,
	private uniqueDeviceID: UniqueDeviceID,
	private device: Device,
	
	public http: Http
  ) { }
  
  //----------- LOGIN - START ---------------
   login(username: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
  // this.setProfileInfo(profileInfo);
    this.events.publish('user:login');
  };
  
    checkAuth(username: string,password : string)  {
	this.registerDeviceID();

	
	
	
  return this.http.get('http://192.168.11.113/lpsmobileappws.asmx/checkAuth?username='+username+'&password='+password+'&deviceID='+this.deviceID).map(res =>
	 {

	 let data = res.json();
	  console.log("Success : "+data.Result);
	 return data.Result;
   })
  }
  
   regDeviceID(username: string)  {
	this.registerDeviceID();

  return this.http.get('http://192.168.11.113/lpsmobileappws.asmx/registerDeviceID?username='+username+'&deviceID='+this.deviceID+'&tokenID=').map(res =>
	 {
	 let data = res.json();
	  console.log("Success : "+data.Result);
	 return data.Result;
	 })
   };
   
     hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };


  
  registerDeviceID(): void {
   this.uniqueDeviceID.get()
  .then((uuid: any) => this.deviceID = uuid)
  .catch((error: any) => console.log(error));
  
  console.log("Your DeviceID = "+ this.device.uuid);
  };


  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
// this.navCtrl.push(loginPage);
    this.events.publish('user:logout');
	
  };
  setProfileInfo(profileInfo: any): void {
	  console.log(profileInfo.username); 
	this.storage.set('personalNumber', profileInfo.username);
    this.storage.set('personalNumber', profileInfo.personalNumber);
	this.storage.set('Nama', profileInfo.nama);
	this.storage.set('Posisi', profileInfo.posisi);
	this.storage.set('Group', profileInfo.group);
	
  };
  

  setUsername(username :string)
 
 {
	 this.storage.set('username', username);
  }



	  getUsername(): Promise<string> {
		return this.storage.get('username').then((value) => {
		  return value;
		 // console.log(value);
		});
	  };
	    getPersonalNumber(): Promise<string> {
		return this.storage.get('personalNumber').then((value) => {
		  return value;
		});
	  };
  //----------- LOGIN - END ---------------
//----------- NEWS - START ---------------
	getNews(){
		      console.log("Call API : getNews");
  
	  return this.http.get('http://192.168.10.130:3030/getnews').map(res => res.json());
	
   }
 
 //----------- NEWS - END ---------------
 
 
  //----------- PROFILE - START ---------------
  
  	getEmployeeProfile(personalNumber : string){
		         console.log("Call API : getEmployeeProfile");
  
	  return this.http.get('http://192.168.10.130:3030/get_dataemployee?jenis=profil&personalnum='+personalNumber).map(res => res.json());
	
   }
   
   	getEmployeeRiwayatPosisi(personalNumber : string){
		         console.log("Call API : getEmployeeProfile");
  
	  return this.http.get('http://192.168.10.130:3030/get_dataemployee?jenis=riwayat_posisi&personalnum='+personalNumber).map(res => res.json());
	
   }
   	getEmployeeRiwayatPangkat(personalNumber : string){
		         console.log("Call API : getEmployeeRiwayatPangkat");
  
	  return this.http.get('http://192.168.10.130:3030/get_dataemployee?jenis=riwayat_pangkat&personalnum='+personalNumber).map(res => res.json());
	
   }
   	getEmployeeRiwayatPenilaian(personalNumber : string){
		         console.log("Call API : getEmployeeRiwayatPenilaian");
  
	  return this.http.get('http://192.168.10.130:3030/get_dataemployee?jenis=riwayat_penilaian&personalnum='+personalNumber).map(res => res.json());
	
   }
   	getEmployeeRiwayatPelatihan(personalNumber : string){
		         console.log("Call API : getEmployeeRiwayatPelatihan");
  
	  return this.http.get('http://192.168.10.130:3030/get_dataemployee?jenis=riwayat_pelatihan&personalnum='+personalNumber).map(res => res.json());
	
   }
   	getEmployeeRiwayatKerja(personalNumber : string){
		         console.log("Call API : getEmployeeRiwayatKerja");
  
	  return this.http.get('http://192.168.10.130:3030/get_dataemployee?jenis=riwayat_kerja&personalnum='+personalNumber).map(res => res.json());
	
   }
   
   getEmployeeRiwayatPendidikan(personalNumber : string){
		         console.log("Call API : getEmployeeRiwayatPendidikan");
  
	  return this.http.get('http://192.168.10.130:3030/get_dataemployee?jenis=riwayat_pendidikan&personalnum='+personalNumber).map(res => res.json());
	
   }
  
  
  
  
    //----------- PROFILE - END ---------------
   
   
   

   
   
}
