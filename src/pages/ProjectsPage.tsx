import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import ProjectList from '../components/project/ProjectList';
import { useProjects } from '../contexts/ProjectContext';

const ProjectsPage: React.FC = () => {
  const { projects, isLoading, error, fetchProjects } = useProjects();
  
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);
  
  return (
    <Layout>
      {isLoading && projects.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      ) : error ? (
        <div className="bg-error-50 text-error-800 p-4 rounded-lg">
          Error: {error}
        </div>
      ) : (
        <ProjectList projects={projects} />
      )}
    </Layout>
  );
};

export default ProjectsPage;