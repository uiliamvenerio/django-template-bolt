import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      currentPassword?: string;
      newPassword?: string;
      confirmPassword?: string;
    } = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (formData.newPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Current password is required';
      }
      
      if (formData.newPassword.length < 8) {
        newErrors.newPassword = 'Password must be at least 8 characters';
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // In a real app, we would send this to the server
    console.log('Updating profile:', formData);
    
    // Simulate success
    setTimeout(() => {
      setIsEditing(false);
      // We would update the user in the auth context here
    }, 1000);
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile sidebar */}
          <div className="md:col-span-1">
            <Card>
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
                  <img
                    src={user?.avatar || 'https://i.pravatar.cc/150?img=1'}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900">{user?.name}</h3>
                <p className="text-gray-500">{user?.email}</p>
                
                <div className="mt-4 w-full">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-500">Role</span>
                    <span className="text-sm font-medium">{user?.role}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-500">Member Since</span>
                    <span className="text-sm font-medium">
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Profile form */}
          <div className="md:col-span-2">
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
                {!isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    leftIcon={<User size={18} />}
                    error={errors.name}
                    fullWidth
                  />
                  
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    leftIcon={<Mail size={18} />}
                    error={errors.email}
                    fullWidth
                  />
                  
                  {isEditing && (
                    <>
                      <div className="border-t border-gray-200 pt-4 mt-6">
                        <h3 className="text-md font-medium text-gray-900 mb-4">
                          Change Password (optional)
                        </h3>
                        
                        <Input
                          label="Current Password"
                          name="currentPassword"
                          type="password"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          leftIcon={<Lock size={18} />}
                          error={errors.currentPassword}
                          fullWidth
                        />
                        
                        <Input
                          label="New Password"
                          name="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          leftIcon={<Lock size={18} />}
                          error={errors.newPassword}
                          hint="At least 8 characters"
                          fullWidth
                        />
                        
                        <Input
                          label="Confirm New Password"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          leftIcon={<Lock size={18} />}
                          error={errors.confirmPassword}
                          fullWidth
                        />
                      </div>
                    </>
                  )}
                  
                  {isEditing && (
                    <div className="flex justify-end space-x-3 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                      >
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;