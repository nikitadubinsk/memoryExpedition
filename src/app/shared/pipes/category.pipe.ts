import { Pipe, PipeTransform } from '@angular/core';
import { Question } from 'src/app/app.component';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(questions: Question[], category : string = ""): Question[] {
    return questions.filter(question => {
      return question.category === category
    })
  }

}
