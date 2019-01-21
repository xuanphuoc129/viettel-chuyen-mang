import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Packages } from '../../providers/class/package';

/**
 * Generated class for the PackageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'package',
  templateUrl: 'package.html'
})
export class PackageComponent {

  @Input("package") mGoiCuocSelected: Packages;
  @Input("id") mID: string  = "";
  @Input("isHiddenButton") isHiddenButton: boolean = false;

  @Output("onSelect") mEvent = new EventEmitter();
  constructor() {

  }

  onClickSelect(){
    this.mID =  this.mGoiCuocSelected.id;
    this.mEvent.emit(this.mGoiCuocSelected.id);
  }
}
