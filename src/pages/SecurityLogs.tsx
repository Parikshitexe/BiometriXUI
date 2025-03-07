
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/common/PageTransition';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { Shield, Filter, Calendar, Download, AlertCircle, Eye } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// Sample security log data
const securityLogs = [
  { 
    id: 1, 
    event: "Failed Login Attempt", 
    severity: "High", 
    source: "Auth System", 
    ip: "203.45.67.89", 
    timestamp: "2023-06-10 14:32:45", 
    details: "Multiple failed login attempts for user john.doe@example.com" 
  },
  { 
    id: 2, 
    event: "New Admin User Created", 
    severity: "Medium", 
    source: "User Management", 
    ip: "192.168.1.45", 
    timestamp: "2023-06-10 13:15:22", 
    details: "New admin user 'admin2' created by 'admin1'" 
  },
  { 
    id: 3, 
    event: "Password Reset", 
    severity: "Low", 
    source: "Auth System", 
    ip: "192.168.1.102", 
    timestamp: "2023-06-10 12:05:11", 
    details: "Password reset for user sarah.brown@example.com" 
  },
  { 
    id: 4, 
    event: "API Token Revoked", 
    severity: "Medium", 
    source: "API Gateway", 
    ip: "192.168.1.1", 
    timestamp: "2023-06-10 11:47:36", 
    details: "API token for service 'analytics' was revoked" 
  },
  { 
    id: 5, 
    event: "Account Locked", 
    severity: "High", 
    source: "Auth System", 
    ip: "203.45.67.89", 
    timestamp: "2023-06-10 10:32:18", 
    details: "Account 'robert.johnson' locked after 5 failed attempts" 
  },
  { 
    id: 6, 
    event: "File Access", 
    severity: "Low", 
    source: "File System", 
    ip: "192.168.1.45", 
    timestamp: "2023-06-10 09:15:49", 
    details: "User 'jane.smith' accessed sensitive document 'financial-2023.pdf'" 
  },
  { 
    id: 7, 
    event: "System Update", 
    severity: "Low", 
    source: "Update Service", 
    ip: "192.168.1.1", 
    timestamp: "2023-06-10 08:05:33", 
    details: "System updated to version 2.4.5" 
  },
  { 
    id: 8, 
    event: "Suspicious Activity", 
    severity: "High", 
    source: "Behavior Analysis", 
    ip: "209.58.178.45", 
    timestamp: "2023-06-10 07:44:21", 
    details: "Unusual access pattern detected for user 'michael.wilson'" 
  },
  { 
    id: 9, 
    event: "Database Backup", 
    severity: "Low", 
    source: "Database", 
    ip: "192.168.1.2", 
    timestamp: "2023-06-10 06:30:09", 
    details: "Automated database backup completed successfully" 
  },
  { 
    id: 10, 
    event: "Permission Change", 
    severity: "Medium", 
    source: "User Management", 
    ip: "192.168.1.45", 
    timestamp: "2023-06-10 05:22:47", 
    details: "User 'emily.davis' granted 'editor' permissions" 
  },
];

// Sample data for the line chart
const severityTrendData = [
  { date: 'Jun 04', low: 12, medium: 8, high: 3 },
  { date: 'Jun 05', low: 10, medium: 5, high: 2 },
  { date: 'Jun 06', low: 15, medium: 9, high: 1 },
  { date: 'Jun 07', low: 8, medium: 6, high: 5 },
  { date: 'Jun 08', low: 13, medium: 11, high: 4 },
  { date: 'Jun 09', low: 11, medium: 7, high: 2 },
  { date: 'Jun 10', low: 14, medium: 10, high: 6 },
];

