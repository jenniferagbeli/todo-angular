import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Todo } from '../models/todo.model';
import { AddTodo, ToggleTodo, RemoveTodo, SetReminder } from '../actions/todo.actions';
import { Injectable } from '@angular/core';

// Define the state model
export interface TodoStateModel {
  todos: Todo[];
}

// Initial state setup
@State<TodoStateModel>({
  name: 'todos',
  defaults: {
    todos: []
  }
})
@Injectable()
export class TodoState {
  
  // Selector to get todos from the state
  @Selector()
  static getTodos(state: TodoStateModel) {
    return state.todos;
  }

  // Add a new Todo
  @Action(AddTodo)
  addTodo({ getState, patchState }: StateContext<TodoStateModel>, { payload }: AddTodo) {
    const state = getState();
    const newTodo: Todo = {
        id: new Date().getTime(), title: payload.title, 
        completed: false,
        createdAt: new Date(),
        reminderAt: payload.reminderAt
    };
    patchState({
      todos: [...state.todos, newTodo]
    });
  }

  // Toggle Todo completion
  @Action(ToggleTodo)
  toggleTodo({ getState, patchState }: StateContext<TodoStateModel>, { payload }: ToggleTodo) {
    const state = getState();
    const todos = state.todos.map(todo => 
      todo.id === payload ? { ...todo, completed: !todo.completed } : todo
    );
    patchState({ todos });
  }

  // Remove a Todo
  @Action(RemoveTodo)
  removeTodo({ getState, patchState }: StateContext<TodoStateModel>, { payload }: RemoveTodo) {
    const state = getState();
    const todos = state.todos.filter(todo => todo.id !== payload);
    patchState({ todos });
  }

  @Action(SetReminder)
  setReminder({ getState, patchState }: StateContext<TodoStateModel>, { payload }: SetReminder) {
    const state = getState();
    const todos = state.todos.map(todo =>
      todo.id === payload.id ? { ...todo, reminderAt: payload.reminderAt } : todo
    );
    patchState({ todos });
  }
}
