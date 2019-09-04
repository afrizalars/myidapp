import { Injectable } from '@angular/core';
import { ApiData } from '../providers/api-data';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { UtilityProvider } from '../providers/utility/utility';




import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class AuthenticationPersonal {

  // authType: string;
  resultBarcode: string;
  public resultBarcodeServer: any;
  personalNumber: string;
  barcodeScannerOptions: BarcodeScannerOptions;
  options: BarcodeScannerOptions;
  public endResult: string;



  constructor(
    public events: Events,
    public storage: Storage,
    private faio: FingerprintAIO,
    private barcodeScanner: BarcodeScanner,
    private utility: UtilityProvider,
    private apiData: ApiData,
    public http: Http
  ) {

    this.personalNumber = localStorage.getItem("PersonalNumber");
  }

  public async checkAuthApproval(authType: string): Promise<string> {

    //this.utility.presentAlert("test alert!");

    if (authType == "biometric") {
      if (this.personalNumber == "") {
         this.utility.presentAlert("Device not registered!");
         console.log("Error1");
         this.utility.presentAlert("Error1");
        // return;
      }
      else {
        //Check if Fingerprint or Face  is available
       await this.faio.isAvailable()
          .then(result => {
            if (result === "finger" || result === "face") {
              //Fingerprint or Face Auth is available
               this.faio.show({
                clientId: 'NihinDemoBioAuthApp',
                clientSecret: 'nihinBioAuthDemo', //Only necessary for Android
                disableBackup: true, //Only for Android(optional)
                localizedFallbackTitle: 'Use Pin', //Only for iOS
                localizedReason: 'Please Authenticate' //Only for iOS
              })
                .then((result: any) => {
                  // if (result == "Success") {
                  //   console.log("ErBerhasil!");
                  //   this.utility.presentAlert("Berhasil");
                  //   //Fingerprint/Face was successfully verified
                  //   //Go to dashboard
                  //   //  this.setAndGet.UserName = this.data.userName;
                  //   //  this.navCtrl.push("DashboardPage")
                  //    this.endResult = "OK";
                  // }
                  // else {
                  //   this.utility.presentAlert("Gagal");
                  //   //Fingerprint/Face was not successfully verified
                  //   this.utility.presentAlert(result);
                  // }
                  this.utility.presentAlert(JSON.stringify(result));
                  console.log(result);
                  return "OK";
                })
                .catch((error: any) => {
                  //Fingerprint/Face was not successfully verified
                  this.utility.presentAlert("Error2");
                  console.log("Error2");
                  this.utility.presentAlert(error);
                });
            }
            else {
              //Fingerprint or Face Auth is not available
              this.utility.presentAlert("Fingerprint/Face Auth is not available on this device!");
            }
          })
      }
    }

    //  await this.faio.show({
    //     clientId: 'Fingerprint-Demo',
    //     clientSecret: 'password', //Only necessary for Android
    //     disableBackup: true,  //Only for Android(optional)
    //     localizedFallbackTitle: 'Use Pin', //Only for iOS
    //     localizedReason: 'Please authenticate' //Only for iOS
    //   })
    //     .then((result: any) => {
    //       console.log(result);


    //       this.endResult =  "OK";

    //     })
    //     .catch((error: any) => {
    //       console.log(error);
    //       this.endResult= "NOK";
    //     }
    //     );

    //}
    if (authType == "barcode") {

      await this.barcodeScanner
        .scan()
        .then(barcodeData => {

          let textFind = barcodeData.text.split("=", 3)
          this.resultBarcode = textFind[2] + "=";




        })
        .catch(err => {
          console.log(err);
          this.endResult = "NOK";
        })

      await this.apiData.getAuthBarcode(this.resultBarcode).then((result) => {
        this.resultBarcodeServer = result;


      });
      if (this.personalNumber != this.resultBarcodeServer.PersonalNumber) {
        this.utility.presentAlert("ID is not registered on this device!");
        // this.endResult = "ID anda tidak terdaftar pada device ini !";

      } else {

        this.endResult = "OK";

      }



      return this.endResult;

    }


  }
}





