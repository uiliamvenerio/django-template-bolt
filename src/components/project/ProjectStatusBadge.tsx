import React from 'react';
import Badge from '../ui/Badge';

type ProjectStatus = 'planning' | 'in-progress' | 'completed' | 'on-hold';

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
}

const ProjectStatusBadge: React.FC<ProjectStatusBadgeProps> = ({ status }) => {
  const statusConfig: Record<ProjectStatus, { label: string; variant: string }> = {
    'planning': { label: 'Planning', variant: 'accent' },
    'in-progress': { label: 'In Progress', variant: 'primary' },
    'completed': { label: 'Completed', variant: 'success' },
    'on-hold': { label: 'On Hold', variant: 'warning' },
  };
  
  const { label, variant } = statusConfig[status];
  
  return (
    <Badge variant={variant as any} rounded>
      {label}
    </Badge>
  );
};

export default ProjectStatusBadge;