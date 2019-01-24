import { NgModule } from '@angular/core';
import { HinhThucDauNoiComponent } from './hinh-thuc-dau-noi/hinh-thuc-dau-noi';
import { ChonGoiCuocComponent } from './chon-goi-cuoc/chon-goi-cuoc';
import { InfomationComponent } from './infomation/infomation';
import { AcceptRequestComponent } from './accept-request/accept-request';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { PackageComponent } from './package/package';
import { RecaptchaModule } from 'ng-recaptcha';
import { CoditionComponent } from './codition/codition';
import { FakeCustomerComponent } from './fake-customer/fake-customer';
import { QuestionAndAnswerComponent } from './question-and-answer/question-and-answer';

@NgModule({
    declarations: [HinhThucDauNoiComponent,
    FakeCustomerComponent,
    ChonGoiCuocComponent,
    InfomationComponent,
    AcceptRequestComponent,
    PackageComponent,
    CoditionComponent,
    QuestionAndAnswerComponent],
	imports: [
        IonicModule,
        CommonModule,
        RecaptchaModule.forRoot()
    ],
    
	exports: [HinhThucDauNoiComponent,
    ChonGoiCuocComponent,
    InfomationComponent,
    AcceptRequestComponent,
    FakeCustomerComponent,
    PackageComponent,
    CoditionComponent,
    QuestionAndAnswerComponent]
})
export class ComponentsModule {}
