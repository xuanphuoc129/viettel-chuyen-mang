import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcceptModalPage } from './accept-modal';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AcceptModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AcceptModalPage),
    ComponentsModule
  ],
})
export class AcceptModalPageModule {}
