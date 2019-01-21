import { Component } from '@angular/core';
import { AppModuleProvider } from '../../providers/app-module/app-module';

/**
 * Generated class for the AcceptRequestComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'accept-request',
  templateUrl: 'accept-request.html'
})
export class AcceptRequestComponent {

  items: Array<any> = [];
  notes: string = "";

  constructor(public mAppModule: AppModuleProvider) {
      this.mAppModule.onLoadConfig().then(()=>{
        this.items = this.mAppModule.getAppConfig().get("accept_request");
        this.items[2].description.replace("#1","'checkmark'");
        this.items[2].description.replace("#2","'close'");

        let notedata = this.mAppModule.getAppConfig().get("note");
        this.notes = notedata.split("\n");
      })
  }

}
