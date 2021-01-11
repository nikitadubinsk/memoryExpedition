import { Component, Input } from '@angular/core';

import * as Chart from 'chart.js'

@Component({
  selector: 'app-all-players',
  templateUrl: './all-players.component.html',
  styleUrls: ['./all-players.component.scss']
})
export class AllPlayersComponent {

  @Input() statistics;

  canvas: any;
  ctx: any;
  ngAfterViewInit() {
    this.canvas = document.getElementById('allPlayers');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
          labels: ["За все время", "За месяц", "За неделю"],
          datasets: [{
              label: "Количество",
              data: [this.statistics.countAllPlayers, this.statistics.countForLastMounth, this.statistics.countForLastWeek],
              backgroundColor: [
                'rgba(220, 65, 40, 0.7)',
                'rgba(220, 65, 40, 0.7)',
                'rgba(220, 65, 40, 0.7)'
              ],
              borderColor: [
                '#dc4128',
                '#dc4128',
                '#dc4128'
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: false,
        display: true,
        title: {
          display: true,
          text: "Количество новых участников",
          fontSize: "16",
          fontColor: "black"
        },
        legend: {
          display: false
        },
        tooltips: {
          displayColors: false
        },
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              ticks: {
                display: true,
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              }
            }
          ]
        }
      }
    });
  }

}
