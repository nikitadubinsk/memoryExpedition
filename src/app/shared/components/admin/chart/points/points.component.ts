import { Component, Input } from '@angular/core';

import * as Chart from 'chart.js'


@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent {

  @Input() statistics;

  canvas: any;
  ctx: any;
  ngAfterViewInit() {
    this.canvas = document.getElementById('points');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
          labels: ["Средний", "Максимальный", "Минимальный"],
          datasets: [{
              label: "Количество",
              data: [this.statistics.avg, this.statistics.maxPoints, this.statistics.minPoints],
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
          text: "Балл",
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
