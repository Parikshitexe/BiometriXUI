
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  ChevronLeft, 
  LayoutDashboard, 
  Users, 
  Shield, 
  Settings, 
  ChevronRight,
  BarChart2,
  Bell,
  Terminal
} from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
  isCollapsed: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ 
  icon, 
  label, 
  to, 
  isActive, 
  isCollapsed,
  onClick
}) => {
  return (
    <NavLink 
      to={to} 
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 mb-1 rounded-md transition-all duration-200",
        "hover:bg-sidebar-accent group",
        isActive ? "bg-sidebar-accent text-primary" : "text-sidebar-foreground"
      )}
    >
      <div className={cn(
        "flex items-center justify-center w-8 h-8",
        isActive && "text-primary"
      )}>
        {icon}
      </div>
      
      {!isCollapsed && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="text-sm font-medium"
        >
          {label}
        </motion.span>
      )}
      
      {isActive && (
        <motion.div
          className={cn(
            "absolute right-0 w-1 h-8 bg-primary rounded-l-md",
            isCollapsed ? "opacity-100" : "opacity-0 lg:opacity-100"
          )}
          layoutId="activeNav"
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
        />
      )}
    </NavLink>
  );
};

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', to: '/' },
    { icon: <Users size={20} />, label: 'User Analytics', to: '/user-analytics' },
    { icon: <Terminal size={20} />, label: 'Real-time Logs', to: '/realtime-logs' },
    { icon: <BarChart2 size={20} />, label: 'Reports', to: '/reports' },
    { icon: <Shield size={20} />, label: 'Security Logs', to: '/security-logs' },
    { icon: <Bell size={20} />, label: 'Notifications', to: '/notifications' },
    { icon: <Settings size={20} />, label: 'Settings', to: '/settings' },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <motion.div 
      className={cn(
        "h-screen flex flex-col bg-sidebar fixed top-0 left-0 z-40 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-60"
      )}
      animate={{ width: isCollapsed ? 64 : 240 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex items-center justify-between h-16 px-3 border-b border-sidebar-border">
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-md bg-primary text-white font-semibold">
              B
            </div>
            <span className="text-lg font-semibold text-white">BiometriX</span>
          </motion.div>
        )}
        
        {isCollapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex justify-center"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-md bg-primary text-white font-semibold">
              B
            </div>
          </motion.div>
        )}
        
        <button 
          onClick={toggleSidebar} 
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded-md text-sidebar-foreground",
            "transition-all hover:bg-sidebar-accent",
            isCollapsed && "absolute -right-10 bg-sidebar rounded-md"
          )}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      <nav className="flex-1 py-6 px-3 overflow-y-auto scrollbar-thin">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavItem
                icon={item.icon}
                label={item.label}
                to={item.to}
                isActive={location.pathname === item.to}
                isCollapsed={isCollapsed}
                onClick={() => {}}
              />
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-3 border-t border-sidebar-border">
        <div className={cn(
          "flex items-center rounded-md py-2 px-3",
          "bg-sidebar-accent/50 text-sidebar-foreground"
        )}>
          {!isCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">JD</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">Admin</span>
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">JD</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
