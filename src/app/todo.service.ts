import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from './components/notes/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private static readonly API_BASE_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {

  }

  getTodoList() {
    return this.http.get<Todo[]>(`${TodoService.API_BASE_URL}/todos`);
  }

  addTodo(postData: Todo) {
    return this.http.post(`${TodoService.API_BASE_URL}/todos`, postData);
  }

  updateTodo(postData: Todo) {
    return this.http.patch(`${TodoService.API_BASE_URL}/todos/${postData.id}`, postData);
  }

  deleteTodo(id: Todo['id']) {
    return this.http.delete(`${TodoService.API_BASE_URL}/todos/${id}`);
  }
}


