
import React, { useState } from 'react';
import { Terminal, DownloadCloud, Filter, Clock, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import PageTransition from '@/components/common/PageTransition';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

// Combined log type to handle both activity and security events
interface LogEvent {
  id: string;
  type: 'login' | 'register' | 'logout' | 'warning' | 'success' | 'error' | 'info';
  user: string;
  time: Date | string;
  source?: string;
  ip?: string;
  details: string;
  category: 'activity' | 'security'; // To differentiate between activity and security logs
}

const getEventIcon = (type: string) => {
  switch (type) {
    case 'login':
      return <div className="w-3 h-3 rounded-full bg-green-400" />;
    case 'register':
      return <div className="w-3 h-3 rounded-full bg-blue-400" />;
    case 'logout':
      return <div className="w-3 h-3 rounded-full bg-orange-400" />;
    case 'warning':
      return <div className="w-3 h-3 rounded-full bg-yellow-400" />;
    case 'error':
      return <div className="w-3 h-3 rounded-full bg-red-400" />;
    case 'success':
      return <div className="w-3 h-3 rounded-full bg-green-400" />;
    case 'info':
      return <div className="w-3 h-3 rounded-full bg-blue-400" />;
    default:
      return <div className="w-3 h-3 rounded-full bg-gray-400" />;
  }
};

const getEventClass = (type: string) => {
  switch (type) {
    case 'login':
    case 'success':
      return 'border-l-green-400';
    case 'register':
    case 'info':
      return 'border-l-blue-400';
    case 'logout':
      return 'border-l-orange-400';
    case 'warning':
      return 'border-l-yellow-400';
    case 'error':
      return 'border-l-red-400';
    default:
      return 'border-l-gray-400';
  }
};

const formatTime = (time: Date | string) => {
  if (typeof time === 'string') {
    return time;
  }
  return format(time, 'HH:mm:ss');
};

const formatDate = (time: Date | string) => {
  if (typeof time === 'string') {
    return 'Today';
  }
  return format(time, 'yyyy-MM-dd');
};

const RealtimeLogs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data for combined logs
  const allLogs: LogEvent[] = [
    {
      id: '1',
      type: 'login',
      user: 'john.doe@example.com',
      time: new Date(Date.now() - 1000 * 60 * 2), // 2 mins ago
      ip: '192.168.1.1',
      details: 'Successful login from Chrome on Windows',
      category: 'activity'
    },
    {
      id: '2',
      type: 'register',
      user: 'jane.smith@example.com',
      time: new Date(Date.now() - 1000 * 60 * 10), // 10 mins ago
      ip: '192.168.1.45',
      details: 'New user registration completed',
      category: 'activity'
    },
    {
      id: '3',
      type: 'warning',
      user: 'michael.brown@example.com',
      time: new Date(Date.now() - 1000 * 60 * 25), // 25 mins ago
      ip: '203.45.67.89',
      details: 'Failed login attempt (3rd attempt)',
      category: 'security'
    },
    {
      id: '4',
      type: 'error',
      user: 'system',
      time: new Date(Date.now() - 1000 * 60 * 35), // 35 mins ago
      source: 'Firewall',
      details: 'Potential DDoS attack detected and blocked',
      category: 'security'
    },
    {
      id: '5',
      type: 'logout',
      user: 'sarah.wilson@example.com',
      time: new Date(Date.now() - 1000 * 60 * 46), // 46 mins ago
      ip: '192.168.0.23',
      details: 'User session ended',
      category: 'activity'
    },
    {
      id: '6',
      type: 'success',
      user: 'system',
      time: new Date(Date.now() - 1000 * 60 * 55), // 55 mins ago
      source: 'Backup Service',
      details: 'Daily database backup completed successfully',
      category: 'security'
    },
    {
      id: '7',
      type: 'login',
      user: 'robert.johnson@example.com',
      time: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      ip: '192.168.3.15',
      details: 'Successful login from Safari on MacOS',
      category: 'activity'
    },
    {
      id: '8',
      type: 'info',
      user: 'admin',
      time: new Date(Date.now() - 1000 * 60 * 70), // 1h 10m ago
      source: 'User Management',
      details: 'User role updated for jane.smith@example.com',
      category: 'security'
    },
    {
      id: '9',
      type: 'warning',
      user: 'system',
      time: new Date(Date.now() - 1000 * 60 * 85), // 1h 25m ago
      source: 'Resource Monitor',
      details: 'High CPU usage detected (85%)',
      category: 'security'
    },
    {
      id: '10',
      type: 'error',
      user: 'api.service',
      time: new Date(Date.now() - 1000 * 60 * 100), // 1h 40m ago
      source: 'API Gateway',
      details: 'Rate limit exceeded for client ID: 45872',
      category: 'security'
    }
  ];

  // Filter logs based on the active tab and search query
  const filteredLogs = allLogs
    .filter(log => {
      if (activeTab === 'all') return true;
      if (activeTab === 'activity') return log.category === 'activity';
      if (activeTab === 'security') return log.category === 'security';
      return true;
    })
    .filter(log => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        log.user.toLowerCase().includes(query) ||
        log.details.toLowerCase().includes(query) ||
        (log.source && log.source.toLowerCase().includes(query)) ||
        (log.ip && log.ip.toLowerCase().includes(query))
      );
    });

  const groupedLogs: { [key: string]: LogEvent[] } = {};
  
  // Group logs by date
  filteredLogs.forEach(log => {
    const date = formatDate(log.time);
    if (!groupedLogs[date]) {
      groupedLogs[date] = [];
    }
    groupedLogs[date].push(log);
  });

  return (
    <PageTransition>
      <div className="min-h-screen p-4 md:p-6">
        <div className="flex flex-col space-y-6">
          {/* Header */}
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex items-center gap-2">
              <Terminal className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Real-time Logs</h1>
            </div>
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <Button variant="outline" size="sm" className="group">
                <RefreshCw size={16} className="mr-2 group-hover:rotate-180 transition-transform duration-500" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <DownloadCloud size={16} className="mr-2" />
                Export
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter size={16} className="mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Last 24 hours</DropdownMenuItem>
                  <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                  <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                  <DropdownMenuItem>Custom range...</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Tabs and Search */}
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">All Logs</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative w-full md:w-64">
              <Input
                type="text"
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-3 pr-10"
              />
            </div>
          </div>

          {/* Logs Display */}
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="grid grid-cols-[auto_1fr_auto] gap-4 p-4 bg-background/50 font-medium text-sm border-b border-border">
              <div>Status</div>
              <div>Details</div>
              <div>Time</div>
            </div>

            <div className="divide-y divide-border overflow-auto max-h-[calc(100vh-280px)]">
              {Object.keys(groupedLogs).map(date => (
                <React.Fragment key={date}>
                  <div className="py-2 px-4 bg-muted/30 text-sm font-medium sticky top-0">
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      {date}
                    </div>
                  </div>
                  {groupedLogs[date].map((log, index) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={cn(
                        "grid grid-cols-[auto_1fr_auto] gap-4 p-4 hover:bg-muted/30 transition-colors border-l-4",
                        getEventClass(log.type)
                      )}
                    >
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        {getEventIcon(log.type)}
                        <span className="text-sm">{log.type.charAt(0).toUpperCase() + log.type.slice(1)}</span>
                      </div>
                      
                      <div className="min-w-0">
                        <div className="flex flex-col">
                          <span className="font-medium text-sm truncate">
                            {log.user}
                            {log.source && <span className="text-muted-foreground"> – {log.source}</span>}
                          </span>
                          <span className="text-sm text-muted-foreground truncate">{log.details}</span>
                          {log.ip && <span className="text-xs text-muted-foreground">IP: {log.ip}</span>}
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatTime(log.time)}
                      </div>
                    </motion.div>
                  ))}
                </React.Fragment>
              ))}
              
              {filteredLogs.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  No logs found for the current filters.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default RealtimeLogs;
