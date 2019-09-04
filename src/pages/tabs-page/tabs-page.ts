import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AccountPage } from '../account/account';

import { HomePage } from '../home/home';
import { NewsPage } from '../news/news-list';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = HomePage;
  tab2Root: any = NewsPage;
  tab3Root: any = AccountPage;

  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
