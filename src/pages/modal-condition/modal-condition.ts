import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemConditions } from '../../components/codition/codition';

/**
 * Generated class for the ModalConditionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-condition',
  templateUrl: 'modal-condition.html',
})
export class ModalConditionPage {

  item: ItemConditions = new ItemConditions();

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    if (this.navParams.data["item"]) {
      this.item = this.navParams.get("item");
    }
  }

  ionViewDidLoad() {

  }

}
