import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserData } from './user-data';
import { Storage } from '@ionic/storage';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/of';

@Injectable()
export class Employe_Session {
	data: any;

	constructor(public http: Http, public user: UserData, public storage: Storage) { }

	async getDataEmployee() {
        console.log("test storage")

		return new Promise(resolve => {
			this.http.get('192.168.10.130:3030/get_dataemployee?jenis=profil&personalnum=50002712')
				.subscribe(
					data => {
						resolve(JSON.parse(data['_body']));
					}
				);
		});
	}
}