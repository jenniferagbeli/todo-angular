//State Model
export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    createdAt: Date;        // New field for creation date
  reminderAt?: Date;      // Optional field for reminder
  }