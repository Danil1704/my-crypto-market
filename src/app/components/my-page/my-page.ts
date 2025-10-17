import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { InputText, InputTextModule } from "primeng/inputtext";

@Component({
  selector: 'app-my-page',
  imports: [CommonModule, ButtonModule, ToolbarModule, RouterModule, InputTextModule],
  templateUrl: './my-page.html',
  styleUrls: ['./my-page.css']
})
export class MyPage {

}


