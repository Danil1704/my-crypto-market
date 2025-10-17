import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from './components/notes/todo';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './config';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) {

  }

  getTodoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${API_BASE_URL}/todos`);
  }

  addTodo(postData: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${API_BASE_URL}/todos`, postData);
  }

  updateTodo(postData: Todo): Observable<Todo> {
    return this.http.patch<Todo>(`${API_BASE_URL}/todos/${postData.id}`, postData);
  }

  deleteTodo(id: Todo['id']): Observable<unknown> {
    return this.http.delete(`${API_BASE_URL}/todos/${id}`);
  }
}


