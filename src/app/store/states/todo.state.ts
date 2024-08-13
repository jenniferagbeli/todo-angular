import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Todo } from '../models/todo.model';
import { AddTodo, ToggleTodo, RemoveTodo } from '../actions/todo.actions';

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
    const newTodo: Todo = { id: new Date().getTime(), title: payload, completed: false };
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
}
