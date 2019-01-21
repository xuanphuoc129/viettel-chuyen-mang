import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Packages } from '../../providers/class/package';
import { AppModuleProvider } from '../../providers/app-module/app-module';
import { Events } from 'ionic-angular';

/**
 * Generated class for the ChonGoiCuocComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export class PackagesPayForward {
  id: string = "";
  name: string = "";
  description: string = "";

  constructor(data?: any) {
    if (data) {
      this.parseData(data);
    }
  }

  parseData(data) {
    if (data) {
      if ("id" in data) this.id = data.id;
      if ("name" in data) this.name = data.name;
      if ("description" in data) this.description = data.description;
    }
  }
}

@Component({
  selector: 'chon-goi-cuoc',
  templateUrl: 'chon-goi-cuoc.html'
})
export class ChonGoiCuocComponent {

  text: string;
  mPackage: Array<Packages> = [];
  mPackage2: Array<PackagesPayForward> = [];


  mPackageIDSelected: string = "";
  mPackageID: string = "";

  @Input("type") type: number = -1;
  @Output("onChange") mEvent = new EventEmitter();


  constructor(public mAppModule: AppModuleProvider, public mEvents: Events) {
    this.onLoadData();
  }

  ngAfterViewInit() {
    this.mEvents.subscribe("change-type-connect", (data) => {
      this.type =  data;
      this.onLoadConfigSuccess();
    });

    this.mEvents.subscribe("change-package",(data)=>{
      if(data == 'before'){
        this.mPackageID = "";
      }else{
        this.mPackageIDSelected = "";
      }
    })
  }

  onLoadData() {
    this.mAppModule.onLoadConfig().then(() => {
      this.onLoadConfigSuccess();
    })
  }

  onLoadConfigSuccess() {
    this.mPackage2 = [];
    this.mPackage = [];

    if (this.type == 1) {
      let data = this.mAppModule.getAppConfig().get("goicuoc")["ds_goicuoc_tratruoc"];
      data.forEach(element => {
        this.mPackage2.push(new PackagesPayForward(element));
      });
    } else {
      let data = this.mAppModule.getAppConfig().get("goicuoc")["ds_goicuoc_trasau"];
      data.forEach(element => {
        this.mPackage.push(new Packages(element));
      });
    }
  }

  onChange($event) {
    this.mPackageIDSelected = $event;
    let index = this.mPackage.findIndex(ele => {
      return ele.id == this.mPackageIDSelected;
    })

    if (index > -1) {
      this.mEvent.emit(this.mPackage[index]);
    }
  }

  onClickPackage(item){
    this.mPackageID =  item.id;
    this.mEvent.emit(item);
  }
}
