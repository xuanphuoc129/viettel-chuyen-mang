import { Component } from '@angular/core';
import { AppModuleProvider } from '../../providers/app-module/app-module';

/**
 * Generated class for the QuestionAndAnswerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export class Questions{
  id: string = "";
  question: string = "";
  answer : string = "";
  constructor(){}
  parseData(data){
      if(data){
          if("question" in data){
              this.question = data.question;
          }
          if("answer" in data){
              this.answer = data.answer;
          }
      }
  }
}

@Component({
  selector: 'question-and-answer',
  templateUrl: 'question-and-answer.html'
})
export class QuestionAndAnswerComponent {

  mQuestions: Array<Questions> = [];
  mQuestions2: Array<Questions> = [];
  mQuestionSelected: number = -1;
  mMode: number = 1;

  mCurrentIndex: number = 0;
  constructor(public mAppModule: AppModuleProvider) {
    this.mAppModule.onReadFileJson("./assets/data/cau_hoi_thuong_gap.json").then((data)=>{
      this.mQuestions = data["Sheet1"];
      this.mQuestions2 = this.mQuestions.filter((ele, index) => {
        return index < 5;
      })
    })
  }

  onClickQuestion(item) {
    if (item == this.mQuestionSelected) {
      this.mQuestionSelected = -1;
    } else {
      this.mQuestionSelected = item;
    }
  }

  onChangeMode(number) {
    this.mMode = number;
  }
  

}
