import { Pipe, PipeTransform } from '@angular/core';
import { Player } from 'src/app/app.component';

@Pipe({
  name: 'findPlayers'
})
export class FindPlayersPipe implements PipeTransform {

  transform(players: Player[], name: string = ""): Player[] {
    if (!name.trim()) {
      return players
    }

    return players.filter(player => {
      return player.name.toLowerCase().includes(name.toLowerCase());
    })
  }

}
