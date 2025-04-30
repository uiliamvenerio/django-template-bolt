import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Task } from '../types';
import { useAuth } from './AuthContext';

interface ProjectContextType {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  getProject: (id: string) => Project | undefined;
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'tasks'>) => Promise<Project>;
  updateProject: (id: string, project: Partial<Project>) => Promise<Project>;
  deleteProject: (id: string) => Promise<void>;
  createTask: (projectId: string, task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Task>;
  updateTask: (projectId: string, taskId: string, task: Partial<Task>) => Promise<Task>;
  deleteTask: (projectId: string, taskId: string) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Mock project data
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Website Redesign',
    description: 'Redesign company website with modern UI/UX',
    status: 'in-progress',
    priority: 'high',
    progress: 65,
    startDate: '2023-01-15',
    endDate: '2023-03-30',
    createdBy: '1',
    members: ['1', '2'],
    tasks: [
      {
        id: '101',
        title: 'Design homepage mockup',
        description: 'Create mockup for homepage with new brand guidelines',
        status: 'completed',
        priority: 'high',
        assignedTo: '2',
        dueDate: '2023-01-25',
        createdAt: '2023-01-16T09:00:00Z',
        updatedAt: '2023-01-24T14:30:00Z',
      },
      {
        id: '102',
        title: 'Develop frontend components',
        description: 'Create reusable React components based on design system',
        status: 'in-progress',
        priority: 'medium',
        assignedTo: '1',
        dueDate: '2023-02-20',
        createdAt: '2023-01-26T10:15:00Z',
        updatedAt: '2023-02-05T11:45:00Z',
      },
      {
        id: '103',
        title: 'Backend API integration',
        description: 'Connect frontend to backend API endpoints',
        status: 'todo',
        priority: 'medium',
        assignedTo: '1',
        dueDate: '2023-03-15',
        createdAt: '2023-01-26T10:30:00Z',
        updatedAt: '2023-01-26T10:30:00Z',
      }
    ],
    createdAt: '2023-01-15T08:30:00Z',
    updatedAt: '2023-02-05T14:45:00Z',
  },
  {
    id: '2',
    title: 'Mobile App Development',
    description: 'Build iOS and Android app for customer engagement',
    status: 'planning',
    priority: 'medium',
    progress: 15,
    startDate: '2023-02-01',
    endDate: '2023-06-30',
    createdBy: '1',
    members: ['1'],
    tasks: [
      {
        id: '201',
        title: 'Create app wireframes',
        description: 'Design initial wireframes for main app screens',
        status: 'in-progress',
        priority: 'high',
        assignedTo: '1',
        dueDate: '2023-02-15',
        createdAt: '2023-02-02T09:00:00Z',
        updatedAt: '2023-02-05T16:30:00Z',
      }
    ],
    createdAt: '2023-02-01T10:00:00Z',
    updatedAt: '2023-02-05T16:30:00Z',
  }
];

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, we would filter projects based on user permissions
      setProjects(mockProjects);
    } catch (err) {
      setError('Failed to fetch projects');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getProject = (id: string) => {
    return projects.find(project => project.id === id);
  };

  const createProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'tasks'>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (!user) {
        throw new Error('User must be authenticated to create a project');
      }
      
      const newProject: Project = {
        ...projectData,
        id: String(Date.now()),
        createdBy: user.id,
        tasks: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setProjects(prevProjects => [...prevProjects, newProject]);
      return newProject;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create project';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProject = async (id: string, projectData: Partial<Project>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const projectIndex = projects.findIndex(p => p.id === id);
      
      if (projectIndex === -1) {
        throw new Error('Project not found');
      }
      
      const updatedProject = {
        ...projects[projectIndex],
        ...projectData,
        updatedAt: new Date().toISOString(),
      };
      
      const updatedProjects = [...projects];
      updatedProjects[projectIndex] = updatedProject;
      
      setProjects(updatedProjects);
      return updatedProject;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update project';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const projectIndex = projects.findIndex(p => p.id === id);
      
      if (projectIndex === -1) {
        throw new Error('Project not found');
      }
      
      const updatedProjects = projects.filter(p => p.id !== id);
      setProjects(updatedProjects);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete project';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const createTask = async (projectId: string, taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const projectIndex = projects.findIndex(p => p.id === projectId);
      
      if (projectIndex === -1) {
        throw new Error('Project not found');
      }
      
      const newTask: Task = {
        ...taskData,
        id: `task-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const updatedProject = {
        ...projects[projectIndex],
        tasks: [...projects[projectIndex].tasks, newTask],
        updatedAt: new Date().toISOString(),
      };
      
      const updatedProjects = [...projects];
      updatedProjects[projectIndex] = updatedProject;
      
      setProjects(updatedProjects);
      return newTask;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create task';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (projectId: string, taskId: string, taskData: Partial<Task>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const projectIndex = projects.findIndex(p => p.id === projectId);
      
      if (projectIndex === -1) {
        throw new Error('Project not found');
      }
      
      const taskIndex = projects[projectIndex].tasks.findIndex(t => t.id === taskId);
      
      if (taskIndex === -1) {
        throw new Error('Task not found');
      }
      
      const updatedTask = {
        ...projects[projectIndex].tasks[taskIndex],
        ...taskData,
        updatedAt: new Date().toISOString(),
      };
      
      const updatedTasks = [...projects[projectIndex].tasks];
      updatedTasks[taskIndex] = updatedTask;
      
      const updatedProject = {
        ...projects[projectIndex],
        tasks: updatedTasks,
        updatedAt: new Date().toISOString(),
      };
      
      const updatedProjects = [...projects];
      updatedProjects[projectIndex] = updatedProject;
      
      setProjects(updatedProjects);
      return updatedTask;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update task';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (projectId: string, taskId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const projectIndex = projects.findIndex(p => p.id === projectId);
      
      if (projectIndex === -1) {
        throw new Error('Project not found');
      }
      
      const updatedTasks = projects[projectIndex].tasks.filter(t => t.id !== taskId);
      
      const updatedProject = {
        ...projects[projectIndex],
        tasks: updatedTasks,
        updatedAt: new Date().toISOString(),
      };
      
      const updatedProjects = [...projects];
      updatedProjects[projectIndex] = updatedProject;
      
      setProjects(updatedProjects);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete task';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        isLoading,
        error,
        fetchProjects,
        getProject,
        createProject,
        updateProject,
        deleteProject,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};