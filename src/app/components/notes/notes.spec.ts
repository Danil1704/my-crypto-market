import { TestBed } from '@angular/core/testing';
import { Notes } from './notes';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoService } from '../../todo.service';
import { of } from 'rxjs';
import { CheckboxChangeEvent } from 'primeng/checkbox';

describe('Notes', () => {
  let component: Notes;
  let service: jasmine.SpyObj<TodoService>;

  beforeEach(async () => {
    service = jasmine.createSpyObj<TodoService>('TodoService', ['getTodoList', 'addTodo', 'updateTodo', 'deleteTodo']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, Notes],
      providers: [
        { provide: TodoService, useValue: service }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(Notes);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should load todos', () => {
    service.getTodoList.and.returnValue(of([{ id: 1 as any, task: 'A', completed: false }]));
    component.ngOnInit();
    expect(service.getTodoList).toHaveBeenCalled();
    expect(component.todos.length).toBe(1);
  });

  it('addTodo should call service and refresh list', () => {
    component.task = 'New';
    service.addTodo.and.returnValue(of({} as any));
    service.getTodoList.and.returnValue(of([]));
    component.todoTask = { reset: () => {} } as any;
    spyOn(component.todoTask, 'reset');

    component.addTodo();

    expect(service.addTodo).toHaveBeenCalledWith({ task: 'New', completed: false });
    expect(component.todoTask.reset).toHaveBeenCalled();
    expect(service.getTodoList).toHaveBeenCalled();
  });

  it('updateTodo should call service with toggled value', () => {
    const change = { checked: true } as CheckboxChangeEvent;
    service.updateTodo.and.returnValue(of({} as any));
    component.updateTodo(change, { id: 2 as any, task: 'T', completed: false });
    expect(service.updateTodo).toHaveBeenCalledWith({ id: 2 as any, task: 'T', completed: true });
  });

  it('deleteTodo should call service and refresh list', () => {
    service.deleteTodo.and.returnValue(of({} as any));
    service.getTodoList.and.returnValue(of([]));
    component.deleteTodo({}, 3 as any);
    expect(service.deleteTodo).toHaveBeenCalledWith(3 as any);
    expect(service.getTodoList).toHaveBeenCalled();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Notes } from './notes';

describe('Notes', () => {
  let component: Notes;
  let fixture: ComponentFixture<Notes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Notes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Notes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
