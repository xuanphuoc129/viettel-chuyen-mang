import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AppConfig } from '../app-config';
import { ScrollOption, ScrollController } from './scroll-controller';
import { EmailConfig } from '../class/email-config';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StorageController } from './storage';

declare var Email;
/*
  Generated class for the AppModuleProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppModuleProvider {
  private mAppConfig: AppConfig;
  public mScrollController: ScrollController = new ScrollController();
  private mEmailConfig: EmailConfig = null;
  private mStorageController: StorageController;
  phone_number: string = "";
  constructor(
    public mStorage: Storage,
    public mToastController: ToastController,
    public http: Http) {
    this.mAppConfig = new AppConfig();
    this.mEmailConfig = new EmailConfig();
    this.mStorageController = new StorageController();
    this.mStorageController.setStorage(this.mStorage);
  }
  public getStorageController() {
    return this.mStorageController;
  }

  public getAppConfig() {
    return this.mAppConfig;
  }

  private getEmailConfig() {
    return this.mEmailConfig;
  }

  public onReadFileJson(link: string) {
    return new Promise((resolve, reject) => {

      this.http.get(link).map(res => res.json()).subscribe(data => {
        if (data) {
          resolve(data);
        } else {
          reject();
        }
      });
    })
  }

  public onResponseConfig(data) {
    let dataConfig = {
      email_receive: "kunlyblack@gmail.com",
      email_sender: "cuahangviettel.vn@gmail.com",
      smtp_server: "smtp.gmail.com",
      username: "cuahangviettel.vn@gmail.com",
      password: "eknpglqnwzyydbur"
    };
    this.getEmailConfig().parseData(dataConfig);
    this.phone_number = this.getAppConfig().get("phone_number");
  }

  public onLoadConfig() {
    return new Promise((resolve, reject) => {
      if (this.mAppConfig.hasData()) resolve();
      this.onReadFileJson("./assets/data.json").then((data) => {
        if (data) {
          this.mAppConfig.onResponseConfig(data);
          this.onResponseConfig(data);
          resolve(this.mAppConfig);
        }
      }).catch(err => {
        reject(err);
      })
    })

  }

  public doScrollLeft(id, left) {
    let option: ScrollOption = {
      callback: null,
      alpha: 0.4,
      epsilon: 1
    }
    this.mScrollController.doScrollLeft(id, left, option);
  }

  public sendEmail(body) {
    this.doCheckFiveMinutes().then((res) => {
      Email.send(this.mEmailConfig.email_sender,
        this.mEmailConfig.email_receive,
        "Chuyển Mạng Giữ Số",
        body,
        this.mEmailConfig.smtp_server,
        this.mEmailConfig.username,
        this.mEmailConfig.password);
      let time = new Date();
      this.getStorageController().saveDataToStorage("time_send", time.getTime());
    }).catch(err=>{
      
    })

  }

  public showToast(params) {
    this.mToastController.create({
      message: params,
      duration: 3000,
      position: "bottom"
    }).present();
  }

  doCheckFiveMinutes() {
    return new Promise((resolve, reject) => {
      this.getStorageController().getDataFromStorage("time_send").then((res) => {
        if (res) {
          let time = parseInt(res);
          let nowTime = new Date().getTime();
          let distance = nowTime - time;
          if (Math.floor(distance / 60000) < 3) {
            reject(false);
            alert("Vui lòng đăng ký lại sau ít phút hoặc liên hệ hotline " + this.phone_number + " để được hỗ trợ");
          } else {
            resolve(true);
          }
        } else {
          resolve(true);
        }
      });
    })

  }

}
