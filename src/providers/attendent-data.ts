import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { UserData } from './user-data';


import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class AttendentData {
   data: any;

  constructor(public http: Http, public user: UserData) { }
  
	getabsentoday(personalnum: string) {
		console.log("Masuk function call getabsentoday2");

		return this.http.get('http://192.168.10.130:3030/getabsentoday?personalnum=' + personalnum).map(res => res.json());

	}
	getrekapabsen_pegawai(personalnum: string, tahun: string, bulan: string) {
		console.log("Masuk function call getrekapabsen_pegawai");
		return this.http.get('http://192.168.10.130:3030/getrekapabsen_pegawai?personalnum=' + personalnum + '&tahun=' + tahun+ '&bulan=' +bulan).map(res => res.json());
	}

	getAbsenPegawaiPerDate(username : string,date :string){
		      console.log("Masuk function call getAbsenPegawaiPerDate");
  
	  return this.http.get('http://192.168.10.130:3030/getabsentoday?username='+username+'&date='+date).map(res => res.json());
	
   }
   
   
	getAbsenPegawaiPerMonth(username : string,bulan :string,tahun :string){
		      console.log("Masuk function call ws getAbsenPegawaiPerMonth");
  
	  return this.http.get('http://iopera.lps.go.id/lpsmobileappws.asmx/GetAbsenPegawaiPerMonth?username='+username+'&monthPeriod='+bulan+'&yearPeriod='+tahun).map(res => res.json());
	
   }
   
   	insertAbsen(username : string){
		      console.log("Masuk function insert absen");
  
	  return this.http.get('http://192.168.10.130:3030/insertabsentoday?username='+username).map(res => res.json());
	
   }
   
   getTimeServer(){
		      console.log("Masuk function getTimeData");
  
	  return this.http.get('http://192.168.10.130:3030/gettimeServer').map(res => res.json());
	
   }
   
    checkPing(ipaddress : string){
		      console.log("Masuk function checkPing");
  
	  return this.http.get('http://192.168.10.130:3030/pingserver?ip='+ipaddress).map(res => res.json());
	
   }
   
   GetAbsenPegawaiCurrentYear(username : string){
		      console.log("Masuk function GetAbsenPegawaiCurrentYear");
  
			  return this.http.get('http://192.168.10.130:3030/getrekapabsenpegawai?year=2019&personalnum='+username).map(res => res.json());

   }


   
}
