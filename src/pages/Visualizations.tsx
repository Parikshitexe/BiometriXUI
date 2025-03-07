
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/common/PageTransition';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { BarChart3, PieChart, LineChart, Activity, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  PieChart as RechartPieChart,
  Pie,
  Cell,
  LineChart as RechartLineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Sample data for the visualizations
const userActivityByRegion = [
  { name: 'North America', value: 2450 },
  { name: 'Europe', value: 1890 },
  { name: 'Asia', value: 3200 },
  { name: 'South America', value: 940 },
  { name: 'Africa', value: 620 },
  { name: 'Oceania', value: 510 },
];

const weeklyLoginAttempts = [
  { name: 'Mon', success: 354, failed: 28 },
  { name: 'Tue', success: 286, failed: 15 },
  { name: 'Wed', success: 420, failed: 32 },
  { name: 'Thu', success: 380, failed: 24 },
  { name: 'Fri', success: 520, failed: 45 },
  { name: 'Sat', success: 240, failed: 18 },
  { name: 'Sun', success: 180, failed: 12 },
];

const monthlyUsers = [
  { name: 'Jan', active: 4000, new: 2400 },
  { name: 'Feb', active: 3000, new: 1398 },
  { name: 'Mar', active: 2000, new: 9800 },
  { name: 'Apr', active: 2780, new: 3908 },
  { name: 'May', active: 1890, new: 4800 },
  { name: 'Jun', active: 2390, new: 3800 },
  { name: 'Jul', active: 3490, new: 4300 },
  { name: 'Aug', active: 4000, new: 2400 },
  { name: 'Sep', active: 3000, new: 1398 },
  { name: 'Oct', active: 2000, new: 9800 },
  { name: 'Nov', active: 2780, new: 3908 },
  { name: 'Dec', active: 3490, new: 4300 },
];

const securityIncidents = [
  { name: 'Jan', bruteForce: 240, phishing: 120, malware: 60, unauthorized: 180 },
  { name: 'Feb', bruteForce: 300, phishing: 100, malware: 70, unauthorized: 150 },
  { name: 'Mar', bruteForce: 200, phishing: 140, malware: 50, unauthorized: 130 },
  { name: 'Apr', bruteForce: 280, phishing: 110, malware: 40, unauthorized: 120 },
  { name: 'May', bruteForce: 250, phishing: 90, malware: 65, unauthorized: 140 },
  { name: 'Jun', bruteForce: 350, phishing: 130, malware: 80, unauthorized: 170 },
];

// Define colors for pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

const Visualizations: React.FC = () => {
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [timeRange, setTimeRange] = useState('week');
  const isMobile = useIsMobile();
  
  React.useEffect(() => {
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
                <BarChart3 size={20} className="text-primary" />
                <h1 className="text-2xl font-semibold tracking-tight">Visualizations</h1>
              </div>
              <p className="text-muted-foreground">
                Comprehensive visual analytics of BiometriX system performance and user behavior.
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <Tabs defaultValue="charts" className="w-full">
                <TabsList>
                  <TabsTrigger value="charts">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Charts
                  </TabsTrigger>
                  <TabsTrigger value="area">
                    <Activity className="h-4 w-4 mr-2" />
                    Area
                  </TabsTrigger>
                  <TabsTrigger value="pie">
                    <PieChart className="h-4 w-4 mr-2" />
                    Distribution
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Last 24 Hours</SelectItem>
                    <SelectItem value="week">Last 7 Days</SelectItem>
                    <SelectItem value="month">Last 30 Days</SelectItem>
                    <SelectItem value="quarter">Last Quarter</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Tabs defaultValue="charts" className="w-full">
              <TabsContent value="charts" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>Login Attempts</CardTitle>
                            <CardDescription>Weekly overview of successful vs. failed logins</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[350px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyLoginAttempts} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                              <Legend 
                                verticalAlign="bottom" 
                                height={36}
                                formatter={(value) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>}
                              />
                              <Bar 
                                dataKey="success" 
                                fill="hsl(var(--primary))" 
                                radius={[4, 4, 0, 0]} 
                                barSize={20}
                                name="Successful Logins"
                              />
                              <Bar 
                                dataKey="failed" 
                                fill="hsl(var(--destructive))" 
                                radius={[4, 4, 0, 0]} 
                                barSize={20}
                                name="Failed Attempts"
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
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>Monthly User Trends</CardTitle>
                            <CardDescription>Active users and new registrations</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[350px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartLineChart 
                              data={monthlyUsers} 
                              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                            >
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
                              <Legend 
                                verticalAlign="bottom" 
                                height={36}
                                formatter={(value) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="active" 
                                stroke="hsl(var(--primary))" 
                                strokeWidth={2}
                                dot={{ r: 3, strokeWidth: 2, fill: 'hsl(var(--background))' }}
                                activeDot={{ r: 6 }}
                                name="Active Users"
                              />
                              <Line 
                                type="monotone" 
                                dataKey="new" 
                                stroke="#82ca9d" 
                                strokeWidth={2}
                                dot={{ r: 3, strokeWidth: 2, fill: 'hsl(var(--background))' }}
                                activeDot={{ r: 6 }}
                                name="New Registrations"
                              />
                            </RechartLineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </TabsContent>
              
              <TabsContent value="area" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="mb-6">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Security Incidents Over Time</CardTitle>
                          <CardDescription>Breakdown of security incidents by type</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[450px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart 
                            data={securityIncidents} 
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                          >
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
                            <Legend 
                              verticalAlign="bottom" 
                              height={36}
                              formatter={(value) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="bruteForce" 
                              stackId="1" 
                              stroke="#8884d8" 
                              fill="#8884d8" 
                              name="Brute Force Attacks"
                            />
                            <Area 
                              type="monotone" 
                              dataKey="phishing" 
                              stackId="1" 
                              stroke="#82ca9d" 
                              fill="#82ca9d" 
                              name="Phishing Attempts"
                            />
                            <Area 
                              type="monotone" 
                              dataKey="malware" 
                              stackId="1" 
                              stroke="#ffc658" 
                              fill="#ffc658" 
                              name="Malware Detected"
                            />
                            <Area 
                              type="monotone" 
                              dataKey="unauthorized" 
                              stackId="1" 
                              stroke="#ff8042" 
                              fill="#ff8042" 
                              name="Unauthorized Access"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="pie" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>User Distribution by Region</CardTitle>
                            <CardDescription>Geographical breakdown of user base</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[350px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartPieChart>
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
                              <Legend 
                                verticalAlign="bottom" 
                                layout="horizontal"
                                formatter={(value) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>}
                              />
                              <Pie
                                data={userActivityByRegion}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                labelLine={false}
                              >
                                {userActivityByRegion.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                            </RechartPieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </PageTransition>
      </div>
    </div>
  );
};

export default Visualizations;
