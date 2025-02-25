import React from "react";

interface Task {
  id: number;
  text: string;
}

interface ListProps {
  tasks: Task[];
}

const List: React.FC<ListProps> = ({ tasks }) => {
  return (
    <ul className="p-4 rounded-md border border-solid border-slate-500 flex flex-col gap-4">
      {tasks.map((task, index) => (
        <li
          key={task.id}
          className="text-left border border-solid border-slate-300 p-2"
        >
          {index + 1}. {task.text}
        </li>
      ))}
    </ul>
  );
};

export default List;
