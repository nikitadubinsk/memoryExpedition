import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { RefDirective } from 'src/app/shared/directives/ref.directive';
import { QuestionService } from 'src/app/shared/services/question.service';
import { AlertComponent } from '../../alert/alert.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  @ViewChild(RefDirective, {static: false}) refDir: RefDirective

  loading = false;
  questions;

  constructor(private questionServices: QuestionService, private resolver: ComponentFactoryResolver) { }

  async ngOnInit() {
    this.loading = true;
    try {
      this.questions = await this.questionServices.allQuestions();
    } catch (e) {
      const alertFactory = this.resolver.resolveComponentFactory(AlertComponent);
      this.refDir.containerRef.clear();
      const component = this.refDir.containerRef.createComponent(alertFactory);
      component.instance.title = "К сожалению, произошла небольшая ошибка"
      setTimeout(() => {
        this.refDir.containerRef.clear();
      }, 5000)
    }
    this.loading = false;
  }

  async deleteQuestion(id) {
    try {
      //await this.questionServices.deleteQuestion(id);
      let index = this.questions.findIndex(el => el.id == id);
      this.questions.splice(index, 1);
      const alertFactory = this.resolver.resolveComponentFactory(AlertComponent);
      this.refDir.containerRef.clear();
      const component = this.refDir.containerRef.createComponent(alertFactory);
      component.instance.title = "Вы успешно удалили вопрос"
    } catch (e) {
      const alertFactory = this.resolver.resolveComponentFactory(AlertComponent);
      this.refDir.containerRef.clear();
      const component = this.refDir.containerRef.createComponent(alertFactory);
      component.instance.title = "К сожалению, произошла небольшая ошибка"
    }
    setTimeout(() => {
      this.refDir.containerRef.clear();
    }, 5000)
  }

}
