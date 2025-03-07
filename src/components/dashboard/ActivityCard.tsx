
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  UserPlus, 
  UserMinus, 
  LogIn,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityEvent {
  id: string;
  type: 'login' | 'register' | 'logout' | 'warning';
  user: string;
  time: string;
  ip: string;
  details: string;
}

const getEventIcon = (type: string) => {
  switch (type) {
    case 'login':
      return <LogIn size={16} className="text-green-400" />;
    case 'register':
      return <UserPlus size={16} className="text-blue-400" />;
    case 'logout':
      return <UserMinus size={16} className="text-orange-400" />;
    case 'warning':
      return <AlertCircle size={16} className="text-red-400" />;
    default:
      return <Activity size={16} className="text-muted-foreground" />;
  }
};

interface ActivityCardProps {
  className?: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ className }) => {
  // Sample data for the activity log
  const activities: ActivityEvent[] = [
    {
      id: '1',
      type: 'login',
      user: 'john.doe@example.com',
      time: '2 min ago',
      ip: '192.168.1.1',
      details: 'Successful login from Chrome on Windows'
    },
    {
      id: '2',
      type: 'register',
      user: 'jane.smith@example.com',
      time: '10 min ago',
      ip: '192.168.1.45',
      details: 'New user registration completed'
    },
    {
      id: '3',
      type: 'warning',
      user: 'michael.brown@example.com',
      time: '25 min ago',
      ip: '203.45.67.89',
      details: 'Failed login attempt (3rd attempt)'
    },
    {
      id: '4',
      type: 'logout',
      user: 'sarah.wilson@example.com',
      time: '46 min ago',
      ip: '192.168.0.23',
      details: 'User session ended'
    },
    {
      id: '5',
      type: 'login',
      user: 'robert.johnson@example.com',
      time: '1 hour ago',
      ip: '192.168.3.15',
      details: 'Successful login from Safari on MacOS'
    },
  ];

  return (
    <div className={cn("relative rounded-lg border border-border bg-card", className)}>
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-primary" />
          <h2 className="font-medium text-base">Real-time Activity</h2>
        </div>
        <span className="text-xs text-muted-foreground py-1 px-2 rounded-full bg-primary/10">
          Live
        </span>
      </div>
      
      <div className="divide-y divide-border overflow-hidden">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="p-4 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center mt-0.5">
                {getEventIcon(activity.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-medium text-sm block truncate">{activity.user}</span>
                    <span className="text-sm text-muted-foreground block">{activity.details}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">IP: {activity.ip}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActivityCard;
