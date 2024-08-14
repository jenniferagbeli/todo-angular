export class AddTodo {
    static readonly type = '[Todo] Add';
    constructor(public payload: { title: string; reminderAt?: Date }) {}
  }
  
  export class ToggleTodo {
    static readonly type = '[Todo] Toggle';
    constructor(public payload: number) {}
  }
  
  export class RemoveTodo {
    static readonly type = '[Todo] Remove';
    constructor(public payload: number) {}
  }

  export class SetReminder {
    static readonly type = '[Todo] Set Reminder';
    constructor(public payload: { id: number, reminderAt: Date }) {}
  }