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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Building2, 
  Edit3, 
  Save, 
  Camera,
  Shield,
  Clock,
  Award,
  FileText
} from 'lucide-react';

export default function EmployeeProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Ravikrishna J',
    email: 'ravikrishna@epicallayouts.com',
    phone: '+91 9876543210',
    designation: 'Senior Frontend Developer',
    department: 'Engineering',
    joiningDate: '2023-03-15',
    address: 'Bangalore, Karnataka, India',
    emergencyContact: '+91 9876543211',
    bloodGroup: 'O+',
    bio: 'Passionate frontend developer with 5+ years of experience in React, Next.js, and modern web technologies.'
  });

  const user = {
    name: 'Ravikrishna J',
    email: 'ravikrishna@epicallayouts.com'
  };

  const handleSave = () => {
    setIsEditing(false);
    // Handle save logic here
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const achievements = [
    { title: 'Employee of the Month', date: 'December 2024', type: 'recognition' },
    { title: 'Project Excellence Award', date: 'October 2024', type: 'achievement' },
    { title: '5 Years Service', date: 'March 2024', type: 'milestone' }
  ];

  const skills = [
    'React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Git', 'Figma'
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="My Profile" user={user} />
        
        <main className="flex-1 overflow-auto p-6 custom-scrollbar">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Profile Header */}
            <Card className="relative overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              <CardContent className="relative -mt-16 pb-6">
                <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
                  <div className="relative">
                    <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                      <AvatarImage src="/api/placeholder/128/128" />
                      <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {profileData.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full h-10 w-10 p-0 bg-white text-gray-600 hover:bg-gray-50 shadow-lg"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900">{profileData.name}</h1>
                        <p className="text-lg text-gray-600">{profileData.designation}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            <Building2 className="h-3 w-3 mr-1" />
                            {profileData.department}
                          </Badge>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            <Shield className="h-3 w-3 mr-1" />
                            Employee
                          </Badge>
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        className={isEditing ? 'bg-green-600 hover:bg-green-700' : ''}
                      >
                        {isEditing ? (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        ) : (
                          <>
                            <Edit3 className="h-4 w-4 mr-2" />
                            Edit Profile
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="professional">Professional</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              {/* Personal Information */}
              <TabsContent value="personal" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>
                      Manage your personal details and contact information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="emergency">Emergency Contact</Label>
                        <Input
                          id="emergency"
                          value={profileData.emergencyContact}
                          onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="blood">Blood Group</Label>
                        <Select value={profileData.bloodGroup} onValueChange={(value) => handleInputChange('bloodGroup', value)} disabled={!isEditing}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="AB+">AB+</SelectItem>
                            <SelectItem value="AB-">AB-</SelectItem>
                            <SelectItem value="O+">O+</SelectItem>
                            <SelectItem value="O-">O-</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="joining">Joining Date</Label>
                        <Input
                          id="joining"
                          type="date"
                          value={profileData.joiningDate}
                          onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        value={profileData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        disabled={!isEditing}
                        rows={4}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Professional Information */}
              <TabsContent value="professional" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        Work Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Designation</Label>
                        <Input value={profileData.designation} disabled={!isEditing} />
                      </div>
                      <div className="space-y-2">
                        <Label>Department</Label>
                        <Select value={profileData.department} disabled={!isEditing}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Engineering">Engineering</SelectItem>
                            <SelectItem value="Design">Design</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="HR">HR</SelectItem>
                            <SelectItem value="Sales">Sales</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Employee ID</Label>
                        <Input value="EMP001" disabled />
                      </div>
                      <div className="space-y-2">
                        <Label>Reporting Manager</Label>
                        <Input value="John Smith" disabled />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Skills & Expertise
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      {isEditing && (
                        <Button variant="outline" className="mt-4 w-full">
                          Add Skill
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Achievements */}
              <TabsContent value="achievements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Achievements & Recognition
                    </CardTitle>
                    <CardDescription>
                      Your accomplishments and milestones at EPICAL LAYOUTS
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
                            <Award className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{achievement.title}</h4>
                            <p className="text-sm text-gray-600">{achievement.date}</p>
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {achievement.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Documents */}
              <TabsContent value="documents" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Documents & Certificates
                    </CardTitle>
                    <CardDescription>
                      Upload and manage your professional documents
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                        <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Resume/CV</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Upload
                        </Button>
                      </div>
                      <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                        <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Educational Certificates</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Upload
                        </Button>
                      </div>
                      <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                        <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">ID Proof</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Upload
                        </Button>
                      </div>
                      <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                        <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Other Documents</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Upload
                        </Button>
                      </div>
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