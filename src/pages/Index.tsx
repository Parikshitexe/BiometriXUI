
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/common/PageTransition';
import ActivityCard from '@/components/dashboard/ActivityCard';
import SecurityCard from '@/components/dashboard/SecurityCard';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  ArrowRight,
  LayoutDashboard
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';

// Sample data for the dashboard
const userActivityData = [
  { name: 'Mon', value: 35 },
  { name: 'Tue', value: 28 },
  { name: 'Wed', value: 42 },
  { name: 'Thu', value: 38 },
  { name: 'Fri', value: 52 },
  { name: 'Sat', value: 24 },
  { name: 'Sun', value: 18 },
];

const securityOverviewData = [
  { name: 'Login Success', value: 85 },
  { name: 'Login Failed', value: 12 },
  { name: 'New Devices', value: 23 },
  { name: 'Warnings', value: 8 },
  { name: 'Critical', value: 3 },
];

const statCards = [
  {
    title: 'Total Users',
    value: '12,487',
    change: '+12%',
    icon: <Users className="h-4 w-4 text-primary" />,
    trend: 'up'
  },
  {
    title: 'Active Sessions',
    value: '843',
    change: '+5%',
    icon: <TrendingUp className="h-4 w-4 text-primary" />,
    trend: 'up'
  },
  {
    title: 'Security Level',
    value: 'High',
    change: 'Secure',
    icon: <ShieldCheck className="h-4 w-4 text-primary" />,
    trend: 'neutral'
  },
  {
    title: 'System Uptime',
    value: '99.98%',
    change: 'Last 30 days',
    icon: <BarChart3 className="h-4 w-4 text-primary" />,
    trend: 'up'
  },
];

const Dashboard: React.FC = () => {
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Adjust sidebar width based on screen size
    if (isMobile) {
      setSidebarWidth(0);
    } else {
      setSidebarWidth(240);
    }
  }, [isMobile]);

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
                <LayoutDashboard size={20} className="text-primary" />
                <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
              </div>
              <p className="text-muted-foreground">
                Welcome back, John. Here's what's happening with your system today.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {statCards.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          {stat.icon}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className={`text-xs ${stat.trend === 'up' ? 'text-green-500' : stat.trend === 'down' ? 'text-red-500' : 'text-muted-foreground'}`}>
                        {stat.change}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>User Activity</CardTitle>
                        <CardDescription>Weekly overview of user logins and registrations</CardDescription>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-1"
                        onClick={() => navigate('/user-analytics')}
                      >
                        <span>Details</span>
                        <ArrowRight size={14} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={userActivityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                          <XAxis 
                            dataKey="name" 
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
                          <Bar 
                            dataKey="value" 
                            fill="hsl(var(--primary))" 
                            radius={[4, 4, 0, 0]} 
                            barSize={30}
                            name="Active Users"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Security Overview</CardTitle>
                        <CardDescription>Summary of security events and status</CardDescription>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-1"
                        onClick={() => navigate('/security-logs')}
                      >
                        <span>Details</span>
                        <ArrowRight size={14} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                          data={securityOverviewData} 
                          layout="vertical" 
                          margin={{ top: 10, right: 10, left: 80, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={true} vertical={false} />
                          <XAxis 
                            type="number" 
                            stroke="hsl(var(--muted-foreground))" 
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis 
                            dataKey="name" 
                            type="category" 
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
                          <Bar 
                            dataKey="value" 
                            fill="hsl(var(--primary))" 
                            radius={[0, 4, 4, 0]} 
                            barSize={20}
                            name="Count"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <ActivityCard className="h-full" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <SecurityCard className="h-full" />
              </motion.div>
            </div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
};

export default Dashboard;