const SecurityLogs: React.FC = () => {
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter logs based on search term
  const filteredLogs = securityLogs.filter(log => 
    log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.ip.includes(searchTerm) ||
    log.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div 
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        <Header sidebarWidth={sidebarWidth} />
        
        <PageTransition>
          <main className="px-6 pt-24 pb-8">
            <div className="flex flex-col gap-2 mb-8">
              <div className="flex items-center gap-2">
                <Shield size={20} className="text-primary" />
                <h1 className="text-2xl font-semibold tracking-tight">Security Logs</h1>
              </div>
              <p className="text-muted-foreground">
                Monitor and analyze security events and activities.
              </p>
            </div>
            
            <Tabs defaultValue="logs" className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="logs">Security Logs</TabsTrigger>
                  <TabsTrigger value="trends">Severity Trends</TabsTrigger>
                </TabsList>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Calendar size={14} />
                    <span className="hidden md:inline">Date Range</span>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download size={14} />
                    <span className="hidden md:inline">Export</span>
                  </Button>
                </div>
              </div>
              
              <TabsContent value="logs" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <CardTitle>All Security Events</CardTitle>
                          <CardDescription>Detailed log of all security-related activities</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <Input
                              placeholder="Search logs..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="w-full md:w-64 pl-8"
                            />
                            <div className="absolute left-2.5 top-2.5 text-muted-foreground">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                              </svg>
                            </div>
                          </div>
                          <Button size="icon" variant="outline">
                            <Filter size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[50px]">#</TableHead>
                              <TableHead>Event</TableHead>
                              <TableHead>Severity</TableHead>
                              <TableHead>Source</TableHead>
                              <TableHead>IP Address</TableHead>
                              <TableHead>Timestamp</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredLogs.length > 0 ? (
                              filteredLogs.map((log) => (
                                <TableRow key={log.id}>
                                  <TableCell className="font-medium">{log.id}</TableCell>
                                  <TableCell>{log.event}</TableCell>
                                  <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                      log.severity === 'High' 
                                        ? 'bg-red-500/20 text-red-500' 
                                        : log.severity === 'Medium' 
                                        ? 'bg-amber-500/20 text-amber-500' 
                                        : 'bg-green-500/20 text-green-500'
                                    }`}>
                                      {log.severity}
                                    </span>
                                  </TableCell>
                                  <TableCell>{log.source}</TableCell>
                                  <TableCell>{log.ip}</TableCell>
                                  <TableCell>{log.timestamp}</TableCell>
                                  <TableCell className="text-right">
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 gap-1"
                                      title="View Details"
                                    >
                                      <Eye size={14} />
                                      <span className="sr-only">Details</span>
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                  <div className="flex flex-col items-center justify-center">
                                    <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                                    <p className="text-muted-foreground">No logs matching your search.</p>
                                  </div>
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="trends" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Event Trends</CardTitle>
                      <CardDescription>7-day overview of security events by severity</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={severityTrendData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                            <XAxis 
                              dataKey="date" 
                              stroke="hsl(var(--muted-foreground))" 
                              fontSize={12}
                              tickLine={false}
                              axisLine={false}
                            />
                            <YAxis 
                              stroke="hsl(var(--muted-foreground))" 
                              fontSize={12}
                              tickLine={false}
                              axisLine={false}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'hsl(var(--card))', 
                                borderColor: 'hsl(var(--border))',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                color: 'hsl(var(--foreground))'
                              }}
                              itemStyle={{
                                color: 'hsl(var(--foreground))'
                              }}
                              labelStyle={{
                                color: 'hsl(var(--foreground))',
                                fontWeight: 'bold'
                              }}
                            />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="high" 
                              name="High Severity" 
                              stroke="#f43f5e" 
                              strokeWidth={2}
                              dot={{ r: 4, strokeWidth: 2 }}
                              activeDot={{ r: 6, strokeWidth: 2 }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="medium" 
                              name="Medium Severity" 
                              stroke="#f59e0b" 
                              strokeWidth={2}
                              dot={{ r: 4, strokeWidth: 2 }}
                              activeDot={{ r: 6, strokeWidth: 2 }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="low" 
                              name="Low Severity" 
                              stroke="#10b981" 
                              strokeWidth={2}
                              dot={{ r: 4, strokeWidth: 2 }}
                              activeDot={{ r: 6, strokeWidth: 2 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </main>
        </PageTransition>
      </div>
    </div>
  );
};

export default SecurityLogs;
