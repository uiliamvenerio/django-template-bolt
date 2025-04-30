import React, { useEffect, useState } from 'react';
import { Activity, Calendar, Users, CheckCircle, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import MetricsCard from '../components/dashboard/MetricsCard';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import Card from '../components/ui/Card';
import { useProjects } from '../contexts/ProjectContext';
import { Activity as ActivityType } from '../types';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { projects, isLoading } = useProjects();
  const [activities, setActivities] = useState<ActivityType[]>([]);
  
  useEffect(() => {
    // Generate sample activities based on projects
    if (projects.length > 0) {
      const sampleActivities: ActivityType[] = [
        {
          id: '1',
          user: {
            id: '1',
            name: 'John Doe',
            avatar: 'https://i.pravatar.cc/150?img=1',
          },
          action: 'completed',
          target: 'Design homepage mockup',
          targetType: 'task',
          timestamp: new Date(Date.now() - 25 * 60000).toISOString(), // 25 minutes ago
        },
        {
          id: '2',
          user: {
            id: '2',
            name: 'Jane Smith',
            avatar: 'https://i.pravatar.cc/150?img=5',
          },
          action: 'created',
          target: 'Mobile App Development',
          targetType: 'project',
          timestamp: new Date(Date.now() - 3 * 3600000).toISOString(), // 3 hours ago
        },
        {
          id: '3',
          user: {
            id: '1',
            name: 'John Doe',
            avatar: 'https://i.pravatar.cc/150?img=1',
          },
          action: 'added',
          target: 'Backend API integration',
          targetType: 'task',
          timestamp: new Date(Date.now() - 5 * 3600000).toISOString(), // 5 hours ago
        },
        {
          id: '4',
          user: {
            id: '2',
            name: 'Jane Smith',
            avatar: 'https://i.pravatar.cc/150?img=5',
          },
          action: 'commented on',
          target: 'Website Redesign',
          targetType: 'project',
          timestamp: new Date(Date.now() - 8 * 3600000).toISOString(), // 8 hours ago
        },
      ];
      
      setActivities(sampleActivities);
    }
  }, [projects]);
  
  // Calculate metrics
  const totalProjects = projects.length;
  const inProgressProjects = projects.filter(p => p.status === 'in-progress').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  
  const allTasks = projects.flatMap(p => p.tasks);
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter(t => t.status === 'completed').length;
  const tasksCompletion = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Due soon tasks
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);
  
  const tasksDueSoon = allTasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    return dueDate >= today && dueDate <= nextWeek && task.status !== 'completed';
  });
  
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
        
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricsCard
            title="Total Projects"
            value={totalProjects}
            icon={<Activity size={24} />}
            change={15}
            changeType="increase"
          />
          
          <MetricsCard
            title="In Progress"
            value={inProgressProjects}
            icon={<TrendingUp size={24} />}
            change={8}
            changeType="increase"
          />
          
          <MetricsCard
            title="Completed Projects"
            value={completedProjects}
            icon={<CheckCircle size={24} />}
            change={12}
            changeType="increase"
          />
          
          <MetricsCard
            title="Tasks Completion"
            value={`${tasksCompletion}%`}
            icon={<Clock size={24} />}
            change={5}
            changeType="increase"
          />
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Projects */}
          <Card className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
              <Link
                to="/projects"
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                View all
              </Link>
            </div>
            
            <div className="space-y-4">
              {isLoading ? (
                <p className="text-gray-500">Loading projects...</p>
              ) : projects.length === 0 ? (
                <p className="text-gray-500">No projects found</p>
              ) : (
                projects.slice(0, 3).map((project) => (
                  <div key={project.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <Link
                        to={`/projects/${project.id}`}
                        className="text-lg font-medium text-gray-900 hover:text-primary-600"
                      >
                        {project.title}
                      </Link>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-500 mr-3">Progress: {project.progress}%</span>
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary-500 h-2 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-3 sm:mt-0">
                      <div className="flex -space-x-2 mr-4">
                        {project.members.slice(0, 3).map((member, index) => (
                          <div
                            key={index}
                            className="h-8 w-8 rounded-full border-2 border-white overflow-hidden"
                          >
                            <img
                              src={`https://i.pravatar.cc/150?img=${Number(member) + 10}`}
                              alt={`Team member ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        <Calendar className="inline mr-1" size={14} />
                        Due {new Date(project.endDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
          
          {/* Activity Feed */}
          <div className="lg:col-span-1">
            <ActivityFeed activities={activities} />
          </div>
        </div>
        
        {/* Tasks due soon */}
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <AlertCircle size={20} className="mr-2 text-warning-500" />
              Tasks Due Soon
            </h2>
            <Link
              to="/projects"
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              View all tasks
            </Link>
          </div>
          
          {tasksDueSoon.length === 0 ? (
            <p className="text-gray-500 text-center py-6">No tasks due soon</p>
          ) : (
            <div className="divide-y divide-gray-200">
              {tasksDueSoon.map((task) => {
                const projectName = projects.find(p => 
                  p.tasks.some(t => t.id === task.id)
                )?.title || '';
                
                const daysLeft = Math.ceil(
                  (new Date(task.dueDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
                );
                
                return (
                  <div key={task.id} className="py-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-medium text-gray-900">{task.title}</h3>
                      <p className="text-sm text-gray-500">
                        Project: {projectName}
                      </p>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="text-sm mr-4">
                        <span className={`font-medium ${
                          daysLeft <= 1 ? 'text-error-600' : 'text-warning-600'
                        }`}>
                          {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
                        </span>
                      </div>
                      
                      <div className="h-8 w-8 rounded-full overflow-hidden">
                        <img
                          src={`https://i.pravatar.cc/150?img=${Number(task.assignedTo) + 10}`}
                          alt="Assigned to"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default DashboardPage;