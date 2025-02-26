import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Task {
  id: number;
  text: string;
  done: boolean;
}

interface TodoStore {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (taskText: string) => void;
  deleteTask: (taskId: number) => void;
  toggleDone: (taskId: number) => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      tasks: [],
      setTasks: (tasks) => set({ tasks }),
      addTask: (taskText) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { id: Date.now(), text: taskText, done: false },
          ],
        })),
      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),
      toggleDone: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, done: !task.done } : task
          ),
        })),
    }),
    {
      name: "todo-storage",
    }
  )
);
