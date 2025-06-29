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
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Coffee,
  MapPin
} from 'lucide-react';
import { format, addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, addWeeks, addMonths, isSameDay, getDay, startOfDay } from 'date-fns';

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
  breakTime?: number; // in minutes
}

interface Project {
  id: string;
  name: string;
  client: string;
  color: string;
  isActive: boolean;
}

interface DayData {
  date: Date;
  entries: TimeEntry[];
  totalTime: number;
  status: 'present' | 'absent' | 'weekend' | 'holiday';
  checkIn?: string;
  checkOut?: string;
  breakTime?: number;
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
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [editingEntry, setEditingEntry] = useState<string | null>(null);
  const [showAddEntry, setShowAddEntry] = useState(false);

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
      isManual: false,
      breakTime: 15
    },
    {
      id: '2',
      date: format(new Date(), 'yyyy-MM-dd'),
      project: 'Mobile App UI',
      task: 'Design Review',
      description: 'Reviewing wireframes and providing feedback',
      startTime: '14:00',
      endTime: '17:30',
      duration: 210,
      status: 'completed',
      isManual: false,
      breakTime: 30
    },
    {
      id: '3',
      date: format(addDays(new Date(), -1), 'yyyy-MM-dd'),
      project: 'Brand Guidelines',
      task: 'Logo Design',
      description: 'Creating brand logo variations',
      startTime: '09:30',
      endTime: '17:00',
      duration: 450,
      status: 'approved',
      isManual: false,
      breakTime: 45
    },
    {
      id: '4',
      date: format(addDays(new Date(), -2), 'yyyy-MM-dd'),
      project: 'E-commerce Platform',
      task: 'Backend API',
      description: 'Developing user authentication endpoints',
      startTime: '08:45',
      endTime: '17:15',
      duration: 510,
      status: 'approved',
      isManual: false,
      breakTime: 60
    }
  ]);

  const [newEntry, setNewEntry] = useState({
    project: '',
    task: '',
    description: '',
    startTime: '',
    endTime: '',
    breakTime: '0'
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
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
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

    const start = new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${newEntry.startTime}`);
    const end = new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${newEntry.endTime}`);
    const duration = Math.floor((end.getTime() - start.getTime()) / (1000 * 60));

    if (duration <= 0) {
      alert('End time must be after start time');
      return;
    }

    const manualEntry: TimeEntry = {
      id: Date.now().toString(),
      date: format(selectedDate, 'yyyy-MM-dd'),
      project: newEntry.project,
      task: newEntry.task,
      description: newEntry.description,
      startTime: newEntry.startTime,
      endTime: newEntry.endTime,
      duration,
      status: 'pending_approval',
      isManual: true,
      breakTime: parseInt(newEntry.breakTime) || 0
    };

    setTimeEntries(prev => [manualEntry, ...prev]);
    setNewEntry({
      project: '',
      task: '',
      description: '',
      startTime: '',
      endTime: '',
      breakTime: '0'
    });
    setShowAddEntry(false);
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

  const getDayData = (date: Date): DayData => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayEntries = timeEntries.filter(entry => entry.date === dateStr);
    const totalTime = dayEntries.reduce((total, entry) => total + entry.duration, 0);
    const totalBreakTime = dayEntries.reduce((total, entry) => total + (entry.breakTime || 0), 0);
    
    const dayOfWeek = getDay(date);
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    let status: 'present' | 'absent' | 'weekend' | 'holiday' = 'absent';
    if (isWeekend) {
      status = 'weekend';
    } else if (totalTime > 0) {
      status = 'present';
    }

    const checkIn = dayEntries.length > 0 ? dayEntries[0].startTime : undefined;
    const checkOut = dayEntries.length > 0 && dayEntries[dayEntries.length - 1].endTime ? dayEntries[dayEntries.length - 1].endTime : undefined;

    return {
      date,
      entries: dayEntries,
      totalTime,
      status,
      checkIn,
      checkOut,
      breakTime: totalBreakTime
    };
  };

  const getWeekDays = (weekStart: Date) => {
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  };

  const getMonthDays = (monthStart: Date) => {
    const start = startOfMonth(monthStart);
    const end = endOfMonth(monthStart);
    const startWeek = startOfWeek(start, { weekStartsOn: 1 });
    const endWeek = endOfWeek(end, { weekStartsOn: 1 });
    
    const days = [];
    let current = startWeek;
    while (current <= endWeek) {
      days.push(current);
      current = addDays(current, 1);
    }
    return days;
  };

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDays = getWeekDays(weekStart);
  const monthDays = getMonthDays(currentMonth);

  const weekTotal = weekDays.reduce((total, day) => {
    const dayData = getDayData(day);
    return total + dayData.totalTime;
  }, 0);

  const monthTotal = monthDays.reduce((total, day) => {
    const dayData = getDayData(day);
    return total + dayData.totalTime;
  }, 0);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Timesheet Management" user={user} />
        
        <main className="flex-1 overflow-auto p-6 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Live Timer Section */}
            <Card className={`${currentTimer.isRunning ? 'bg-gradient-to-r from-green-50 to-blue-50 border-green-200' : 'bg-gray-50'} transition-all duration-300`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${currentTimer.isRunning ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <Timer className={`h-5 w-5 ${currentTimer.isRunning ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                    <div className="flex items-center gap-4">
                      <Select 
                        value={currentTimer.project} 
                        onValueChange={(value) => setCurrentTimer(prev => ({ ...prev, project: value }))}
                        disabled={currentTimer.isRunning}
                      >
                        <SelectTrigger className="w-48">
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
                      
                      <Input
                        placeholder="What are you working on?"
                        value={currentTimer.task}
                        onChange={(e) => setCurrentTimer(prev => ({ ...prev, task: e.target.value }))}
                        disabled={currentTimer.isRunning}
                        className="w-64"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${currentTimer.isRunning ? 'text-green-600' : 'text-gray-400'}`}>
                        {formatTime(currentTimer.elapsed)}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      {!currentTimer.isRunning ? (
                        <Button onClick={startTimer} size="sm" className="bg-green-600 hover:bg-green-700">
                          <Play className="h-4 w-4 mr-1" />
                          Start
                        </Button>
                      ) : (
                        <>
                          <Button onClick={pauseTimer} size="sm" variant="outline">
                            <Pause className="h-4 w-4 mr-1" />
                            Pause
                          </Button>
                          <Button onClick={stopTimer} size="sm" className="bg-red-600 hover:bg-red-700">
                            <Stop className="h-4 w-4 mr-1" />
                            Stop
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calendar Navigation */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setViewMode('week')}
                        className={viewMode === 'week' ? 'bg-blue-100 text-blue-700' : ''}
                      >
                        Week
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setViewMode('month')}
                        className={viewMode === 'month' ? 'bg-blue-100 text-blue-700' : ''}
                      >
                        Month
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (viewMode === 'week') {
                            setCurrentWeek(addWeeks(currentWeek, -1));
                          } else {
                            setCurrentMonth(addMonths(currentMonth, -1));
                          }
                        }}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      
                      <h3 className="text-lg font-semibold min-w-48 text-center">
                        {viewMode === 'week' 
                          ? `${format(weekStart, 'MMM dd')} - ${format(addDays(weekStart, 6), 'MMM dd, yyyy')}`
                          : format(currentMonth, 'MMMM yyyy')
                        }
                      </h3>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (viewMode === 'week') {
                            setCurrentWeek(addWeeks(currentWeek, 1));
                          } else {
                            setCurrentMonth(addMonths(currentMonth, 1));
                          }
                        }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCurrentWeek(new Date());
                        setCurrentMonth(new Date());
                      }}
                    >
                      Today
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {viewMode === 'week' ? (
                  /* Weekly View */
                  <div className="space-y-4">
                    {/* Week Header */}
                    <div className="grid grid-cols-8 gap-4 pb-2 border-b">
                      <div className="text-sm font-medium text-gray-500"></div>
                      {weekDays.map((day) => (
                        <div key={format(day, 'yyyy-MM-dd')} className="text-center">
                          <div className="text-sm font-medium text-gray-700">
                            {format(day, 'EEE')}
                          </div>
                          <div className={`text-lg font-semibold ${isSameDay(day, new Date()) ? 'text-blue-600' : 'text-gray-900'}`}>
                            {format(day, 'd')}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Time Slots */}
                    <div className="space-y-1">
                      {Array.from({ length: 10 }, (_, i) => i + 8).map((hour) => (
                        <div key={hour} className="grid grid-cols-8 gap-4 min-h-16">
                          <div className="text-xs text-gray-500 pt-1">
                            {hour}:00
                          </div>
                          {weekDays.map((day) => {
                            const dayData = getDayData(day);
                            const hourEntries = dayData.entries.filter(entry => {
                              const startHour = parseInt(entry.startTime.split(':')[0]);
                              const endHour = entry.endTime ? parseInt(entry.endTime.split(':')[0]) : startHour;
                              return hour >= startHour && hour <= endHour;
                            });

                            return (
                              <div 
                                key={`${format(day, 'yyyy-MM-dd')}-${hour}`} 
                                className={`border rounded p-1 min-h-14 cursor-pointer hover:bg-gray-50 ${
                                  isSameDay(day, selectedDate) ? 'ring-2 ring-blue-300' : ''
                                }`}
                                onClick={() => setSelectedDate(day)}
                              >
                                {hourEntries.map((entry) => (
                                  <div
                                    key={entry.id}
                                    className="text-xs p-1 rounded mb-1 text-white font-medium"
                                    style={{ backgroundColor: getProjectColor(entry.project) }}
                                  >
                                    <div className="truncate">{entry.project}</div>
                                    <div className="truncate opacity-90">{entry.task}</div>
                                  </div>
                                ))}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>

                    {/* Week Summary */}
                    <div className="grid grid-cols-8 gap-4 pt-4 border-t">
                      <div className="text-sm font-medium text-gray-700">Total</div>
                      {weekDays.map((day) => {
                        const dayData = getDayData(day);
                        return (
                          <div key={format(day, 'yyyy-MM-dd')} className="text-center">
                            <div className="text-sm font-semibold">
                              {formatDuration(dayData.totalTime)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {dayData.entries.length} entries
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  /* Monthly View */
                  <div className="space-y-4">
                    {/* Month Header */}
                    <div className="grid grid-cols-7 gap-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <div key={day} className="text-center text-sm font-medium text-gray-700 py-2">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Month Days */}
                    <div className="grid grid-cols-7 gap-2">
                      {monthDays.map((day) => {
                        const dayData = getDayData(day);
                        const isCurrentMonth = format(day, 'MM') === format(currentMonth, 'MM');
                        const isToday = isSameDay(day, new Date());
                        const isSelected = isSameDay(day, selectedDate);

                        return (
                          <div
                            key={format(day, 'yyyy-MM-dd')}
                            className={`
                              min-h-24 p-2 border rounded cursor-pointer transition-all duration-200
                              ${isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'}
                              ${isToday ? 'ring-2 ring-blue-400' : ''}
                              ${isSelected ? 'ring-2 ring-purple-400' : ''}
                              ${dayData.status === 'present' ? 'bg-green-50 border-green-200' : ''}
                              ${dayData.status === 'weekend' ? 'bg-gray-100' : ''}
                              hover:shadow-md
                            `}
                            onClick={() => setSelectedDate(day)}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : ''}`}>
                                {format(day, 'd')}
                              </span>
                              {dayData.status === 'present' && (
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              )}
                            </div>
                            
                            {dayData.totalTime > 0 && (
                              <div className="space-y-1">
                                <div className="text-xs font-semibold text-green-600">
                                  {formatDuration(dayData.totalTime)}
                                </div>
                                {dayData.checkIn && (
                                  <div className="text-xs text-gray-600">
                                    {dayData.checkIn} - {dayData.checkOut || 'Running'}
                                  </div>
                                )}
                              </div>
                            )}
                            
                            {dayData.entries.slice(0, 2).map((entry) => (
                              <div
                                key={entry.id}
                                className="text-xs p-1 rounded mb-1 text-white"
                                style={{ backgroundColor: getProjectColor(entry.project) }}
                              >
                                <div className="truncate">{entry.project}</div>
                              </div>
                            ))}
                            
                            {dayData.entries.length > 2 && (
                              <div className="text-xs text-gray-500">
                                +{dayData.entries.length - 2} more
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Selected Day Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      {format(selectedDate, 'EEEE, MMMM do, yyyy')}
                    </CardTitle>
                    <CardDescription>
                      {(() => {
                        const dayData = getDayData(selectedDate);
                        return `${formatDuration(dayData.totalTime)} • ${dayData.entries.length} entries`;
                      })()}
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => setShowAddEntry(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Entry
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                {(() => {
                  const dayData = getDayData(selectedDate);
                  
                  if (dayData.entries.length === 0) {
                    return (
                      <div className="text-center py-8">
                        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No time entries for this day</p>
                        <Button
                          onClick={() => setShowAddEntry(true)}
                          variant="outline"
                          className="mt-4"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add First Entry
                        </Button>
                      </div>
                    );
                  }

                  return (
                    <div className="space-y-4">
                      {/* Day Summary */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-blue-50 rounded-lg">
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Check In</div>
                          <div className="text-lg font-semibold text-blue-600">
                            {dayData.checkIn || '-'}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Check Out</div>
                          <div className="text-lg font-semibold text-blue-600">
                            {dayData.checkOut || 'Running'}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Total Time</div>
                          <div className="text-lg font-semibold text-green-600">
                            {formatDuration(dayData.totalTime)}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Break Time</div>
                          <div className="text-lg font-semibold text-orange-600">
                            {formatDuration(dayData.breakTime || 0)}
                          </div>
                        </div>
                      </div>

                      {/* Time Entries */}
                      <div className="space-y-3">
                        {dayData.entries.map((entry) => (
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
                                      {entry.status.replace('_', ' ')}
                                    </Badge>
                                    {entry.isManual && (
                                      <Badge variant="outline">Manual</Badge>
                                    )}
                                  </div>
                                  <p className="text-sm font-medium text-gray-700">{entry.task}</p>
                                  <p className="text-xs text-gray-500">{entry.description}</p>
                                  <div className="flex items-center gap-4 text-xs text-gray-400">
                                    <span>{entry.startTime} - {entry.endTime || 'Running'}</span>
                                    {entry.breakTime && entry.breakTime > 0 && (
                                      <span className="flex items-center gap-1">
                                        <Coffee className="h-3 w-3" />
                                        {formatDuration(entry.breakTime)} break
                                      </span>
                                    )}
                                  </div>
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
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>

            {/* Add Entry Modal */}
            {showAddEntry && (
              <Card className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Add Time Entry</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAddEntry(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Project</Label>
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

                    <div>
                      <Label>Task</Label>
                      <Input
                        placeholder="What did you work on?"
                        value={newEntry.task}
                        onChange={(e) => setNewEntry(prev => ({ ...prev, task: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label>Description</Label>
                      <Textarea
                        placeholder="Add details..."
                        value={newEntry.description}
                        onChange={(e) => setNewEntry(prev => ({ ...prev, description: e.target.value }))}
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Start Time</Label>
                        <Input
                          type="time"
                          value={newEntry.startTime}
                          onChange={(e) => setNewEntry(prev => ({ ...prev, startTime: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>End Time</Label>
                        <Input
                          type="time"
                          value={newEntry.endTime}
                          onChange={(e) => setNewEntry(prev => ({ ...prev, endTime: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Break Time (minutes)</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={newEntry.breakTime}
                        onChange={(e) => setNewEntry(prev => ({ ...prev, breakTime: e.target.value }))}
                      />
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button onClick={addManualEntry} className="flex-1">
                        <Save className="h-4 w-4 mr-2" />
                        Save Entry
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowAddEntry(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">This Week</p>
                      <p className="text-2xl font-bold text-blue-600">{formatDuration(weekTotal)}</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                  <Progress value={(weekTotal / (40 * 60)) * 100} className="mt-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round((weekTotal / (40 * 60)) * 100)}% of 40h target
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">This Month</p>
                      <p className="text-2xl font-bold text-green-600">{formatDuration(monthTotal)}</p>
                    </div>
                    <CalendarIcon className="h-8 w-8 text-green-600" />
                  </div>
                  <Progress value={(monthTotal / (160 * 60)) * 100} className="mt-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round((monthTotal / (160 * 60)) * 100)}% of 160h target
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Daily Average</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {formatDuration(Math.floor(weekTotal / 7))}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Based on this week's data
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}