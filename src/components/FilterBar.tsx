import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RotateCcw, LayoutGrid, List, ArrowUpDown } from "lucide-react";
import { TaskFilters } from "@/types/task";

interface FilterBarProps {
  filters: TaskFilters;
  onFilterChange: (filters: TaskFilters) => void;
  onClearFilters: () => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: (order: "asc" | "desc") => void;
}

export const FilterBar = ({ filters, onFilterChange, onClearFilters, viewMode, onViewModeChange, sortOrder, onSortOrderChange }: FilterBarProps) => {
  const updateFilter = (key: keyof TaskFilters, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-card border-b border-border p-4 mb-6 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end mb-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">Tema</label>
          <Input
            placeholder="Buscar tema..."
            value={filters.theme}
            onChange={(e) => updateFilter("theme", e.target.value)}
            className="bg-background"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">Actividad</label>
          <Input
            placeholder="Buscar actividad..."
            value={filters.activity}
            onChange={(e) => updateFilter("activity", e.target.value)}
            className="bg-background"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">Prioridad</label>
          <Select value={filters.priority} onValueChange={(value) => updateFilter("priority", value)}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="1">Alta (1)</SelectItem>
              <SelectItem value="2">Media (2)</SelectItem>
              <SelectItem value="3">Baja (3)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">Estado</label>
          <Select value={filters.status} onValueChange={(value) => updateFilter("status", value)}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Pendiente">Pendiente</SelectItem>
              <SelectItem value="En gestión">En gestión</SelectItem>
              <SelectItem value="Finalizada">Finalizada</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">Responsable</label>
          <Input
            placeholder="Buscar responsable..."
            value={filters.responsible}
            onChange={(e) => updateFilter("responsible", e.target.value)}
            className="bg-background"
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="border-primary text-primary hover:bg-primary-light"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Limpiar filtros
        </Button>
        
        <Button
          variant="outline"
          onClick={() => onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}
          className="border-primary text-primary hover:bg-primary-light"
        >
          <ArrowUpDown className="w-4 h-4 mr-2" />
          Prioridad {sortOrder === "asc" ? "↑" : "↓"}
        </Button>
        
        <div className="flex gap-1 border border-border rounded-lg p-1">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("grid")}
            className={viewMode === "grid" ? "bg-primary hover:bg-primary-hover" : ""}
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("list")}
            className={viewMode === "list" ? "bg-primary hover:bg-primary-hover" : ""}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
