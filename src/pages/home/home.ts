import { Component, ViewChild } from '@angular/core';
import { NavController, Events, Content, ModalController, AlertController } from 'ionic-angular';
import { AppModuleProvider } from '../../providers/app-module/app-module';
import { Packages } from '../../providers/class/package';
import { PackagesPayForward } from '../../components/chon-goi-cuoc/chon-goi-cuoc';
import { ScrollItems } from '../../providers/app-module/scroll-controller';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Content) myContent: Content;

  name: string = "Chuyển mạng giữ số";
  logo_vt: string = "./assets/imgs/logo-vt.png";
  logo_vt_m: string = "./assets/imgs/logo_viettel2.png";
  btn_blue: string = "Đăng ký";
  btn_gray: string = "Tra cứu điều kiện";
  btn_gray_2: string = "Câu hỏi thường gặp";
  url_home: string = "";

  reason_bg: string = "./assets/imgs/bg-reason-w.png";
  r_title: string = "05 lý do";
  r_sub_title: string = "Chọn mạng Viettel";
  reasons: Array<any> = [];
  btn_sign: string = "đăng ký ngay";

  mouse: string = "./assets/imgs/vt-mouse.png";
  left: string = "./assets/imgs/vt-left.png";
  right: string = "./assets/imgs/vt-right.png";
  dkchuyenmang: string = "Đăng ký chuyển mạng";
  sub_title: string = "Đăng ký chuyển mạng ngay hôm nay để được ưu tiên và hỗ trợ tốt nhất";
  note: string = "Lưu ý: Thuê bao đăng ký chuyển mạng phải là thuê bao đang hòa mạng trả sau";

  sign_bg: string = "./assets/imgs/bg-regis.png";

  steps: Array<{ id: number, name: string }> = [
    { id: 1, name: "Hình thức đấu nối" },
    { id: 2, name: "Chọn gói cước" },
    { id: 3, name: "Nhập thông tin" },
    { id: 4, name: "Xác nhận yêu cầu" }
  ];

  stepID: number = 1;
  mLineElement: HTMLElement;
  typeConnect: any;
  typeID: number = -1;

  mPackagePayAfter: Packages = new Packages();
  mPackagesPayForward: PackagesPayForward = new PackagesPayForward();


  mStepDones: Array<boolean> = [false, false, false, false];
  mListItems: ScrollItems = null;
  currentIndex: number = 0;
  dots: Array<number> = [];

  phi_chuyen_mang: string = "";
  notes: Array<string> = [];


  mId: number = 2;
  constructor(
    public mAlertController: AlertController,
    public mModalControl: ModalController,
    public mEvents: Events,
    public mAppmodule: AppModuleProvider,
    public navCtrl: NavController) {
    this.mAppmodule.onLoadDistrict();
    this.mAppmodule.onLoadConfig().then(() => {
      this.onLoadConfigDone();
    })
    if (screen.width < 575) {
      this.reason_bg = "./assets/imgs/bg-reason-m.png";
    }
    this.dots = [1, 2, 3];
    this.mId = 1;
  }

  onLoadConfigDone() {
    this.reasons = this.mAppmodule.getAppConfig().get("reason");
    this.phi_chuyen_mang = this.mAppmodule.getAppConfig().get("phi_chuyen_mang");
    let notedata = this.mAppmodule.getAppConfig().get("note");
    this.notes = notedata.split("\n");
  }

  onSwipe(e) {
    let direction = e.direction;
    if (direction == 4) {
      this.doScrollPrevious();
    } else if (direction == 2) {
      this.doScrollNext();
    } else {
      return;
    }
  }

  ionViewDidLoad() {

    setTimeout(() => {
      this.mListItems = new ScrollItems("rowID");
    }, 300);

    this.mEvents.subscribe("sendmail", (data) => {
      let l5 = "Gói cước: ";
      if (this.typeID == 1) {
        l5 += this.mPackagesPayForward.name;
      } else {
        l5 += this.mPackagePayAfter.name;
      }
      let l6 = "Hình thức đấu nối : " + this.typeConnect.name;

      if (this.typeConnect.id == 1) {
        this.mAppmodule.sendEmail(l6 + ";" + data);
      } else {
        this.mAppmodule.sendEmail(l6 + ";" + data + l5);
      }

      this.mAppmodule.showToast("Bạn đã đăng ký thành công");
      this.mEvents.publish("sendmail-success");
      this.mStepDones[2] = true;
      this.onClickNext();
    });

    this.mEvents.subscribe("clickSearch", () => {
        this.onClickCondition();
    })
    this.mEvents.subscribe("clickSignup", () => {
      this.onClickSign();
    })
    this.mEvents.subscribe("clickQuestion", () => {
      this.mId = 1;
      setTimeout(() => {
        this.onClickQuestion();
      }, 200);
    })
  }

  onClickStep(item) {
    let newId = item.id;
    // console.log(newId);
    // console.log(this.typeConnect.id);
    
    if (newId > this.stepID && (!this.mStepDones[newId - 2] || !this.mStepDones[this.stepID - 1])) {
      this.mAppmodule.showToast("Bạn chưa hoàn thành bước hiện tại");
      return;
    }
    if (newId == 4 && this.mStepDones[2]) {
      this.onShowModal();
      return;
    }

    if (this.typeConnect.id == 1 && newId == 2) {
      return;
    }

    this.stepID = newId;
    this.doTransformLine();
  }

  doTransformLine() {
    if (!this.mLineElement) {
      this.mLineElement = document.getElementById("lineColorID");
    }
    if (this.mLineElement) {
      this.mLineElement.style.transform = "scaleX(" + (0.3333 * (this.stepID - 1)) + ") translateY(-50%)";
    }
    this.doScrollToRegis();
  }

  onClickCondition() {
    this.mId = 2;
    setTimeout(() => {
      this.myContent.scrollToTop(300);
    }, 200);
  }

  onClickSign() {
    this.mId = 1;
    setTimeout(() => {
      this.doScrollSign();
    }, 200);
  }

  doScrollSign() {
    let ele = document.getElementById("signupId");
    if (ele) {
      this.myContent.scrollTo(0, ele.offsetTop, 600);
    }
  }


  doScrollToRegis() {
    let ele = document.getElementById("regisID");
    if (ele) {
      this.myContent.scrollTo(0, ele.offsetTop, 600);
    }
  }

  onChangeTypeConnect($event) {
    this.typeConnect = $event;
    this.typeID = this.typeConnect.id;
    this.doShowAnimation("typeConnectID");
    this.mStepDones[0] = true;
    this.mEvents.publish("change-type-connect", this.typeID);
    this.mPackagePayAfter = new Packages();
    this.mPackagesPayForward = new PackagesPayForward();
    this.mStepDones[1] = false;
  }

  doShowAnimation(id: string) {
    let ele = document.getElementById(id);
    if (ele) {
      ele.style.animation = "none";
      setTimeout(() => {
        ele.style.animationName = "pulse";
        ele.style.animationDuration = "300ms";
      }, 100);
    }
  }

  onChangePackage(event) {
    if (this.typeID == 1) {
      this.mPackagesPayForward = event;
      this.mPackagePayAfter = new Packages();
      this.mEvents.publish("change-package", 'after');
    } else {
      this.mPackagePayAfter = event;
      this.mPackagesPayForward = new PackagesPayForward();
      this.mEvents.publish("change-package", 'before');
    }
    this.mStepDones[1] = true;
    this.doShowAnimation("packageID");
    if (this.typeID == 2) {
      setTimeout(() => {
        this.onClickNext();
      }, 500);
    }
  }

  onShowNotiModal() {
    if (screen.width > 575) {
      let modal = this.mModalControl.create("NotiModalPage");
      modal.present();
    } else {
      let alert = this.mAlertController.create({
        title: "Thông báo",
        message: "Hiện tại hình thức chuyển mạng sang gói trả trước chưa được áp dụng"
      });
      alert.addButton("Ok");
      alert.present();
    }
  }

  onShowModal() {
    let modal = this.mModalControl.create("AcceptModalPage");
    modal.present();
    return;
  }

  onClickNext() {
    if (!this.mStepDones[this.stepID - 1]) {
      this.mAppmodule.showToast("Bạn chưa hoàn thành bước hiện tại");
      return;
    }

    if (this.stepID == 1 && this.typeConnect.id == 1) {
      // this.onShowNotiModal();
      // return;
      this.stepID = 2;
    }

    if (this.stepID == 3) {
      this.onShowModal();
    }

    this.stepID++;
    this.doTransformLine();
    this.doScrollToRegis();
  }

  onClickBack() {
    if (this.stepID == 3 && this.typeConnect.id == 1) {
      this.stepID = 2;
    }
    this.stepID--;
    this.doTransformLine();
    this.doScrollToRegis();

  }

  doScrollPrevious() {
    if (this.currentIndex == 0) return;
    this.currentIndex--;
    this.mAppmodule.doScrollLeft("rowID", this.doCaculateDistance());
  }

  doScrollNext() {
    if (this.currentIndex == 2) return;
    this.currentIndex++;
    this.mAppmodule.doScrollLeft("rowID", this.doCaculateDistance());
  }

  doCaculateDistance() {
    let maxLeft = this.mListItems.mElement.scrollWidth - this.mListItems.mElement.clientWidth;
    let left = this.mListItems.mItemWidth * 2 * this.currentIndex;
    console.log(this.mListItems.mItemWidth);

    if (left > maxLeft) {
      left = maxLeft;
    }
    return left;
  }

  scrollToBottom() {
    this.myContent.scrollToBottom(200);
  }

  onClickAddFab() {
    this.mAppmodule.showModal("MenuShowModalPage", null);
  }


  onClickQuestion() {
    let divID = "questionanswer";
    let ele = document.getElementById(divID);
    if (ele) {
      this.myContent.scrollTo(0, ele.offsetTop, 600);
    }
  }
}
