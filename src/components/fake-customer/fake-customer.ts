import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AppModuleProvider } from '../../providers/app-module/app-module';
import { Citys } from '../../providers/class/District';
import { Utils } from '../../providers/util';

/**
 * Generated class for the FakeCustomerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fake-customer',
  templateUrl: 'fake-customer.html'
})
export class FakeCustomerComponent {
  @ViewChild("fakeCustomer") mNativeEle: ElementRef;
  divID: string = "fakeId";
  customer: { name: string, address: string } = { name: "A", address: "Ha noi" };

  names: Array<string> = [];
  citys: Array<Citys> = [];

  count: number = 0;

  constructor(
    public mRender2: Renderer2,
    public mAppModule: AppModuleProvider) {
    this.mAppModule.onLoadNameCustomerFile().then((data) => {
      if (data) {
        this.names = data["danhsach"];
      }
    }).catch(err => {

    })

    this.mAppModule.onReadFileJson("./assets/data/tinh_tp.json").then((data) => {
      if (data) {
        this.onResponseCitys(data["tinh_tp"]);
      }
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.onLoadName();
    }, 3000);

    setInterval(() => {
      this.onLoadName();
    }, 45000)
  }

  onResponseCitys(data) {
    this.citys = [];
    if (data && data.length > 0) {
      data.forEach(element => {
        let newEle = new Citys();
        newEle.parse(element);
        this.citys.push(newEle);
      });
    }
  }

  onLoadName() {
    if (this.names.length == 0 || this.citys.length == 0) return;

    let nameIndex = Utils.randInt(0, this.names.length);
    let cityIndex = Utils.randInt(0, this.citys.length);

    this.customer.name = this.names[nameIndex];
    this.customer.address = this.citys[cityIndex].name;

    let element = document.getElementById(this.divID);
    if (element) {
      element.style.display = "flex";
    }

    setTimeout(() => {
      this.mRender2.addClass(this.mNativeEle.nativeElement, "slideOutLeft");
      setTimeout(() => {
        this.mRender2.removeClass(this.mNativeEle.nativeElement, "slideOutLeft");
        element.style.display = "none";
      }, 1000);
    }, 5000);
  }

}
