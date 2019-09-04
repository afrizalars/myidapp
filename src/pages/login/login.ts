import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthenticationPersonal } from '../../interfaces/authentication-personal';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
//import { UtilityProvider } from '../providers/utility/utility';

// import { TabsPage } from '../tabs-page/tabs-page';
import { LoadingController } from 'ionic-angular';
import { UtilityProvider } from '../../providers/utility/utility';
// import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
// import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
// import { SignupPage } from '../signup/signup';

// declare var WifiInfo: any;


// @IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {



  backgrounds = [
    'assets/img/background/background-1.jpg',
    'assets/img/background/background-2.jpg',
    'assets/img/background/background-3.jpg',
    'assets/img/background/background-4.jpg'
  ];
  public loginForm: any;
  public authResult: any;
  public registerForm: any;
  public auth: string;
  public p: number;
  public ResultServices: any;
  public ResultTest: any;
  loading: any;
  login: UserOptions = { username: '', password: '' };

  submitted = false;

  scanData : {};
  // barcodeScannerOptions: BarcodeScannerOptions;
// options :BarcodeScannerOptions;
  constructor(
   // private faio: FingerprintAIO,
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public userData: UserData,
    public utility: UtilityProvider,
  //  private barcodeScanner: BarcodeScanner,
    private authenticationPersonal : AuthenticationPersonal,
    // public ngZone: NgZone,
    private uniqueDeviceID: UniqueDeviceID,
    public alertCtrl: AlertController,

    //private router : Router,

  ) {
    // this.barcodeScannerOptions = {
    //   showTorchButton: true,
    //   showFlipCameraButton: true
    // };
   }

  ngOnInit() {
    this.p = 0;
    console.log('Hello LoginBackgroundSlider Page');

  }



  openRegisterAccount() {
    this.p = 1;

  }
  openLoginAccount() {
    this.p = 0;

  }
  // async onLogin(form: NgForm) {
  async onLogin(form: NgForm) {
    this.loading = this.loadingController.create({ content: "Logging in ,please wait..." });
    this.loading.present();
    this.submitted = true;
    this.auth = '0';

    // if (form.valid) {

    // this.userData.login(this.login.username);

    // this.navCtrl.push(TabsPage);
    // }

    if (form.valid) {
      this.ResultTest = await this.userData.checkAuth(this.login.username, this.login.password);

      console.log('getData xx: ' + this.login.username + ' XXX ' + this.ResultTest);

      if (this.ResultTest.result.status == "YES") {
        this.userData.login(this.login.username);
        this.navCtrl.setRoot('TabsPage')
        //   this.navCtrl.push(TabsPage);
        
        // this.navCtrl.setRoot('HomePage')

      } else {
        this.showAlert('Login', this.ResultTest.result.message);
      }


    }
    this.loading.dismiss();
  }

 async loginWithFingerPrint() {
  this.loading = this.loadingController.create({ content: "Logging in ,please wait..." });
    this.loading.present();
    this.authResult = await this.authenticationPersonal.checkAuthApproval("biometric");
console.log("Return :"+this.authResult);
    this.showAlert('Login',JSON.stringify(this.authResult) );
    if (this.authResult=="OK"){
    
    this.userData.login(this.login.username)
    this.navCtrl.setRoot('TabsPage')
    }

    this.loading.dismiss();
        // if (localStorage.getItem("PersonalNumber") == null) {
        //   this.showAlert('Login',"Harap register untuk menggunakan fitur ini !" );
        // } else {
    
    
    
        //   this.faio.show({
        //     clientId: 'Fingerprint-Demo',
        //     clientSecret: 'password', //Only necessary for Android
        //     disableBackup: true,  //Only for Android(optional)
        //     localizedFallbackTitle: 'Use Pin', //Only for iOS
        //     localizedReason: 'Please authenticate' //Only for iOS
        //   })
        //     .then((result: any) => 
        //     {
        //       console.log(result);
        //       this.userData.login(this.login.username);
          
        //     this.navCtrl.setRoot('TabsPage')

    
        //     })
        //     .catch((error: any) => 
        //     {console.log(error);
              
        //     }
        //     );
        // }




   
  }
  async loginWithBarcode() {
   
    this.loading = this.loadingController.create({ content: "Logging in ,please wait..." });
    this.loading.present();
    this.authResult = await this.authenticationPersonal.checkAuthApproval("barcode");
console.log("Return :"+this.authResult);
    this.showAlert('Login',JSON.stringify(this.authResult) );
    if (this.authResult=="OK"){
    
    this.userData.login(this.login.username)
    this.navCtrl.setRoot('TabsPage')
    }

    this.loading.dismiss();
    //console.log(aResult);
   // this.showAlert('Login',JSON.stringify(aResult) );
      // this.barcodeScanner
      // .scan()
      // .then(barcodeData => {
      //   alert("Barcode data " + JSON.stringify(barcodeData));
      //   this.scanData = barcodeData;
      // })
      // .catch(err => {
      //   this.showAlert('Register', err);

      
      // });
       
   

  }


  async onRegister(form: NgForm) {
    this.loading = this.loadingController.create({ content: "Logging in ,please wait..." });
    this.loading.present();
    this.submitted = true;
    this.auth = '0';

    if (form.valid) {
      console.log("register username : " + this.login.username);

      this.userData.regDeviceID(this.login.username).subscribe((resp) => {

        console.log("Result : " + JSON.stringify(resp));
        console.log(resp)
        this.ResultServices = resp.result[0].status.split("|", 2);


        if (this.ResultServices[0] == "OK") {
          localStorage.setItem("PersonalNumber", resp.result[0].personalnum);
          localStorage.setItem("username", this.login.username);
          //   this.loading.dismiss();
          this.showAlert('Register', this.ResultServices[1]);
          this.p = 0;
        } else {
          //  this.loading.dismiss();
          this.showAlert('Register', this.ResultServices[1]);
          this.p = 0;
        }

      });
    }
    this.loading.dismiss();
  }

  getDeviceID() {
    this.uniqueDeviceID.get()
      .then((uuid: any) => console.log(uuid))
      .catch((error: any) => console.log(error));

  }

  showAlert(title: string, msg: string) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
