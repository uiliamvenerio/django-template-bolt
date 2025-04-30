export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high';
  progress: number;
  startDate: string;
  endDate: string;
  createdBy: string;
  members: string[];
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Metric {
  id: string;
  label: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
}

export interface Activity {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  action: string;
  target: string;
  targetType: 'project' | 'task' | 'comment';
  timestamp: string;
}