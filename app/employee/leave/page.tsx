'use client';

import { useState } from 'react';
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
  Calendar as CalendarIcon, 
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  TrendingUp
} from 'lucide-react';
import { format, addDays } from 'date-fns';

export default function LeavePage() {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [leaveType, setLeaveType] = useState('');
  const [reason, setReason] = useState('');

  const user = {
    name: 'Ravikrishna J',
    email: 'ravikrishna@epicallayouts.com'
  };

  const leaveBalance = {
    casual: { used: 8, total: 20, remaining: 12 },
    sick: { used: 7, total: 15, remaining: 8 },
    earned: { used: 10, total: 25, remaining: 15 },
    maternity: { used: 0, total: 180, remaining: 180 },
    paternity: { used: 0, total: 15, remaining: 15 }
  };

  const leaveRequests = [
    {
      id: 1,
      type: 'Casual Leave',
      fromDate: '2025-02-15',
      toDate: '2025-02-17',
      days: 3,
      reason: 'Family wedding',
      status: 'approved',
      appliedOn: '2025-01-20',
      approvedBy: 'HR Manager'
    },
    {
      id: 2,
      type: 'Sick Leave',
      fromDate: '2025-01-28',
      toDate: '2025-01-29',
      days: 2,
      reason: 'Fever and flu symptoms',
      status: 'pending',
      appliedOn: '2025-01-26'
    },
    {
      id: 3,
      type: 'Earned Leave',
      fromDate: '2025-01-10',
      toDate: '2025-01-12',
      days: 3,
      reason: 'Personal work',
      status: 'rejected',
      appliedOn: '2025-01-05',
      rejectedBy: 'HR Manager',
      rejectionReason: 'Insufficient earned leave balance at time of application'
    }
  ];

  const upcomingHolidays = [
    { date: '2025-01-26', name: 'Republic Day', type: 'National Holiday' },
    { date: '2025-03-14', name: 'Holi', type: 'Festival' },
    { date: '2025-08-15', name: 'Independence Day', type: 'National Holiday' },
    { date: '2025-10-02', name: 'Gandhi Jayanti', type: 'National Holiday' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleSubmitLeave = () => {
    console.log('Submitting leave application:', {
      type: leaveType,
      from: dateFrom,
      to: dateTo,
      reason
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Leave Management" user={user} />
        
        <main className="flex-1 overflow-auto p-6 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Leave Balance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(leaveBalance).map(([key, balance]) => (
                <Card key={key} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')} Leave</h3>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        {balance.remaining} left
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Used: {balance.used}</span>
                        <span>Total: {balance.total}</span>
                      </div>
                      <Progress 
                        value={(balance.used / balance.total) * 100} 
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Tabs defaultValue="apply" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="apply">Apply Leave</TabsTrigger>
                <TabsTrigger value="history">Leave History</TabsTrigger>
                <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                <TabsTrigger value="holidays">Holidays</TabsTrigger>
              </TabsList>

              {/* Apply Leave */}
              <TabsContent value="apply" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      Apply for Leave
                    </CardTitle>
                    <CardDescription>
                      Submit a new leave application
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Leave Type</Label>
                        <Select value={leaveType} onValueChange={setLeaveType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select leave type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="casual">Casual Leave</SelectItem>
                            <SelectItem value="sick">Sick Leave</SelectItem>
                            <SelectItem value="earned">Earned Leave</SelectItem>
                            <SelectItem value="maternity">Maternity Leave</SelectItem>
                            <SelectItem value="paternity">Paternity Leave</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Available Balance</Label>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          {leaveType && leaveBalance[leaveType as keyof typeof leaveBalance] ? (
                            <p className="font-medium">
                              {leaveBalance[leaveType as keyof typeof leaveBalance].remaining} days remaining
                            </p>
                          ) : (
                            <p className="text-gray-500">Select leave type to see balance</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>From Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {dateFrom ? format(dateFrom, 'PPP') : 'Select start date'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={dateFrom}
                              onSelect={setDateFrom}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label>To Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {dateTo ? format(dateTo, 'PPP') : 'Select end date'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={dateTo}
                              onSelect={setDateTo}
                              disabled={(date) => date < (dateFrom || new Date())}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    {dateFrom && dateTo && (
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-800">
                          Total Days: {Math.ceil((dateTo.getTime() - dateFrom.getTime()) / (1000 * 60 * 60 * 24)) + 1}
                        </p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Reason for Leave</Label>
                      <Textarea
                        placeholder="Please provide a reason for your leave application..."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows={4}
                      />
                    </div>

                    <Button 
                      onClick={handleSubmitLeave}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      disabled={!leaveType || !dateFrom || !dateTo || !reason}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Submit Leave Application
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Leave History */}
              <TabsContent value="history" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Leave History
                    </CardTitle>
                    <CardDescription>
                      Your previous leave applications and their status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {leaveRequests.map((request) => (
                        <div key={request.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{request.type}</h4>
                                <Badge className={getStatusColor(request.status)}>
                                  <div className="flex items-center gap-1">
                                    {getStatusIcon(request.status)}
                                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                  </div>
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">
                                {format(new Date(request.fromDate), 'MMM dd, yyyy')} - {format(new Date(request.toDate), 'MMM dd, yyyy')}
                              </p>
                              <p className="text-sm text-gray-500">{request.reason}</p>
                              {request.status === 'rejected' && request.rejectionReason && (
                                <div className="p-2 bg-red-50 rounded border-l-4 border-red-200">
                                  <p className="text-sm text-red-800">
                                    <strong>Rejection Reason:</strong> {request.rejectionReason}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">{request.days} days</p>
                              <p className="text-xs text-gray-500">Applied: {format(new Date(request.appliedOn), 'MMM dd')}</p>
                              {request.approvedBy && (
                                <p className="text-xs text-green-600">By: {request.approvedBy}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Calendar View */}
              <TabsContent value="calendar" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      Leave Calendar
                    </CardTitle>
                    <CardDescription>
                      Visual representation of your leaves and company holidays
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <Calendar
                          mode="single"
                          className="rounded-md border w-full"
                          classNames={{
                            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                            month: "space-y-4",
                            caption: "flex justify-center pt-1 relative items-center",
                            caption_label: "text-sm font-medium",
                            nav: "space-x-1 flex items-center",
                            nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                            table: "w-full border-collapse space-y-1",
                            head_row: "flex",
                            head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                            row: "flex w-full mt-2",
                            cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                            day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                          }}
                        />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Legend</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-green-200 rounded"></div>
                              <span className="text-sm">Approved Leave</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-yellow-200 rounded"></div>
                              <span className="text-sm">Pending Leave</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-blue-200 rounded"></div>
                              <span className="text-sm">Company Holiday</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Holidays */}
              <TabsContent value="holidays" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      Company Holidays 2025
                    </CardTitle>
                    <CardDescription>
                      Official holidays and observances
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingHolidays.map((holiday, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                          <div>
                            <h4 className="font-medium">{holiday.name}</h4>
                            <p className="text-sm text-gray-600">{holiday.type}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{format(new Date(holiday.date), 'MMM dd, yyyy')}</p>
                            <p className="text-sm text-gray-500">{format(new Date(holiday.date), 'EEEE')}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}