import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { QuestionService } from 'src/app/shared/services/question.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {

  filename = "";

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png",
    uploadAPI: {
      url: environment.urlApi + "/upload-photo",
    },
    replaceTexts: {
      selectFileBtn: 'Выберите файл',
      resetBtn: 'Удалить',
      uploadBtn: 'Загрузить',
      attachPinBtn: 'Прикрепите файл',
      afterUploadMsg_success: 'Успешно загружено!',
      afterUploadMsg_error: 'Загрузка прервана!'
    }
  }

  form: FormGroup;
  public error$: Subject<string> = new Subject<string>();

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.form = new FormGroup({
      text: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      cost: new FormControl('', [Validators.required]),
      answer1: new FormControl('', [Validators.required]),
      answer2: new FormControl('', [Validators.required]),
      answer3: new FormControl('', [Validators.required]),
      correctAnswer: new FormControl('', [Validators.required]),
      URLVideo: new FormControl('', []),
    });
  }

  // Функция, возвращение имени загруженного файла
  fileUpload(event){
    this.filename = event.body.filename;
  }

  async createQuestion() {
    this.form.value['picture'] = this.filename
    try {
      await this.questionService.createQuestion(this.form.value);
      this.form.reset();
    } catch(e) {
      this.error$.next(e.error.message)
    }
  }

}
