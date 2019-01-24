import { Component } from '@angular/core';
import { AppModuleProvider } from '../../providers/app-module/app-module';

/**
 * Generated class for the CoditionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export class ItemConditions{
  id: number = -1;
  name: string = "";
  icon : string =  "";
  description: string = "";
  vinaphone: string = "";
  mobiphone: string = "";
  constructor(){}

  parseData(data){
    if(data){
      if("id" in data) this.id = data.id;
      if("name" in data) this.name = data.name;
      if("icon" in data) this.icon = data.icon;
      if("description" in data) this.description = data.description;
      if("vinaphone" in data) this.vinaphone = data.vinaphone;
      if("mobiphone" in data) this.mobiphone = data.mobiphone;
    }
  }
  
}

export interface Social{
  name?: string;
  description?: string;
}

@Component({
  selector: 'codition',
  templateUrl: 'codition.html'
})
export class CoditionComponent {
  
  items: Array<ItemConditions> = [];

  constructor(public mAppModule: AppModuleProvider) {
    this.mAppModule.onLoadConfig().then(()=>{
      this.items = this.mAppModule.getAppConfig().get("conditions");
    })
  }

  onClickItem(item){
    this.mAppModule.showModal("ModalConditionPage",{item: item});
  }

}
