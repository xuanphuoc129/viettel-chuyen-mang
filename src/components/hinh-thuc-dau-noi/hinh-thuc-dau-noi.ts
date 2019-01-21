import { Component, Output, EventEmitter } from '@angular/core';
import { Events } from 'ionic-angular';

/**
 * Generated class for the HinhThucDauNoiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'hinh-thuc-dau-noi',
  templateUrl: 'hinh-thuc-dau-noi.html'
})
export class HinhThucDauNoiComponent {

  @Output("onSelect") mEvent = new EventEmitter();

  mQuestion: string = "Lựa chọn hình thức hoà mạng tại Viettel";

  typeConnects: Array<{id: number, name: string}> = [
    {id: 1, name: "Trả trước"},
    {id: 2, name: "Trả sau"}
  ];

  mID: number = -1;

  constructor() {
    
  }

  onClickItem(item){
    this.mID = item.id;
    this.mEvent.emit(this.typeConnects[this.mID - 1]);
  }

}
