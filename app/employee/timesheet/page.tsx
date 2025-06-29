'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  Play, 
  Pause, 
  Square as Stop, 
  Plus, 
  CalendarIcon, 
  Timer, 
  BarChart3, 
  TrendingUp,
  Edit,
  Trash2,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Download,
  Filter,
  Search,
  RefreshCw
} from 'lucide-react';
import { format, addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

interface TimeEntry {
  id: string;
  date: string;
  project: string;
  task: string;
  description: string;
  startTime: string;
  endTime?: string;
  duration: number; // in minutes
  status: 'running' | 'completed' | 'pending_approval' | 'approved';
  isManual: boolean;
}

interface Project {
  id: string;
  name: string;
  client: string;
  color: string;
  isActive: boolean;
}

export default function TimesheetPage() {
  const [currentTimer, setCurrentTimer] = useState({
    isRunning: false,
    project: '',
    task: '',
    description: '',
    startTime: '',
    elapsed: 0 // in seconds
  });

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedWeek, setSelectedWeek] = useState<Date>(new Date());
  const [editingEntry, setEditingEntry] = useState<string | null>(null);
  const [filterProject, setFilterProject] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');

  const user = {
    name: 'Ravikrishna J',
    email: 'ravikrishna@epicallayouts.com'
  };

  const projects: Project[] = [
    { id: '1', name: 'Website Redesign', client: 'EPICAL LAYOUTS', color: '#3B82F6', isActive: true },
    { id: '2', name: 'Mobile App UI', client: 'TechCorp', color: '#10B981', isActive: true },
    { id: '3', name: 'Brand Guidelines', client: 'StartupXYZ', color: '#8B5CF6', isActive: true },
    { id: '4', name: 'E-commerce Platform', client: 'RetailCo', color: '#F59E0B', isActive: true },
    { id: '5', name: 'Client Portal', client: 'ServicePro', color: '#EF4444', isActive: true }
  ];

  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([
    {
      id: '1',
      date: format(new Date(), 'yyyy-MM-dd'),
      project: 'Website Redesign',
      task: 'Frontend Development',
      description: 'Implementing responsive navbar and hero section',
      startTime: '09:00',
      endTime: '12:30',
      duration: 210,
      status: 'completed',
      isManual: false
    },
    {
      id: '2',
      date: format(new Date(), 'yyyy-MM-dd'),
      project: 'Mobile App UI',
      task: 'Design Review',
      description: 'Reviewing wireframes and providing feedback',
      startTime: '14:00',
      endTime: '15:30',
      duration: 90,
      status: 'completed',
      isManual: false
    },
    {
      id: '3',
      date: format(addDays(new Date(), -1), 'yyyy-MM-dd'),
      project: 'Brand Guidelines',
      task: 'Logo Design',
      description: 'Creating brand logo variations',
      startTime: '10:00',
      endTime: '17:00',
      duration: 420,
      status: 'approved',
      isManual: false
    }
  ]);

  const [newEntry, setNewEntry] = useState({
    project: '',
    task: '',
    description: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '',
    endTime: '',
    duration: ''
  });

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentTimer.isRunning) {
      interval = setInterval(() => {
        setCurrentTimer(prev => ({ ...prev, elapsed: prev.elapsed + 1 }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentTimer.isRunning]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const startTimer = () => {
    if (!currentTimer.project || !currentTimer.task) {
      alert('Please select a project and enter a task description');
      return;
    }
    
    setCurrentTimer(prev => ({
      ...prev,
      isRunning: true,
      startTime: format(new Date(), 'HH:mm'),
      elapsed: 0
    }));
  };

  const pauseTimer = () => {
    setCurrentTimer(prev => ({ ...prev, isRunning: false }));
  };

  const stopTimer = () => {
    if (currentTimer.elapsed === 0) return;

    const newTimeEntry: TimeEntry = {
      id: Date.now().toString(),
      date: format(new Date(), 'yyyy-MM-dd'),
      project: currentTimer.project,
      task: currentTimer.task,
      description: currentTimer.description,
      startTime: currentTimer.startTime,
      endTime: format(new Date(), 'HH:mm'),
      duration: Math.floor(currentTimer.elapsed / 60),
      status: 'completed',
      isManual: false
    };

    setTimeEntries(prev => [newTimeEntry, ...prev]);
    setCurrentTimer({
      isRunning: false,
      project: '',
      task: '',
      description: '',
      startTime: '',
      elapsed: 0
    });
  };

  const addManualEntry = () => {
    if (!newEntry.project || !newEntry.task || !newEntry.startTime || !newEntry.endTime) {
      alert('Please fill in all required fields');
      return;
    }

    const start = new Date(`${newEntry.date}T${newEntry.startTime}`);
    const end = new Date(`${newEntry.date}T${newEntry.endTime}`);
    const duration = Math.floor((end.getTime() - start.getTime()) / (1000 * 60));

    if (duration <= 0) {
      alert('End time must be after start time');
      return;
    }

    const manualEntry: TimeEntry = {
      id: Date.now().toString(),
      date: newEntry.date,
      project: newEntry.project,
      task: newEntry.task,
      description: newEntry.description,
      startTime: newEntry.startTime,
      endTime: newEntry.endTime,
      duration,
      status: 'pending_approval',
      isManual: true
    };

    setTimeEntries(prev => [manualEntry, ...prev]);
    setNewEntry({
      project: '',
      task: '',
      description: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '',
      endTime: '',
      duration: ''
    });
  };

  const deleteEntry = (id: string) => {
    setTimeEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const getProjectColor = (projectName: string) => {
    const project = projects.find(p => p.name === projectName);
    return project?.color || '#6B7280';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'pending_approval': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Play className="h-3 w-3" />;
      case 'completed': return <CheckCircle className="h-3 w-3" />;
      case 'pending_approval': return <AlertCircle className="h-3 w-3" />;
      case 'approved': return <CheckCircle className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  const filteredEntries = timeEntries.filter(entry => {
    const matchesProject = filterProject === 'all' || entry.project === filterProject;
    const matchesSearch = entry.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesProject && matchesSearch;
  });

  const todaysEntries = filteredEntries.filter(entry => entry.date === format(selectedDate, 'yyyy-MM-dd'));
  const weekStart = startOfWeek(selectedWeek, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(selectedWeek, { weekStartsOn: 1 });
  const weekEntries = filteredEntries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate >= weekStart && entryDate <= weekEnd;
  });

  const todaysTotalMinutes = todaysEntries.reduce((total, entry) => total + entry.duration, 0);
  const weeksTotalMinutes = weekEntries.reduce((total, entry) => total + entry.duration, 0);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Timesheet Management" user={user} />
        
        <main className="flex-1 overflow-auto p-6 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Timer Section */}
            <Card className={`${currentTimer.isRunning ? 'bg-gradient-to-r from-green-50 to-blue-50 border-green-200' : 'bg-gray-50'} transition-all duration-300`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${currentTimer.isRunning ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <Timer className={`h-6 w-6 ${currentTimer.isRunning ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {currentTimer.isRunning ? 'Timer Running' : 'Start New Timer'}
                      </h3>
                      <p className="text-gray-600">Track your work time</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-4xl font-bold ${currentTimer.isRunning ? 'text-green-600' : 'text-gray-400'}`}>
                      {formatTime(currentTimer.elapsed)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label>Project</Label>
                    <Select 
                      value={currentTimer.project} 
                      onValueChange={(value) => setCurrentTimer(prev => ({ ...prev, project: value }))}
                      disabled={currentTimer.isRunning}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.filter(p => p.isActive).map((project) => (
                          <SelectItem key={project.id} value={project.name}>
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: project.color }}
                              />
                              {project.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Task</Label>
                    <Input
                      placeholder="What are you working on?"
                      value={currentTimer.task}
                      onChange={(e) => setCurrentTimer(prev => ({ ...prev, task: e.target.value }))}
                      disabled={currentTimer.isRunning}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description (Optional)</Label>
                    <Input
                      placeholder="Add details..."
                      value={currentTimer.description}
                      onChange={(e) => setCurrentTimer(prev => ({ ...prev, description: e.target.value }))}
                      disabled={currentTimer.isRunning}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  {!currentTimer.isRunning ? (
                    <Button onClick={startTimer} className="bg-green-600 hover:bg-green-700">
                      <Play className="h-4 w-4 mr-2" />
                      Start Timer
                    </Button>
                  ) : (
                    <>
                      <Button onClick={pauseTimer} variant="outline">
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </Button>
                      <Button onClick={stopTimer} className="bg-red-600 hover:bg-red-700">
                        <Stop className="h-4 w-4 mr-2" />
                        Stop & Save
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Today</p>
                      <p className="text-2xl font-bold text-blue-600">{formatDuration(todaysTotalMinutes)}</p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">This Week</p>
                      <p className="text-2xl font-bold text-green-600">{formatDuration(weeksTotalMinutes)}</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Entries Today</p>
                      <p className="text-2xl font-bold text-purple-600">{todaysEntries.length}</p>
                    </div>
                    <Timer className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Target Progress</p>
                      <p className="text-2xl font-bold text-orange-600">{Math.round((todaysTotalMinutes / 480) * 100)}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                  </div>
                  <Progress value={(todaysTotalMinutes / 480) * 100} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="daily" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="daily">Daily View</TabsTrigger>
                <TabsTrigger value="weekly">Weekly View</TabsTrigger>
                <TabsTrigger value="manual">Add Entry</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              {/* Daily View */}
              <TabsContent value="daily" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <CalendarIcon className="h-5 w-5" />
                          Daily Timesheet
                        </CardTitle>
                        <CardDescription>
                          {format(selectedDate, 'EEEE, MMMM do, yyyy')}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline">
                              <CalendarIcon className="h-4 w-4 mr-2" />
                              {format(selectedDate, 'MMM dd, yyyy')}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Filters */}
                    <div className="flex gap-4 mb-6">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Search tasks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <Select value={filterProject} onValueChange={setFilterProject}>
                        <SelectTrigger className="w-48">
                          <Filter className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="All Projects" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Projects</SelectItem>
                          {projects.map((project) => (
                            <SelectItem key={project.id} value={project.name}>
                              {project.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Time Entries */}
                    <div className="space-y-4">
                      {todaysEntries.map((entry) => (
                        <div key={entry.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div 
                                className="w-4 h-4 rounded-full mt-1" 
                                style={{ backgroundColor: getProjectColor(entry.project) }}
                              />
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{entry.project}</h4>
                                  <Badge className={getStatusColor(entry.status)}>
                                    <div className="flex items-center gap-1">
                                      {getStatusIcon(entry.status)}
                                      {entry.status.replace('_', ' ')}
                                    </div>
                                  </Badge>
                                  {entry.isManual && (
                                    <Badge variant="outline">Manual</Badge>
                                  )}
                                </div>
                                <p className="text-sm font-medium text-gray-700">{entry.task}</p>
                                <p className="text-xs text-gray-500">{entry.description}</p>
                                <p className="text-xs text-gray-400">
                                  {entry.startTime} - {entry.endTime || 'Running'}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-lg">{formatDuration(entry.duration)}</p>
                              <div className="flex gap-1 mt-2">
                                <Button size="sm" variant="outline">
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={() => deleteEntry(entry.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {todaysEntries.length === 0 && (
                        <div className="text-center py-8">
                          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">No time entries for this day</p>
                          <p className="text-sm text-gray-400">Start the timer or add a manual entry</p>
                        </div>
                      )}
                    </div>

                    {/* Daily Summary */}
                    {todaysEntries.length > 0 && (
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Total Time Today:</span>
                          <span className="text-xl font-bold text-blue-600">
                            {formatDuration(todaysTotalMinutes)}
                          </span>
                        </div>
                        <div className="mt-2">
                          <Progress value={(todaysTotalMinutes / 480) * 100} className="h-2" />
                          <p className="text-xs text-gray-600 mt-1">
                            {Math.round((todaysTotalMinutes / 480) * 100)}% of 8-hour target
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Weekly View */}
              <TabsContent value="weekly" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="h-5 w-5" />
                          Weekly Timesheet
                        </CardTitle>
                        <CardDescription>
                          {format(weekStart, 'MMM dd')} - {format(weekEnd, 'MMM dd, yyyy')}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          onClick={() => setSelectedWeek(addDays(selectedWeek, -7))}
                        >
                          Previous Week
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setSelectedWeek(addDays(selectedWeek, 7))}
                        >
                          Next Week
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {weekDays.map((day) => {
                        const dayEntries = weekEntries.filter(entry => entry.date === format(day, 'yyyy-MM-dd'));
                        const dayTotal = dayEntries.reduce((total, entry) => total + entry.duration, 0);
                        const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

                        return (
                          <div key={format(day, 'yyyy-MM-dd')} className={`p-4 border rounded-lg ${isToday ? 'border-blue-300 bg-blue-50' : ''}`}>
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h4 className="font-medium">{format(day, 'EEEE')}</h4>
                                <p className="text-sm text-gray-500">{format(day, 'MMM dd')}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">{formatDuration(dayTotal)}</p>
                                <p className="text-xs text-gray-500">{dayEntries.length} entries</p>
                              </div>
                            </div>
                            
                            {dayEntries.length > 0 && (
                              <div className="space-y-2">
                                {dayEntries.map((entry) => (
                                  <div key={entry.id} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                      <div 
                                        className="w-2 h-2 rounded-full" 
                                        style={{ backgroundColor: getProjectColor(entry.project) }}
                                      />
                                      <span>{entry.project}</span>
                                      <span className="text-gray-500">•</span>
                                      <span className="text-gray-600">{entry.task}</span>
                                    </div>
                                    <span className="font-medium">{formatDuration(entry.duration)}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {dayTotal > 0 && (
                              <div className="mt-3">
                                <Progress value={(dayTotal / 480) * 100} className="h-1" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Weekly Summary */}
                    <div className="mt-6 p-4 bg-green-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total Week:</span>
                        <span className="text-xl font-bold text-green-600">
                          {formatDuration(weeksTotalMinutes)}
                        </span>
                      </div>
                      <div className="mt-2">
                        <Progress value={(weeksTotalMinutes / (480 * 5)) * 100} className="h-2" />
                        <p className="text-xs text-gray-600 mt-1">
                          {Math.round((weeksTotalMinutes / (480 * 5)) * 100)}% of 40-hour target
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Manual Entry */}
              <TabsContent value="manual" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      Add Manual Time Entry
                    </CardTitle>
                    <CardDescription>
                      Add time entries for work completed offline
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={newEntry.date}
                          onChange={(e) => setNewEntry(prev => ({ ...prev, date: e.target.value }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="project">Project</Label>
                        <Select value={newEntry.project} onValueChange={(value) => setNewEntry(prev => ({ ...prev, project: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select project" />
                          </SelectTrigger>
                          <SelectContent>
                            {projects.filter(p => p.isActive).map((project) => (
                              <SelectItem key={project.id} value={project.name}>
                                <div className="flex items-center gap-2">
                                  <div 
                                    className="w-3 h-3 rounded-full" 
                                    style={{ backgroundColor: project.color }}
                                  />
                                  {project.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="task">Task Description</Label>
                      <Input
                        id="task"
                        placeholder="What did you work on?"
                        value={newEntry.task}
                        onChange={(e) => setNewEntry(prev => ({ ...prev, task: e.target.value }))}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startTime">Start Time</Label>
                        <Input
                          id="startTime"
                          type="time"
                          value={newEntry.startTime}
                          onChange={(e) => setNewEntry(prev => ({ ...prev, startTime: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endTime">End Time</Label>
                        <Input
                          id="endTime"
                          type="time"
                          value={newEntry.endTime}
                          onChange={(e) => setNewEntry(prev => ({ ...prev, endTime: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        placeholder="Add more details about your work..."
                        value={newEntry.description}
                        onChange={(e) => setNewEntry(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>

                    <Button onClick={addManualEntry} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Time Entry
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reports */}
              <TabsContent value="reports" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Breakdown</CardTitle>
                      <CardDescription>Time distribution by project</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {projects.map((project) => {
                          const projectEntries = timeEntries.filter(entry => entry.project === project.name);
                          const projectTotal = projectEntries.reduce((total, entry) => total + entry.duration, 0);
                          const percentage = weeksTotalMinutes > 0 ? (projectTotal / weeksTotalMinutes) * 100 : 0;

                          return (
                            <div key={project.id} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <div 
                                    className="w-3 h-3 rounded-full" 
                                    style={{ backgroundColor: project.color }}
                                  />
                                  <span className="text-sm font-medium">{project.name}</span>
                                </div>
                                <span className="text-sm text-gray-600">{formatDuration(projectTotal)}</span>
                              </div>
                              <Progress value={percentage} className="h-2" />
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Weekly Summary</CardTitle>
                      <CardDescription>Performance metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <span>Total Hours</span>
                          <span className="font-semibold text-blue-600">{formatDuration(weeksTotalMinutes)}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span>Daily Average</span>
                          <span className="font-semibold text-green-600">{formatDuration(Math.floor(weeksTotalMinutes / 7))}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                          <span>Total Entries</span>
                          <span className="font-semibold text-purple-600">{weekEntries.length}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                          <span>Target Progress</span>
                          <span className="font-semibold text-orange-600">
                            {Math.round((weeksTotalMinutes / (480 * 5)) * 100)}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}