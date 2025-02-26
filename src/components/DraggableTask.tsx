import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Task {
  id: number;
  text: string;
  done: boolean;
}

interface Props {
  task: Task;
  deleteTask: (id: number) => void;
  toggleDone: (id: number) => void;
  index: number;
}

export const DraggableTask: React.FC<Props> = ({
  task,
  deleteTask,
  toggleDone,
  index,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`border border-solid border-slate-300 rounded-md p-2 flex items-center justify-between bg-white shadow-md cursor-grab ${
        task.done ? "line-through text-gray-500 border-green-600" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <span>{index + 1}.</span>
        <span> {task.text}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onPointerDown={() => toggleDone(task.id)}
          className={`${task.done ? "text-green-700" : "text-green-400"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </button>
        <button
          onPointerDown={() => deleteTask(task.id)}
          className="text-red-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
    </li>
  );
};
