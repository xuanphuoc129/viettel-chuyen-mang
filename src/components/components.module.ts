import { NgModule } from '@angular/core';
import { HinhThucDauNoiComponent } from './hinh-thuc-dau-noi/hinh-thuc-dau-noi';
import { ChonGoiCuocComponent } from './chon-goi-cuoc/chon-goi-cuoc';
import { InfomationComponent } from './infomation/infomation';
import { AcceptRequestComponent } from './accept-request/accept-request';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { PackageComponent } from './package/package';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
	declarations: [HinhThucDauNoiComponent,
    ChonGoiCuocComponent,
    InfomationComponent,
    AcceptRequestComponent,
    PackageComponent],
	imports: [
        IonicModule,
        CommonModule,
        RecaptchaModule.forRoot()
    ],
    
	exports: [HinhThucDauNoiComponent,
    ChonGoiCuocComponent,
    InfomationComponent,
    AcceptRequestComponent,
    PackageComponent]
})
export class ComponentsModule {}
