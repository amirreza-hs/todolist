import { create } from "zustand";

interface Task {
  id: number;
  text: string;
}

interface TodoStore {
  tasks: Task[];
  addTask: (taskText: string) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  tasks: [],
  addTask: (taskText) =>
    set((state) => ({
      tasks: [...state.tasks, { id: Date.now(), text: taskText }],
    })),
}));
