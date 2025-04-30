import React from 'react';
import { Calendar, Clock, Users } from 'lucide-react';
import Card from '../ui/Card';
import ProjectStatusBadge from './ProjectStatusBadge';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const { title, description, status, progress, endDate, members, tasks } = project;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  
  return (
    <Card hover onClick={onClick} className="flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <ProjectStatusBadge status={status} />
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{description}</p>
      
      <div className="space-y-4 mt-2">
        {/* Progress bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-700">Progress</span>
            <span className="text-gray-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-500 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        {/* Tasks */}
        <div className="flex items-center text-sm text-gray-600">
          <Clock size={16} className="mr-1.5" />
          <span>{completedTasks}/{totalTasks} tasks completed</span>
        </div>
        
        {/* Due date */}
        <div className="flex items-center text-sm text-gray-600">
          <Calendar size={16} className="mr-1.5" />
          <span>Due {formatDate(endDate)}</span>
        </div>
        
        {/* Members */}
        <div className="flex justify-between items-center">
          <div className="flex -space-x-2">
            {members.slice(0, 3).map((member, index) => (
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
            
            {members.length > 3 && (
              <div className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-700">
                +{members.length - 3}
              </div>
            )}
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Users size={16} className="mr-1.5" />
            <span>{members.length}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;