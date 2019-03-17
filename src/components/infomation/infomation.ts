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



  mCity: string = "Tỉnh/thành phố";
  mDistrict: string = "Quận/huyện";
  mLocal: string = "Xã/phường";
  mCityCode: string = "-1";
  mDistrictCode: string = "-1";
  mCommuneCode: string = "-1";

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
    if(this.mCityCode == "-1" || this.mDistrictCode == "-1" || this.mCommuneCode == "-1"){
      alert("Bạn chưa chọn địa chỉ");
      return;
    }

    if (Utils.kiemTraToanDauCach(this.name) || this.name.trim() == '') {
      this.nameBool = false;
      return false;
    } else {
      this.nameBool = true;
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
    let l3 = "Điện thoại liên hệ: " + this.phoneReceive + "\r \n" + ";";
    let l2 = "Địa chỉ: " + this.address + ", "+ this.mLocal + ", " + this.mDistrict + ", " + this.mCity + "; ";
    return l1 + l3 + l2;
  }

  onClickCity() {
    let array = [];
    let citys = this.mAppModuel.getDistrictManager().getCitys();
    citys.forEach(element => {
      array.push({
        id: element.code,
        name: element.name
      });
    });

    this.mAppModuel.showModal("SelectAddressPage", { params: { title: "Chọn tỉnh/thành phố", items: array, selected: this.mCityCode } }, (id) => {
      if (id) {
        if (id != this.mCityCode) {
          this.mCityCode = id;
          let index = citys.findIndex(ele => {
            return ele.code == this.mCityCode;
          })
          if (index > -1) {
            this.mCity = citys[index].name;
          }
        }
      }
    });

  }

  onClickDistrict() {
    if (this.mCityCode == "-1") {
      alert("Bạn chưa chọn tỉnh/thành phố");
      return;
    } else {
      let array = [];
      let districts = this.mAppModuel.getDistrictManager().getDistrictWithCityCode(this.mCityCode);
      districts.forEach(element => {
        array.push({
          id: element.code,
          name: element.cap + " " + element.name
        });
      });

      this.mAppModuel.showModal("SelectAddressPage", { params: { title: "Chọn quận/huyện", items: array, selected: this.mDistrictCode } }, (id) => {
        if (id) {
          if (id != this.mDistrictCode) {
            this.mDistrictCode = id;
            let index = districts.findIndex(ele => {
              return ele.code == this.mDistrictCode;
            })
            if (index > -1) {
              this.mDistrict = districts[index].cap + " " + districts[index].name;
            }
          }
        }
      });
    }
  }

  onClickCommune() {
    if (this.mDistrictCode == "-1") {
      alert("Bạn chưa chọn quận/huyện");
      return;
    } else {
      let array = [];
      let communes = this.mAppModuel.getDistrictManager().getDistrictWithDistrictCode(this.mDistrictCode);
      communes.forEach(element => {
        array.push({
          id: element.code,
          name: element.cap + " " + element.name
        });
      });

      this.mAppModuel.showModal("SelectAddressPage", { params: { title: "Chọn xã/phường", items: array, selected: this.mCommuneCode } }, (id) => {
        if (id) {
          if (id != this.mCommuneCode) {
            this.mCommuneCode = id;
            let index = communes.findIndex(ele => {
              return ele.code == this.mCommuneCode;
            })
            if (index > -1) {
              this.mLocal = communes[index].cap + " " + communes[index].name;
            }
          }
        }
      });
    }
  }


}
