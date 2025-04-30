import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, AlertCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useProjects } from '../contexts/ProjectContext';

const CreateProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const { createProject } = useProjects();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    priority: 'medium',
    members: [] as string[],
  });
  
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
  }>({});
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await createProject({
        ...formData,
        status: 'planning',
        priority: formData.priority as 'low' | 'medium' | 'high',
        progress: 0,
      });
      
      navigate('/projects');
    } catch (error) {
      setErrors({
        title: 'Failed to create project. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
          <Button
            variant="outline"
            onClick={() => navigate('/projects')}
          >
            Cancel
          </Button>
        </div>
        
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                label="Project Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                error={errors.title}
                placeholder="Enter project title"
                fullWidth
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`
                  w-full rounded-lg border shadow-sm
                  ${errors.description
                    ? 'border-error-500 focus:ring-error-500'
                    : 'border-gray-300 focus:ring-primary-500'
                  }
                  focus:border-primary-500 focus:ring-2 focus:ring-opacity-50
                `}
                placeholder="Enter project description"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-error-500">{errors.description}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  label="Start Date"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  error={errors.startDate}
                  leftIcon={<Calendar size={18} />}
                  fullWidth
                />
              </div>
              
              <div>
                <Input
                  label="End Date"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  error={errors.endDate}
                  leftIcon={<Calendar size={18} />}
                  fullWidth
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Users size={18} className="mr-1" />
                Team Members
              </label>
              <div className="bg-warning-50 text-warning-800 p-3 rounded-lg flex items-center">
                <AlertCircle size={18} className="mr-2" />
                Team member selection will be available in the next update
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-6">
              <Button
                variant="outline"
                onClick={() => navigate('/projects')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
              >
                Create Project
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateProjectPage;