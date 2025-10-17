import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { Todo } from './todo';
import { InputTextModule } from 'primeng/inputtext';
import { TodoService } from '../../todo.service';

@Component({
  selector: 'app-notes',
  imports: [CardModule, TableModule, CheckboxModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './notes.html',
  styleUrls: ['./notes.css'],
})
export class Notes implements OnInit{

  @ViewChild('todoTask') todoTask: any;

  task = '';
  todos: Todo[] = [];

  constructor(private service: TodoService) {

  }

  ngOnInit(): void {
    this.getList(); 
  }

  getList() {
    this.service.getTodoList().subscribe(
      response => {
        this.todos = response;
      } 
    )
  }

  updateTodo(e: CheckboxChangeEvent, todo: Todo ) {
    this.service.updateTodo({...todo, completed: e.checked }). subscribe(
      response => console.log(response)
    )
  }

  deleteTodo(e: unknown, id: Todo['id']) {
    this.service.deleteTodo(id).subscribe(
      response => this.getList()
    )
  }

  addTodo() {
    this.service.addTodo({task: this.task, completed: false}).subscribe(
      response => {
        this.todoTask.reset();
        this.getList();
      }
    )
  }
}
