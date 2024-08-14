import { Component } from '@angular/core';
import { Store } from '@ngxs/store'; 
import { Observable } from 'rxjs'; 
import { AddTodo, ToggleTodo, RemoveTodo } from '../store/actions/todo.actions'; 
import { TodoState } from '../store/states/todo.state'; 
import { Todo } from '../store/models/todo.model'; 

//TodoComponent uses Store to dispatch actions and Selectors to get the state.

@Component({
  selector: 'app-todo', 
  templateUrl: './todos.component.html', 
  styleUrls: ['./todos.component.scss'] 
})
export class TodosComponent {
  todos$: Observable<Todo[]>;  // Declare an observable to hold the todo list, which will be populated by the state

  newTodoTitle: string = ''; // Initialize an empty string to hold the new todo title entered by the user
  currentIndex: number = 0;  // Initialize the current index to keep track of the selected todo item
  reminderDate: string = '';

  constructor(private store: Store) { 
    // In the constructor, inject the NGXS store service
    this.todos$ = this.store.select(TodoState.getTodos); 
    // Assign the todos$ observable by selecting the todo list from the state using the store's select method
  }

  addTodo() {
    if (this.newTodoTitle.trim()) {
      // Check if the new todo title is not just whitespace
      const reminderDate = this.reminderDate ? new Date(this.reminderDate) : undefined;
      this.store.dispatch(new AddTodo({
        title: this.newTodoTitle,
        reminderAt: reminderDate
      }));
      // Dispatch the AddTodo action with the new todo title to update the state
      this.newTodoTitle = ''; 
      // Clear the input field after the todo is added
      this.reminderDate = '';  // Clear input after adding
    }
  }

  toggleTodo(id: number) {
    this.store.dispatch(new ToggleTodo(id)); 
    // Dispatch the ToggleTodo action with the todo's id to toggle its completion status
  }

  removeTodo(id: number) {
    this.store.dispatch(new RemoveTodo(id)); 
    // Dispatch the RemoveTodo action with the todo's id to remove it from the state
    this.currentIndex = Math.max(0, this.currentIndex - 1); 
    // Update the currentIndex to ensure it doesn't go below zero when a todo is removed
  }

  nextTodo() {
    this.todos$.subscribe(todos => {
      // Subscribe to the todos$ observable to get the current list of todos
      if (this.currentIndex < todos.length - 1) {
        // If the currentIndex is less than the last index in the todos array
        this.currentIndex++; 
        // Increment the currentIndex to move to the next todo
      }
    });
  }

  previousTodo() {
    if (this.currentIndex > 0) {
      // If the currentIndex is greater than zero (i.e., not at the first todo)
      this.currentIndex--; 
      // Decrement the currentIndex to move to the previous todo
    }
  }
}
