import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { RefDirective } from 'src/app/shared/directives/ref.directive';
import { AdminService } from 'src/app/shared/services/admin.service';
import { AlertComponent } from '../../alert/alert.component';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild(RefDirective, {static: false}) refDir: RefDirective

  players;
  date = new Date();
  loading = false;
  loadingResponse = false;
  findNameString = "";

  isSortPoints = false;
  isSortCreatedAt = false;

  isSortPointsTouched = true;
  isSortCreatedAtTouched = true;

  sortPointsIndex = 0;
  sortCreatedAtIndex = 0;

  sortPointsUp = true;
  sortCreatedAtUp = true;

  constructor(private adminServices: AdminService, private resolver: ComponentFactoryResolver) { }

  async ngOnInit() {
    this.loading = true;
    try {
      this.players = await this.adminServices.allPlayers();
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

  async deletePlayer(id) {
    this.loadingResponse = true;
    const alertFactory = this.resolver.resolveComponentFactory(AlertComponent);
    this.refDir.containerRef.clear();
    const component = this.refDir.containerRef.createComponent(alertFactory);
    try {
      await this.adminServices.deletePlayer(id);
      let index = this.players.findIndex(el => el.id === id);
      let el = this.players.splice(index, 1);
      component.instance.title = "Вы успешно удалили данные о пользователе"
    } catch (e) {
      component.instance.title = "К сожалению, произошла небольшая ошибка"
    }
    this.loadingResponse = false;
    setTimeout(() => {
      this.refDir.containerRef.clear();
    }, 3000)
  }

  sortPoints() {
    if (this.sortPointsUp) {
      this.players.sort((a, b) => {
        if (a.points > b.points) {return 1}
        if (a.points < b.points) {return -1}
        return 0;
      })
    } else {
      this.players.sort((a, b) => {
        if (a.points < b.points) {return 1}
        if (a.points > b.points) {return -1}
        return 0;
      })
    }
    this.sortPointsUp = !this.sortPointsUp;
    this.isSortPoints = true;
    this.isSortCreatedAt = false;
    if (this.sortPointsIndex != 0) {
      this.isSortPointsTouched = !this.isSortPointsTouched;
    }
    this.sortPointsIndex++;
    this.sortCreatedAtIndex = 0;
  }

  sortCreatedAt() {
    if (this.sortCreatedAtUp) {
      this.players.sort((a, b) => {
        if (a.createdAt < b.createdAt) {return 1}
        if (a.createdAt > b.createdAt) {return -1}
        return 0;
      })
    } else {
      this.players.sort((a, b) => {
        if (a.createdAt > b.createdAt) {return 1}
        if (a.createdAt < b.createdAt) {return -1}
        return 0;
      })
    }
    this.sortCreatedAtUp = !this.sortCreatedAtUp;
    this.isSortCreatedAt = true;
    this.isSortPoints = false;
    if (this.sortCreatedAtIndex != 0) {
      this.isSortCreatedAtTouched = !this.isSortCreatedAtTouched;
    }
    this.sortCreatedAtIndex++;
    this.sortPointsIndex = 0;
  }

  exportToExcel() {
    this.players.forEach(el => el.createdAt = new Date(el.createdAt));
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.players);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, 'Список участников');
    XLSX.writeFile(wb, `Список участников от ${this.date.getDate()}-${this.date.getMonth()+1}-${this.date.getFullYear()} ${this.date.getHours()}-${this.date.getMinutes()}-${this.date.getSeconds()}.xlsx`);
  }

}
