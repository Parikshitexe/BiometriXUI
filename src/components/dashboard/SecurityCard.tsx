
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck,
  ShieldX,
  AlertTriangle,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface SecurityEvent {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  event: string;
  time: Date;
  source: string;
  details: string;
}

const getEventIcon = (type: string) => {
  switch (type) {
    case 'success':
      return <ShieldCheck size={16} className="text-green-400" />;
    case 'warning':
      return <AlertTriangle size={16} className="text-yellow-400" />;
    case 'error':
      return <ShieldX size={16} className="text-red-400" />;
    case 'info':
      return <ShieldAlert size={16} className="text-blue-400" />;
    default:
      return <Shield size={16} className="text-muted-foreground" />;
  }
};

interface SecurityCardProps {
  className?: string;
}

const SecurityCard: React.FC<SecurityCardProps> = ({ className }) => {
  // Sample data for the security log
  const securityLogs: SecurityEvent[] = [
    {
      id: '1',
      type: 'error',
      event: 'Brute Force Attempt',
      time: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      source: 'Auth System',
      details: 'Multiple failed login attempts from IP 203.45.67.89'
    },
    {
      id: '2',
      type: 'warning',
      event: 'New Device Login',
      time: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      source: 'Login Service',
      details: 'John Doe logged in from a new device in San Francisco'
    },
    {
      id: '3',
      type: 'info',
      event: 'Permission Change',
      time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      source: 'Admin Panel',
      details: 'Admin changed permissions for role "Editor"'
    },
    {
      id: '4',
      type: 'success',
      event: 'Security Scan Completed',
      time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      source: 'Security Module',
      details: 'Scheduled security scan completed with no issues found'
    },
    {
      id: '5',
      type: 'warning',
      event: 'Password Policy',
      time: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      source: 'Security Module',
      details: '3 users have passwords that will expire in 5 days'
    },
  ];

  return (
    <div className={cn("relative rounded-lg border border-border bg-card", className)}>
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Shield size={18} className="text-primary" />
          <h2 className="font-medium text-base">Security Logs</h2>
        </div>
        <button className="text-xs text-primary flex items-center gap-1 hover:underline">
          <Eye size={14} />
          <span>View All</span>
        </button>
      </div>
      
      <div className="divide-y divide-border overflow-hidden">
        {securityLogs.map((log, index) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="p-4 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center mt-0.5">
                {getEventIcon(log.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-medium text-sm block">{log.event}</span>
                    <span className="text-sm text-muted-foreground block">{log.details}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {format(log.time, 'h:mm a')}
                    </span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {log.source}
                    </span>
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

export default SecurityCard;
