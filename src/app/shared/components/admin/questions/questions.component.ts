import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin.service';
import { QuestionService } from 'src/app/shared/services/question.service';

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
  isShowMiniAlert = false;
  alertText = '';
  isError = false;

  constructor(private questionServices: QuestionService, private adminServices: AdminService) { }

  async ngOnInit() {
    // this.settings['numberOfCategories'] = 5;
    // this.settings['numberOfQuestions'] = 6;
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
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
      this.alertText = "К сожалению, произошла небольшая ошибка";
      this.isShowMiniAlert = true;
      setTimeout(() => {
        this.isShowMiniAlert = false;
      }, 5000)
    }
    this.loading = false;
  }

  async deleteQuestion() {
    try {
      await this.questionServices.deleteQuestion(this.idQuestion);
      let index = this.questions.findIndex(el => el.id == this.idQuestion);
      this.questions.splice(index, 1);
      this.isShowDeletePopup = false;
      this.alertText = "Вы успешно удалил вопрос";
      this.isShowMiniAlert = true;
      setTimeout(() => {
        this.isShowMiniAlert = false;
      }, 5000)
    } catch (e) {
      this.alertText = "К сожалению, произошла небольшая ошибка";
      this.isShowMiniAlert = true;
      setTimeout(() => {
        this.isShowMiniAlert = false;
      }, 5000)
    }
  }

  deletePopupQuestion(id) {
    this.isShowDeletePopup = !this.isShowDeletePopup;
    this.idQuestion = id;
  }

  closeDeleteQuestion() {
    this.isShowDeletePopup = !this.isShowDeletePopup;
  }

  async createCategory() {
    if (Object.values(this.form.value).every(el => el.toString().trim())) {
      this.isError = false;
      try {
        let cat = await this.adminServices.newCategory(this.form.value)
        this.form.reset();
        this.categories.push(cat);
        this.alertText = "Вы успешно добавили новую категорию";
        this.isShowMiniAlert = true;
        setTimeout(() => {
          this.isShowMiniAlert = false;
        }, 5000)
      } catch (e) {
        this.error$.next(e.error.message)
        this.alertText = "К сожалению, произошла небольшая ошибка";
        this.isShowMiniAlert = true;
        setTimeout(() => {
          this.isShowMiniAlert = false;
        }, 5000)
      }
    } else {
      this.isError = true;
    }
  }

  editCategoryName(index) {
    this.isCategoryEdit[index] = true;
    this.category = Object.assign({}, this.categories[index]);
    this.index = index;
  }

  async saveCategoryName() {
    if (this.category.name.toString().trim()) {
      this.isError = false;
      try {
        await this.adminServices.editCategory(this.category);
        this.categories.find(el => el.id == this.category.id).name = this.category.name;
        this.isCategoryEdit[this.index]  = false;
        this.alertText = "Вы успешно изменили название категории";
        this.isShowMiniAlert = true;
        setTimeout(() => {
          this.isShowMiniAlert = false;
        }, 5000)
      } catch (e) {
        this.alertText = "К сожалению, произошла небольшая ошибка";
        this.isShowMiniAlert = true;
        setTimeout(() => {
          this.isShowMiniAlert = false;
        }, 5000)
      }
    } else {
      this.isError = true;
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
    if (Object.values(this.settings).every(el => el.toString().trim())) {
      this.isError = false;
      try {
        await this.adminServices.newSetting(this.settings);
        this.isSettingsEdit[0] = false;
        this.isSettingsEdit[1] = false;
        this.alertText = "Вы успешно изменили настройки";
        this.isShowMiniAlert = true;
        setTimeout(() => {
          this.isShowMiniAlert = false;
        }, 5000)
      } catch(e) {
        this.alertText = "К сожалению, произошла небольшая ошибка";
        this.isShowMiniAlert = true;
        setTimeout(() => {
          this.isShowMiniAlert = false;
        }, 5000)
      }
    } else {
      this.isError = true;
    }
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
      this.closeDeleteAllQuestions();
      this.alertText = "Вы успешно удалили все вопросы";
      this.isShowMiniAlert = true;
      setTimeout(() => {
        this.isShowMiniAlert = false;
      }, 5000)
    } catch(e) {
      this.alertText = "К сожалению, произошла небольшая ошибка";
      this.isShowMiniAlert = true;
      setTimeout(() => {
        this.isShowMiniAlert = false;
      }, 5000)
    }
  }

}
