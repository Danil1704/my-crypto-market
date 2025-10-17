import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { Todo } from './components/notes/todo';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getTodoList should GET /todos', () => {
    const mockTodos: Todo[] = [
      { id: 1 as any, task: 'A', completed: false },
      { id: 2 as any, task: 'B', completed: true },
    ];

    service.getTodoList().subscribe((todos) => {
      expect(todos).toEqual(mockTodos);
    });

    const req = httpMock.expectOne((r) => r.method === 'GET' && r.url.endsWith('/todos'));
    req.flush(mockTodos);
  });

  it('addTodo should POST /todos', () => {
    const newTodo = { task: 'New', completed: false } as Todo;

    service.addTodo(newTodo).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne((r) => r.method === 'POST' && r.url.endsWith('/todos'));
    expect(req.request.body).toEqual(newTodo);
    req.flush({ id: 3, ...newTodo });
  });

  it('updateTodo should PATCH /todos/:id', () => {
    const updatedTodo = { id: 4 as any, task: 'U', completed: true } as Todo;

    service.updateTodo(updatedTodo).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne((r) => r.method === 'PATCH' && /\/todos\/4$/.test(r.url));
    expect(req.request.body).toEqual(updatedTodo);
    req.flush(updatedTodo);
  });

  it('deleteTodo should DELETE /todos/:id', () => {
    service.deleteTodo(5 as any).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne((r) => r.method === 'DELETE' && /\/todos\/5$/.test(r.url));
    req.flush({});
  });
});


