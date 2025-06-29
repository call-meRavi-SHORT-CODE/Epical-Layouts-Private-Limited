'use client';

import { useState } from 'react';
import { format } from 'date-fns';
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
  FileText,
  X,
  Check,
  Upload,
  Image as ImageIcon,
  Palette,
  Settings,
  Star,
  Briefcase,
  GraduationCap,
  Heart,
  Globe,
  Linkedin,
  Github,
  Twitter,
  Plus
} from 'lucide-react';

export default function EmployeeProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isBannerEditing, setIsBannerEditing] = useState(false);
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
    bio: 'Passionate frontend developer with 5+ years of experience in React, Next.js, and modern web technologies. I love creating beautiful, user-friendly interfaces that make a difference.',
    tagline: 'Building the future, one pixel at a time',
    location: 'Bangalore, India',
    website: 'https://ravikrishna.dev',
    linkedin: 'https://linkedin.com/in/ravikrishna',
    github: 'https://github.com/ravikrishna',
    twitter: 'https://twitter.com/ravikrishna'
  });

  const [bannerData, setBannerData] = useState({
    backgroundType: 'gradient',
    gradientFrom: '#667eea',
    gradientTo: '#764ba2',
    backgroundImage: '',
    overlayOpacity: 0.3
  });

  const user = {
    name: 'Ravikrishna J',
    email: 'ravikrishna@epicallayouts.com'
  };

  const handleSave = () => {
    setIsEditing(false);
    // Handle save logic here
  };

  const handleBannerSave = () => {
    setIsBannerEditing(false);
    // Handle banner save logic here
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleBannerChange = (field: string, value: string | number) => {
    setBannerData(prev => ({ ...prev, [field]: value }));
  };

  const achievements = [
    { title: 'Employee of the Month', date: 'December 2024', type: 'recognition', icon: '🏆' },
    { title: 'Project Excellence Award', date: 'October 2024', type: 'achievement', icon: '⭐' },
    { title: '5 Years Service', date: 'March 2024', type: 'milestone', icon: '🎖️' },
    { title: 'Innovation Award', date: 'June 2024', type: 'achievement', icon: '💡' }
  ];

  const skills = [
    { name: 'React.js', level: 95, category: 'Frontend' },
    { name: 'Next.js', level: 90, category: 'Frontend' },
    { name: 'TypeScript', level: 88, category: 'Language' },
    { name: 'Tailwind CSS', level: 92, category: 'Styling' },
    { name: 'Node.js', level: 75, category: 'Backend' },
    { name: 'MongoDB', level: 70, category: 'Database' },
    { name: 'Git', level: 85, category: 'Tools' },
    { name: 'Figma', level: 80, category: 'Design' }
  ];

  const gradientPresets = [
    { name: 'Ocean Blue', from: '#667eea', to: '#764ba2' },
    { name: 'Sunset', from: '#ff7e5f', to: '#feb47b' },
    { name: 'Purple Rain', from: '#667eea', to: '#764ba2' },
    { name: 'Green Forest', from: '#11998e', to: '#38ef7d' },
    { name: 'Pink Dream', from: '#ff9a9e', to: '#fecfef' },
    { name: 'Dark Night', from: '#232526', to: '#414345' },
    { name: 'Golden Hour', from: '#f093fb', to: '#f5576c' },
    { name: 'Arctic', from: '#74b9ff', to: '#0984e3' }
  ];

  const getBannerStyle = () => {
    if (bannerData.backgroundType === 'gradient') {
      return {
        background: `linear-gradient(135deg, ${bannerData.gradientFrom} 0%, ${bannerData.gradientTo} 100%)`
      };
    } else if (bannerData.backgroundType === 'image' && bannerData.backgroundImage) {
      return {
        backgroundImage: `linear-gradient(rgba(0,0,0,${bannerData.overlayOpacity}), rgba(0,0,0,${bannerData.overlayOpacity})), url(${bannerData.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
    }
    return {
      background: `linear-gradient(135deg, ${bannerData.gradientFrom} 0%, ${bannerData.gradientTo} 100%)`
    };
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="My Profile" user={user} />
        
        <main className="flex-1 overflow-auto p-6 custom-scrollbar">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Enhanced Profile Banner */}
            <Card className="relative overflow-hidden shadow-2xl">
              {/* Banner Background */}
              <div 
                className="h-48 relative transition-all duration-500"
                style={getBannerStyle()}
              >
                {/* Banner Edit Button */}
                <div className="absolute top-4 right-4">
                  {!isBannerEditing ? (
                    <Button
                      onClick={() => setIsBannerEditing(true)}
                      size="sm"
                      className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Customize Banner
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={handleBannerSave}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        onClick={() => setIsBannerEditing(false)}
                        size="sm"
                        variant="outline"
                        className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Banner Customization Panel */}
                {isBannerEditing && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <Card className="w-full max-w-md mx-4 bg-white/95 backdrop-blur-md">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Palette className="h-5 w-5" />
                          Customize Banner
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Background Type */}
                        <div>
                          <Label>Background Type</Label>
                          <Select 
                            value={bannerData.backgroundType} 
                            onValueChange={(value) => handleBannerChange('backgroundType', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="gradient">Gradient</SelectItem>
                              <SelectItem value="image">Image</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {bannerData.backgroundType === 'gradient' && (
                          <>
                            {/* Gradient Presets */}
                            <div>
                              <Label>Gradient Presets</Label>
                              <div className="grid grid-cols-4 gap-2 mt-2">
                                {gradientPresets.map((preset, index) => (
                                  <button
                                    key={index}
                                    className="h-8 rounded border-2 border-white shadow-md hover:scale-105 transition-transform"
                                    style={{
                                      background: `linear-gradient(135deg, ${preset.from} 0%, ${preset.to} 100%)`
                                    }}
                                    onClick={() => {
                                      handleBannerChange('gradientFrom', preset.from);
                                      handleBannerChange('gradientTo', preset.to);
                                    }}
                                    title={preset.name}
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Custom Colors */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>From Color</Label>
                                <div className="flex gap-2">
                                  <Input
                                    type="color"
                                    value={bannerData.gradientFrom}
                                    onChange={(e) => handleBannerChange('gradientFrom', e.target.value)}
                                    className="w-12 h-10 p-1 border rounded"
                                  />
                                  <Input
                                    value={bannerData.gradientFrom}
                                    onChange={(e) => handleBannerChange('gradientFrom', e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                              </div>
                              <div>
                                <Label>To Color</Label>
                                <div className="flex gap-2">
                                  <Input
                                    type="color"
                                    value={bannerData.gradientTo}
                                    onChange={(e) => handleBannerChange('gradientTo', e.target.value)}
                                    className="w-12 h-10 p-1 border rounded"
                                  />
                                  <Input
                                    value={bannerData.gradientTo}
                                    onChange={(e) => handleBannerChange('gradientTo', e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {bannerData.backgroundType === 'image' && (
                          <>
                            <div>
                              <Label>Background Image URL</Label>
                              <Input
                                placeholder="https://example.com/image.jpg"
                                value={bannerData.backgroundImage}
                                onChange={(e) => handleBannerChange('backgroundImage', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Overlay Opacity: {bannerData.overlayOpacity}</Label>
                              <Input
                                type="range"
                                min="0"
                                max="0.8"
                                step="0.1"
                                value={bannerData.overlayOpacity}
                                onChange={(e) => handleBannerChange('overlayOpacity', parseFloat(e.target.value))}
                                className="w-full"
                              />
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
                  <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>
              </div>

              {/* Profile Content */}
              <CardContent className="relative -mt-20 pb-6">
                <div className="flex flex-col lg:flex-row items-start lg:items-end gap-6">
                  {/* Avatar Section */}
                  <div className="relative group">
                    <Avatar className="h-40 w-40 border-6 border-white shadow-2xl ring-4 ring-white/50 transition-all duration-300 group-hover:scale-105">
                      <AvatarImage src="/api/placeholder/160/160" />
                      <AvatarFallback className="text-4xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {profileData.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute bottom-2 right-2 rounded-full h-12 w-12 p-0 bg-white text-gray-600 hover:bg-gray-50 shadow-lg border-2 border-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <Camera className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  {/* Profile Info */}
                  <div className="flex-1 space-y-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                      <div className="flex items-start justify-between">
                        <div className="space-y-3">
                          <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">{profileData.name}</h1>
                            <p className="text-xl text-gray-600 font-medium">{profileData.designation}</p>
                            <p className="text-lg text-blue-600 italic">{profileData.tagline}</p>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-3">
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1">
                              <Building2 className="h-4 w-4 mr-2" />
                              {profileData.department}
                            </Badge>
                            <Badge variant="secondary" className="bg-green-100 text-green-800 px-3 py-1">
                              <Shield className="h-4 w-4 mr-2" />
                              Employee
                            </Badge>
                            <Badge variant="secondary" className="bg-purple-100 text-purple-800 px-3 py-1">
                              <MapPin className="h-4 w-4 mr-2" />
                              {profileData.location}
                            </Badge>
                          </div>

                          {/* Quick Stats */}
                          <div className="flex items-center gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>Joined {format(new Date(profileData.joiningDate), 'MMM yyyy')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span>{achievements.length} Achievements</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Award className="h-4 w-4 text-orange-500" />
                              <span>{skills.length} Skills</span>
                            </div>
                          </div>

                          {/* Social Links */}
                          <div className="flex items-center gap-3">
                            {profileData.website && (
                              <Button variant="outline" size="sm" className="rounded-full">
                                <Globe className="h-4 w-4" />
                              </Button>
                            )}
                            {profileData.linkedin && (
                              <Button variant="outline" size="sm" className="rounded-full">
                                <Linkedin className="h-4 w-4" />
                              </Button>
                            )}
                            {profileData.github && (
                              <Button variant="outline" size="sm" className="rounded-full">
                                <Github className="h-4 w-4" />
                              </Button>
                            )}
                            {profileData.twitter && (
                              <Button variant="outline" size="sm" className="rounded-full">
                                <Twitter className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        {/* Edit Button */}
                        <Button
                          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                          className={`${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'} shadow-lg hover:shadow-xl transition-all duration-300`}
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
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-white shadow-md">
                <TabsTrigger value="personal" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">Personal Info</TabsTrigger>
                <TabsTrigger value="professional" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">Professional</TabsTrigger>
                <TabsTrigger value="achievements" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">Achievements</TabsTrigger>
                <TabsTrigger value="documents" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">Documents</TabsTrigger>
              </TabsList>

              {/* Personal Information */}
              <TabsContent value="personal" className="space-y-6">
                <Card className="shadow-lg">
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
                          className={isEditing ? 'border-blue-300 focus:border-blue-500' : ''}
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
                          className={isEditing ? 'border-blue-300 focus:border-blue-500' : ''}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          disabled={!isEditing}
                          className={isEditing ? 'border-blue-300 focus:border-blue-500' : ''}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="emergency">Emergency Contact</Label>
                        <Input
                          id="emergency"
                          value={profileData.emergencyContact}
                          onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                          disabled={!isEditing}
                          className={isEditing ? 'border-blue-300 focus:border-blue-500' : ''}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="blood">Blood Group</Label>
                        <Select value={profileData.bloodGroup} onValueChange={(value) => handleInputChange('bloodGroup', value)} disabled={!isEditing}>
                          <SelectTrigger className={isEditing ? 'border-blue-300 focus:border-blue-500' : ''}>
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
                          className={isEditing ? 'border-blue-300 focus:border-blue-500' : ''}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tagline">Professional Tagline</Label>
                      <Input
                        id="tagline"
                        placeholder="Your professional motto or tagline"
                        value={profileData.tagline}
                        onChange={(e) => handleInputChange('tagline', e.target.value)}
                        disabled={!isEditing}
                        className={isEditing ? 'border-blue-300 focus:border-blue-500' : ''}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        value={profileData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        disabled={!isEditing}
                        rows={3}
                        className={isEditing ? 'border-blue-300 focus:border-blue-500' : ''}
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
                        className={isEditing ? 'border-blue-300 focus:border-blue-500' : ''}
                      />
                    </div>

                    {/* Social Links */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Social Links</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            placeholder="https://yourwebsite.com"
                            value={profileData.website}
                            onChange={(e) => handleInputChange('website', e.target.value)}
                            disabled={!isEditing}
                            className={isEditing ? 'border-blue-300 focus:border-blue-500' : ''}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="linkedin">LinkedIn</Label>
                          <Input
                            id="linkedin"
                            placeholder="https://linkedin.com/in/username"
                            value={profileData.linkedin}
                            onChange={(e) => handleInputChange('linkedin', e.target.value)}
                            disabled={!isEditing}
                            className={isEditing ? 'border-blue-300 focus:border-blue-500' : ''}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="github">GitHub</Label>
                          <Input
                            id="github"
                            placeholder="https://github.com/username"
                            value={profileData.github}
                            onChange={(e) => handleInputChange('github', e.target.value)}
                            disabled={!isEditing}
                            className={isEditing ? 'border-blue-300 focus:border-blue-500' : ''}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="twitter">Twitter</Label>
                          <Input
                            id="twitter"
                            placeholder="https://twitter.com/username"
                            value={profileData.twitter}
                            onChange={(e) => handleInputChange('twitter', e.target.value)}
                            disabled={!isEditing}
                            className={isEditing ? 'border-blue-300 focus:border-blue-500' : ''}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Professional Information */}
              <TabsContent value="professional" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
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

                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" />
                        Skills & Expertise
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {skills.map((skill, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{skill.name}</span>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {skill.category}
                                </Badge>
                                <span className="text-sm text-gray-600">{skill.level}%</span>
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500" 
                                style={{ width: `${skill.level}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      {isEditing && (
                        <Button variant="outline" className="mt-4 w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Skill
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Achievements */}
              <TabsContent value="achievements" className="space-y-6">
                <Card className="shadow-lg">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300">
                          <div className="flex items-start gap-4">
                            <div className="text-3xl">{achievement.icon}</div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg text-gray-900">{achievement.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{achievement.date}</p>
                              <Badge variant="outline" className="capitalize text-xs">
                                {achievement.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Documents */}
              <TabsContent value="documents" className="space-y-6">
                <Card className="shadow-lg">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer group">
                        <Upload className="h-12 w-12 text-gray-400 group-hover:text-blue-500 mx-auto mb-4 transition-colors" />
                        <p className="font-medium text-gray-700 group-hover:text-blue-600">Resume/CV</p>
                        <p className="text-sm text-gray-500 mt-1">Upload your latest resume</p>
                        <Button variant="outline" size="sm" className="mt-4">
                          Choose File
                        </Button>
                      </div>
                      <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer group">
                        <GraduationCap className="h-12 w-12 text-gray-400 group-hover:text-blue-500 mx-auto mb-4 transition-colors" />
                        <p className="font-medium text-gray-700 group-hover:text-blue-600">Educational Certificates</p>
                        <p className="text-sm text-gray-500 mt-1">Upload your degrees and certifications</p>
                        <Button variant="outline" size="sm" className="mt-4">
                          Choose File
                        </Button>
                      </div>
                      <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer group">
                        <Shield className="h-12 w-12 text-gray-400 group-hover:text-blue-500 mx-auto mb-4 transition-colors" />
                        <p className="font-medium text-gray-700 group-hover:text-blue-600">ID Proof</p>
                        <p className="text-sm text-gray-500 mt-1">Upload government issued ID</p>
                        <Button variant="outline" size="sm" className="mt-4">
                          Choose File
                        </Button>
                      </div>
                      <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer group">
                        <FileText className="h-12 w-12 text-gray-400 group-hover:text-blue-500 mx-auto mb-4 transition-colors" />
                        <p className="font-medium text-gray-700 group-hover:text-blue-600">Other Documents</p>
                        <p className="text-sm text-gray-500 mt-1">Upload additional documents</p>
                        <Button variant="outline" size="sm" className="mt-4">
                          Choose File
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