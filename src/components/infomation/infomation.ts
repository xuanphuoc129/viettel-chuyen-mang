import { HttpClient } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { Events } from 'ionic-angular';
import { Utils } from '../../providers/util';
import { AppModuleProvider } from '../../providers/app-module/app-module';

/**
 * Generated class for the InfomationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'infomation',
  templateUrl: 'infomation.html'
})
export class InfomationComponent {

  text: string;

  captchaPassed: boolean = false;
  captchaResponse: string;

  name: string = "";
  phoneReceive: string = "";
  phoneConvert: string = "";
  address: string = "";

  nameBool: boolean = true;
  phoneConvertBool: boolean = true;
  phoneReceiveBool: boolean = true;
  sitekey: string = "";

  constructor(
    public mAppModuel: AppModuleProvider,
    public mEvents: Events, private zone: NgZone) {
    console.log('Hello InfomationComponent Component');
    this.text = 'Hello World';
    this.mAppModuel.onLoadConfig().then(() => {
      this.sitekey = this.mAppModuel.getAppConfig().get("sitekey");
    })
  }


  captchaResolved(response: string): void {

    this.zone.run(() => {
      this.captchaPassed = true;
      this.captchaResponse = response;
    });

  }

  ngAfterViewInit() {
    this.mEvents.subscribe("onClickNext", () => {
      this.mEvents.publish("resul-checkform", this.checkForm());
    })

    this.mEvents.subscribe("sendmail-success",()=>{
      this.name = "";
      this.address = "";
      this.phoneConvert = "";
      this.phoneReceive = "";
      this.nameBool = true;
      this.phoneConvertBool = true;
      this.phoneReceiveBool = true;
    })
  }

  checkForm() {
    if (Utils.kiemTraToanDauCach(this.name) || this.name.trim() == '') {
      this.nameBool = false;
      return false;
    } else {
      this.nameBool = true;
    }

    if (!Utils.isValidPhone(this.phoneConvert) || this.phoneConvert.length < 9 || this.phoneConvert.length > 11 || parseInt(this.phoneConvert) < 299999999) {
      this.phoneConvertBool = false;
      return false;
    } else {
      this.phoneConvertBool = true;
    }

    if (!Utils.isValidPhone(this.phoneReceive) || this.phoneReceive.length < 9 || this.phoneReceive.length > 11 || parseInt(this.phoneReceive) < 299999999) {
      this.phoneReceiveBool = false;
      return false;
    } else {
      this.phoneReceiveBool = true;
    }

    // if (!this.captchaPassed) {
    //   alert("Bạn chưa đánh dấu capcha!")
    //   return;
    // }

    return true;
  }

  onInput() {
    this.nameBool = true;
  }

  onClickSend() {
    if (this.checkForm()) {
      this.mEvents.publish("sendmail", this.createBodyEmail());
    }
  }

  createBodyEmail() {
    let l1 = "Họ tên: " + this.name + ";";
    let l2 = "Điện thoại chuyển đổi: " + this.phoneConvert + "\r \n" + ";";
    let l3 = "Điện thoại liên hệ: " + this.phoneReceive + "\r \n" + ";";
    let l4 = "Địa chỉ: " + this.address + "\r \n" + ";";

    return l1 + l2 + l3 + l4;
  }


}
