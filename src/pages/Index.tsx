import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { FilterBar } from "@/components/FilterBar";
import { TaskGrid } from "@/components/TaskGrid";
import { TaskModal } from "@/components/TaskModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Task, TaskFilters } from "@/types/task";
import { mockTasks } from "@/data/mockTasks";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filters, setFilters] = useState<TaskFilters>({
    theme: "",
    activity: "",
    priority: "all",
    status: "all",
    responsible: "",
  });

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (updatedTask: Task) => {
    if (updatedTask.id) {
      // Update existing task
      setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    } else {
      // Create new task
      const newTask = {
        ...updatedTask,
        id: Date.now().toString(),
        followUps: [],
      };
      setTasks([...tasks, newTask]);
    }
  };

  const handleNewTask = () => {
    const emptyTask: Task = {
      id: "",
      name: "",
      theme: "",
      activity: "",
      priority: 1,
      status: "Pendiente",
      responsible: "",
      deadline: "",
      description: "",
      followUps: [],
    };
    setSelectedTask(emptyTask);
    setIsModalOpen(true);
  };

  const handleClearFilters = () => {
    setFilters({
      theme: "",
      activity: "",
      priority: "all",
      status: "all",
      responsible: "",
    });
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filters.theme && !task.theme.toLowerCase().includes(filters.theme.toLowerCase())) {
        return false;
      }
      if (filters.activity && !task.activity.toLowerCase().includes(filters.activity.toLowerCase())) {
        return false;
      }
      if (filters.priority !== "all" && task.priority.toString() !== filters.priority) {
        return false;
      }
      if (filters.status !== "all" && task.status !== filters.status) {
        return false;
      }
      if (
        filters.responsible &&
        !task.responsible.toLowerCase().includes(filters.responsible.toLowerCase())
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.priority - b.priority;
      } else {
        return b.priority - a.priority;
      }
    });

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      
      <main className="flex-1 ml-64">
        <div className="container mx-auto py-8 px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Gestión de Tareas</h1>
            <p className="text-muted-foreground">
              Sistema de seguimiento y control de actividades institucionales
            </p>
          </div>

          <FilterBar
            filters={filters}
            onFilterChange={setFilters}
            onClearFilters={handleClearFilters}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
          />

          <TaskGrid tasks={filteredTasks} onTaskClick={handleTaskClick} viewMode={viewMode} />

          <Button
            onClick={handleNewTask}
            className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary-hover transition-all hover:scale-110"
            size="icon"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </main>

      <TaskModal
        task={selectedTask}
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        onSave={handleSaveTask}
      />
    </div>
  );
};

export default Index;
