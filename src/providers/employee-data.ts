import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { UserData } from './user-data';


import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class EmployeeData {
	data: any;
	dataEmpIndividu: any;
	
	constructor(public http: Http, public user: UserData) { }

	async getAllEmployeeData() {
		console.log("Masuk function call ws");

		return new Promise(resolve => {
			this.http.get('http://192.168.10.130:3030/getlistpegawai')
				.subscribe(
					data => {
						resolve(JSON.parse(data['_body']));
					}
				);
		});
	}

	getDataIndividu() {
		return this.http.get('http://192.168.10.130:3030/get_dataemployee?jenis=profil&personalnum=50002712').map(res => res.json());
	}

	getEmployeeData(username: string) {
		// console.log("Masuk function call ws");
		return this.http.get('http://iopera.lps.go.id/lpsmobileappws.asmx/GetDataPegawai?username=' + username).map(res => res.json());
	}
}
