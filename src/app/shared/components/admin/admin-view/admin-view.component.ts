import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from 'src/app/animations';
import { RefDirective } from 'src/app/shared/directives/ref.directive';
import { AlertComponent } from '../../alert/alert.component';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
  animations: [
    slideInAnimation,
    trigger('popup', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(1.3)' }),
        animate(200)
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'scale(1.3)' }),
      ])
    ])
  ]
})
export class AdminViewComponent {

  @ViewChild(RefDirective, {static: false}) refDir: RefDirective

  isShowPopupWithRegistrationUser = false;

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  constructor(private resolver: ComponentFactoryResolver) {}

  showPopupWithRegistrationUser(obj) {
    this.isShowPopupWithRegistrationUser = obj.flag;
    if (obj.action === 'new' || obj.action === 'error') {
      const alertFactory = this.resolver.resolveComponentFactory(AlertComponent);
      this.refDir.containerRef.clear();
      const component = this.refDir.containerRef.createComponent(alertFactory);
      obj.action === 'new' ? component.instance.title = "Вы успешно добавили нового администратора" : component.instance.title = "К сожалению, произошла небольшая ошибка"
      setTimeout(() => {
        this.refDir.containerRef.clear();
      }, 3000)
    }
  }

}
