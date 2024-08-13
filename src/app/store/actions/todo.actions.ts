export class AddTodo {
    static readonly type = '[Todo] Add';
    constructor(public payload: string) {}
  }
  
  export class ToggleTodo {
    static readonly type = '[Todo] Toggle';
    constructor(public payload: number) {}
  }
  
  export class RemoveTodo {
    static readonly type = '[Todo] Remove';
    constructor(public payload: number) {}
  }