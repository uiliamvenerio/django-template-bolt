import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderKanban, Search, Filter } from 'lucide-react';
import ProjectCard from './ProjectCard';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Project } from '../../types';

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const navigate = useNavigate();
  
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'planning', label: 'Planning' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'on-hold', label: 'On Hold' },
  ];
  
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <FolderKanban className="mr-2 text-primary-500" />
          Projects
        </h1>
        
        <Button
          variant="primary"
          onClick={() => navigate('/projects/new')}
        >
          Create Project
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-3/4">
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search size={18} />}
            fullWidth
          />
        </div>
        
        <div className="w-full sm:w-1/4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => navigate(`/projects/${project.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <FolderKanban size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            {searchQuery || statusFilter !== 'all'
              ? "No projects match your current filters. Try adjusting your search or filters."
              : "You don't have any projects yet. Create your first project to get started."}
          </p>
          <Button
            variant="primary"
            onClick={() => navigate('/projects/new')}
          >
            Create Project
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectList;