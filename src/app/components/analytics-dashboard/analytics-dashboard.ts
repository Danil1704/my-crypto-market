import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { ToolbarModule } from 'primeng/toolbar';


@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [ChartModule, CardModule, CommonModule, ButtonModule, DividerModule, ToolbarModule],
  templateUrl: './analytics-dashboard.html',
  styleUrls: ['./analytics-dashboard.css']
})


export class AnalyticsDashboard implements OnInit {
  lineData: any;
  pieData: any;
  barData: any;
  lineOptions: any;
  pieOptions: any;
  barOptions: any;

  ngOnInit() {
    this.initCharts();
  }

  initCharts() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.lineData = {
      labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      datasets: [
        {
          label: 'Посещения',
          data: [120, 150, 180, 220, 300, 250, 400],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.3
        }
      ]
    };
    this.lineOptions = {
      plugins: { legend: { labels: { color: textColor } } },
      scales: {
        x: { ticks: { color: textColorSecondary }, grid: { color: surfaceBorder } },
        y: { ticks: { color: textColorSecondary }, grid: { color: surfaceBorder } }
      }
    };

    this.pieData = {
      labels: ['Поиск', 'Соцсети', 'Прямая', 'Рефералы'],
      datasets: [
        {
          data: [45, 25, 20, 10],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--pink-500')
          ]
        }
      ]
    };
    this.pieOptions = {
      plugins: { legend: { labels: { color: textColor } } }
    };

    this.barData = {
      labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
      datasets: [
        {
          label: 'Продажи',
          backgroundColor: documentStyle.getPropertyValue('--purple-500'),
          data: [50, 80, 100, 120, 180, 200]
        }
      ]
    };
    this.barOptions = {
      plugins: { legend: { labels: { color: textColor } } },
      scales: {
        x: { ticks: { color: textColorSecondary }, grid: { color: surfaceBorder } },
        y: { ticks: { color: textColorSecondary }, grid: { color: surfaceBorder } }
      }
    };
  }
}




