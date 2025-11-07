import { Task } from "@/types/task";
import { TaskCard } from "./TaskCard";

interface TaskGridProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  viewMode?: "grid" | "list";
}

export const TaskGrid = ({ tasks, onTaskClick, viewMode = "grid" }: TaskGridProps) => {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-xl text-muted-foreground mb-2">No se encontraron tareas</p>
        <p className="text-sm text-muted-foreground">
          Intenta ajustar los filtros o crear una nueva tarea
        </p>
      </div>
    );
  }

  return (
    <div className={
      viewMode === "grid" 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        : "flex flex-col gap-4"
    }>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} viewMode={viewMode} />
      ))}
    </div>
  );
};
