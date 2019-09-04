import { Component } from '@angular/core';

import {


  Config,
  NavController
} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ApiData } from '../../providers/api-data';
 import { LoadingController } from 'ionic-angular';
 // import { NewsDetailPage } from '../news-detail/news-detail';
 // import { InAppBrowser } from '@ionic-native/in-app-browser';





@Component({
  selector: 'page-news-list',
  templateUrl: 'news-list.html'
})
export class NewsPage {
	public newsData: any;
 
  pic : string = 'assets/img/news.png';
   loading: any;
 

  constructor(
   
    public navCtrl: NavController,
	public loadingController: LoadingController,
	public apiData: ApiData,
    public config: Config,
    public inAppBrowser: InAppBrowser
  ) {}

  ionViewDidLoad() {
	
   this.getNews();
  }

   getNews(){
	  this.loading = this.loadingController.create({ content: "Please wait..." });
     this.loading.present();
	
    this.apiData.getNews().subscribe((result) => {
		this.newsData=result.news;
				 
	});
	this.loading.dismiss();
	// this.loading.dismissAll();
   }

   goToNewsDetail(item: any) {
    // go to the session detail page
    // and pass in the session data
 this.inAppBrowser.create(item.link, '_self', 'zoom=no');
  //  this.navCtrl.push(NewsDetailPage, { item: item});
  }
}
