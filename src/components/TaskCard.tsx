import { Task } from "@/types/task";
import { Card } from "@/components/ui/card";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  viewMode?: "grid" | "list";
}

const getStatusColor = (status: string): string => {
  switch (status) {
    case "Finalizada":
      return "bg-status-completed";
    case "En gestión":
      return "bg-status-in-progress";
    case "Pendiente":
      return "bg-status-pending";
    default:
      return "bg-muted";
  }
};

export const TaskCard = ({ task, onClick, viewMode = "grid" }: TaskCardProps) => {
  const isListMode = viewMode === "list";
  
  return (
    <Card
      onClick={onClick}
      className={`p-5 cursor-pointer border-2 border-primary hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card flex flex-col relative ${
        isListMode ? "min-h-[160px]" : "h-full min-h-[280px]"
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 pr-2">
          <h3 className="text-base font-bold text-card-foreground mb-1 line-clamp-2">{task.name}</h3>
          <p className="text-xs text-muted-foreground">{task.theme}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xs text-muted-foreground mb-1">Prioridad</p>
          <p className="text-2xl font-bold text-primary">{task.priority}</p>
        </div>
      </div>
      
      <div className="space-y-2 flex-1 mb-12">
        <p className={`text-sm text-card-foreground ${isListMode ? "line-clamp-2" : "line-clamp-3"}`}>
          {task.activity}
        </p>
      </div>
      
      <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">Responsable:</span> {task.responsible}
        </p>
        <div
          className={`w-7 h-7 rounded-full flex-shrink-0 ${getStatusColor(task.status)}`}
          title={task.status}
        />
      </div>
    </Card>
  );
};
