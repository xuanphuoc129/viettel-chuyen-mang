import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotiModalPage } from './noti-modal';

@NgModule({
  declarations: [
    NotiModalPage,
  ],
  imports: [
    IonicPageModule.forChild(NotiModalPage),
  ],
})
export class NotiModalPageModule {}
