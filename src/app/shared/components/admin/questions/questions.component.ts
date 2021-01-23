import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RefDirective } from 'src/app/shared/directives/ref.directive';
import { AdminService } from 'src/app/shared/services/admin.service';
import { QuestionService } from 'src/app/shared/services/question.service';
import { AlertComponent } from '../../alert/alert.component';

import * as XLSX from 'xlsx';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  animations: [
    trigger('popup', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(1.2)' }),
        animate(100)
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(250, style({
          opacity: 0,
          transform: 'scale(1.2)'
        }))
      ]),
    ])
  ]
})
export class QuestionsComponent implements OnInit {

  @ViewChild(RefDirective, { static: false }) refDir: RefDirective
  public error$: Subject<string> = new Subject<string>();

  form:FormGroup

  loading = false;
  questions;
  isShowDeletePopup = false;
  isShowDeleteAllPopup = false;
  idQuestion = -1;
  categories;
  category;
  isCategoryEdit = [];
  isSettingsEdit = [];
  questionsExcel = [];
  date = new Date();
  index;
  settings;

  constructor(private questionServices: QuestionService, private adminServices: AdminService, private resolver: ComponentFactoryResolver) { }

  async ngOnInit() {
    // this.settings['numberOfCategories'] = 5;
    // this.settings['numberOfQuestions'] = 6;
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.email]),
    });
    for(let i=0; i<5; i++) {
      this.isCategoryEdit[i] = false;
      this.isSettingsEdit[i] = false;
    }
    this.loading = true;
    try {
      this.questions = await this.questionServices.allAdminQuestions();
      this.categories = await this.adminServices.admincategories();
      this.settings = await this.adminServices.settings();
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

  async deleteQuestion() {
    try {
      await this.questionServices.deleteQuestion(this.idQuestion);
      let index = this.questions.findIndex(el => el.id == this.idQuestion);
      this.questions.splice(index, 1);
      const alertFactory = this.resolver.resolveComponentFactory(AlertComponent);
      this.refDir.containerRef.clear();
      const component = this.refDir.containerRef.createComponent(alertFactory);
      component.instance.title = "Вы успешно удалили вопрос";
      this.isShowDeletePopup = false;
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

  deletePopupQuestion(id) {
    this.isShowDeletePopup = !this.isShowDeletePopup;
    this.idQuestion = id;
  }

  closeDeleteQuestion() {
    this.isShowDeletePopup = !this.isShowDeletePopup;
  }

  async createCategory() {
    try {
      await this.adminServices.newCategory(this.form.value)
      this.form.reset();
    } catch (e) {
      this.error$.next(e.error.message)
    }
  }

  editCategoryName(index) {
    this.isCategoryEdit[index] = true;
    this.category = Object.assign({}, this.categories[index]);
    this.index = index;
  }

  async saveCategoryName() {
    try {
      await this.adminServices.editCategory(this.category);
      this.categories.find(el => el.id == this.category.id).name = this.category.name;
      this.isCategoryEdit[this.index]  = false;
    } catch (e) {
    }
  }

  exportToExcel() {
    this.index = 0;
    this.questions.forEach(el => {
      let questionExcel = {};
      this.index++;
      questionExcel['№'] = this.index;
      questionExcel['Текст вопроса'] = el.text;
      questionExcel['Стоимость'] = el.cost;
      questionExcel['Категория'] = el.category.name;
      questionExcel['Первый вариант ответа'] = el.answer1;
      questionExcel['Второй вариант ответа'] = el.answer2;
      questionExcel['Третий вариант ответа'] = el.answer3;
      questionExcel['Правильный ответ'] = el.correctAnswer;
      questionExcel['Ссылка на изображение'] = el.picture ? environment.urlPicture + el.picture : el.picture;
      questionExcel['Ссылка на видео'] = el.URLVideo;
      this.questionsExcel.push(questionExcel);
    })
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.questionsExcel);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, 'Вопросы');
    XLSX.writeFile(wb, `Список вопросов от ${this.date.getDate()}-${this.date.getMonth()+1}-${this.date.getFullYear()} ${this.date.getHours()}-${this.date.getMinutes()}-${this.date.getSeconds()}.xlsx`);
  }

  editSettings(index) {
    this.isSettingsEdit[index] = true;
  }

  async saveSettings() {
    try {
      await this.adminServices.newSetting(this.settings);
      this.isSettingsEdit[0] = false;
      this.isSettingsEdit[1] = false;
    } catch(e) {}
  }

  showPopupDeleteAllQuestions() {
    this.isShowDeleteAllPopup = true;
  }

  closeDeleteAllQuestions() {
    this.isShowDeleteAllPopup = false;
  }

  async deleteAllQuestions() {
    try {
      await this.adminServices.deleteQuestions();
      this.questions = [];
    } catch(e) {}
  }

}
