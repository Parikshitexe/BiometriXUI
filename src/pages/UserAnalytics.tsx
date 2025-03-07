
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/common/PageTransition';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { Users, Filter, ArrowUpDown, Trash2, Edit, Download, Plus } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Sample user data
const users = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Active", lastLogin: "2 hours ago" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "User", status: "Active", lastLogin: "1 day ago" },
  { id: 3, name: "Robert Johnson", email: "robert.johnson@example.com", role: "Editor", status: "Inactive", lastLogin: "2 weeks ago" },
  { id: 4, name: "Emily Davis", email: "emily.davis@example.com", role: "User", status: "Active", lastLogin: "5 hours ago" },
  { id: 5, name: "Michael Wilson", email: "michael.wilson@example.com", role: "Viewer", status: "Active", lastLogin: "3 days ago" },
  { id: 6, name: "Sarah Brown", email: "sarah.brown@example.com", role: "Editor", status: "Active", lastLogin: "12 hours ago" },
  { id: 7, name: "David Miller", email: "david.miller@example.com", role: "User", status: "Pending", lastLogin: "Never" },
  { id: 8, name: "Lisa Anderson", email: "lisa.anderson@example.com", role: "Viewer", status: "Active", lastLogin: "1 week ago" },
];

// Sample data for the pie chart
const roleData = [
  { name: 'Admin', value: 1, color: '#3b82f6' },
  { name: 'Editor', value: 2, color: '#10b981' },
  { name: 'User', value: 3, color: '#f59e0b' },
  { name: 'Viewer', value: 2, color: '#6366f1' },
];

const statusData = [
  { name: 'Active', value: 6, color: '#10b981' },
  { name: 'Inactive', value: 1, color: '#f43f5e' },
  { name: 'Pending', value: 1, color: '#f59e0b' },
];

const UserAnalytics: React.FC = () => {
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.status.toLowerCase().includes(searchTerm.toLowerCase())
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
                <Users size={20} className="text-primary" />
                <h1 className="text-2xl font-semibold tracking-tight">User Analytics</h1>
              </div>
              <p className="text-muted-foreground">
                Analyze user activity, roles, and status across the platform.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>User Roles Distribution</CardTitle>
                    <CardDescription>Breakdown of users by role assignment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={roleData}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={90}
                            paddingAngle={4}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                          >
                            {roleData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))', 
                              borderColor: 'hsl(var(--border))',
                              borderRadius: '8px',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                              color: 'hsl(var(--foreground))'
                            }}
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>User Status</CardTitle>
                    <CardDescription>Active, inactive, and pending users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={statusData}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={90}
                            paddingAngle={4}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                          >
                            {statusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))', 
                              borderColor: 'hsl(var(--border))',
                              borderRadius: '8px',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                              color: 'hsl(var(--foreground))'
                            }}
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="mb-8"
            >
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle>User List</CardTitle>
                      <CardDescription>Manage and analyze user accounts</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Input
                          placeholder="Search users..."
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
                      <Button size="icon" variant="outline">
                        <Download size={16} />
                      </Button>
                      <Button className="gap-1">
                        <Plus size={16} />
                        <span className="hidden md:inline">Add User</span>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[60px]">#</TableHead>
                          <TableHead>
                            <div className="flex items-center gap-1 cursor-pointer">
                              <span>Name</span>
                              <ArrowUpDown size={14} />
                            </div>
                          </TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Last Login</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.length > 0 ? (
                          filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell className="font-medium">{user.id}</TableCell>
                              <TableCell>{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  user.role === 'Admin' 
                                    ? 'bg-blue-500/20 text-blue-500' 
                                    : user.role === 'Editor' 
                                    ? 'bg-green-500/20 text-green-500' 
                                    : user.role === 'User' 
                                    ? 'bg-amber-500/20 text-amber-500'
                                    : 'bg-indigo-500/20 text-indigo-500'
                                }`}>
                                  {user.role}
                                </span>
                              </TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  user.status === 'Active' 
                                    ? 'bg-green-500/20 text-green-500' 
                                    : user.status === 'Inactive' 
                                    ? 'bg-red-500/20 text-red-500' 
                                    : 'bg-amber-500/20 text-amber-500'
                                }`}>
                                  {user.status}
                                </span>
                              </TableCell>
                              <TableCell>{user.lastLogin}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                                      <span className="sr-only">Open menu</span>
                                      <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                                        <path d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                      </svg>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                      <Edit size={14} /> Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="flex items-center gap-2 text-destructive cursor-pointer">
                                      <Trash2 size={14} /> Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center">
                              No users found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
};

export default UserAnalytics;
