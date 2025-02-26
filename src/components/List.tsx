import React from "react";
import { useTodoStore } from "../store/useTodoStore";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DraggableTask } from "./DraggableTask";

const List: React.FC = () => {
  const { tasks, setTasks, deleteTask, toggleDone } = useTodoStore();

  // Drag & Drop Sensors (these are for better UX)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  // Handle Drag End
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((task) => task.id === active.id);
    const newIndex = tasks.findIndex((task) => task.id === over.id);

    setTasks(arrayMove(tasks, oldIndex, newIndex));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        <ul className="p-4 rounded-md border border-solid border-slate-500 flex flex-col gap-4">
          {tasks.map((task, index) => (
            <DraggableTask
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              toggleDone={toggleDone}
              index={index}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export default List;
