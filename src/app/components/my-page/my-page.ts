import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-my-page',
  imports: [CommonModule, ButtonModule, ToolbarModule, RouterModule],
  templateUrl: './my-page.html',
  styleUrl: './my-page.css'
})
export class MyPage {

}


