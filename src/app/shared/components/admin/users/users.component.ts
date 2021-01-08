import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/app.component';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  players;
  loading = false;

  constructor(private adminServices: AdminService) { }

  async ngOnInit() {
    this.loading = true;
    try {
      this.players = await this.adminServices.allPlayers();
    } catch (e) {
      
    }
    this.loading = false;
  }

}
