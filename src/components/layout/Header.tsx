
import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  LogOut, 
  Settings as SettingsIcon, 
  User,
  ChevronDown,
  Moon,
  Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface HeaderProps {
  sidebarWidth: number;
}

const Header: React.FC<HeaderProps> = ({ sidebarWidth }) => {
  const [isThemeDark, setIsThemeDark] = useState(true);
  const [searchActive, setSearchActive] = useState(false);
  const navigate = useNavigate();
  
  const toggleTheme = () => {
    setIsThemeDark(!isThemeDark);
  };

  return (
    <header 
      className={cn(
        "h-16 fixed top-0 right-0 z-30 border-b border-border",
        "bg-background/80 backdrop-blur-md"
      )}
      style={{ width: `calc(100% - ${sidebarWidth}px)` }}
    >
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <div 
              className={cn(
                "relative flex items-center rounded-md transition-all",
                searchActive ? "w-72 bg-secondary" : "w-44 bg-transparent"
              )}
            >
              <input
                type="text"
                placeholder="Search..."
                className={cn(
                  "bg-transparent border-none outline-none text-sm py-2 pl-10 pr-4",
                  "w-full placeholder:text-muted-foreground focus:ring-0",
                  !searchActive && "cursor-pointer"
                )}
                onFocus={() => setSearchActive(true)}
                onBlur={() => setSearchActive(false)}
              />
              <Search 
                size={18} 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="w-9 h-9 rounded-full"
            onClick={toggleTheme}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isThemeDark ? "dark" : "light"}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isThemeDark ? <Moon size={18} /> : <Sun size={18} />}
              </motion.div>
            </AnimatePresence>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="w-9 h-9 rounded-full relative"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 flex items-center gap-2 px-2"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">JD</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm hidden sm:inline-block">John Doe</span>
                  <ChevronDown size={14} />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/profile')}>
                <User size={15} /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/settings')}>
                <SettingsIcon size={15} /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 text-destructive cursor-pointer">
                <LogOut size={15} /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
