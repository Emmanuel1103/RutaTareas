import { Home, CheckSquare, BarChart3, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const menuItems = [
  { title: "Inicio", path: "/", icon: Home },
  { title: "Tareas", path: "/", icon: CheckSquare },
  { title: "Reportes", path: "/reportes", icon: BarChart3 },
  { title: "Configuración", path: "/configuracion", icon: Settings },
];

export const AppSidebar = () => {
  return (
    <aside className="w-64 h-screen bg-sidebar text-sidebar-foreground flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold">Fundación Santo Domingo</h1>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-sidebar-accent text-sidebar-foreground"
                  activeClassName="bg-sidebar-accent"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
