import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  statistics;
  loading = false;

  constructor(private adminServices: AdminService) { }

  async ngOnInit() {
    this.loading = true;
    try {
      this.statistics = await this.adminServices.statistics();
      console.log(this.statistics);
    } catch(e) {

    }
    this.loading = false;
  }

}
