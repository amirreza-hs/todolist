import { useState, ChangeEvent } from "react";
import "./App.css";
import { useTodoStore } from "./store/useTodoStore";
import List from "./components/List";

function App() {
  const [todoText, setTodoText] = useState<string>("");
  const { tasks, addTask } = useTodoStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  };
  const handleAddTask = () => {
    if (todoText.trim()) {
      addTask(todoText);
      setTodoText("");
    }
  };

  return (
    <main className="w-4/5 mx-auto mt-20 flex flex-col gap-8">
      <h1 className="text-4xl font-semibold">Todo List</h1>
      <div className="flex justify-center gap-4">
        <input
          type="text"
          className="p-4 border border-solid border-slate-500 focus:outline-none bg-[#e8e8e8] rounded-md"
          placeholder="Write down your task"
          onChange={handleChange}
          value={todoText}
        />
        <button
          onClick={handleAddTask}
          className="bg-slate-800 text-white hover:bg-slate-950 transition-all duration-200 p-2 rounded-md"
        >
          add task
        </button>
      </div>
      {todoText && <p className="text-slate-700">todo: {todoText}</p>}
      {tasks.length > 0 && <List tasks={tasks} />}
    </main>
  );
}

export default App;
