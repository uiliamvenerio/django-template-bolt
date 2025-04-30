import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, BarChart, Shield, Users } from 'lucide-react';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <CheckCircle size={24} className="text-primary-500" />,
      title: 'Project Management',
      description: 'Create, organize and track projects with ease. Manage tasks, deadlines and resources efficiently.',
    },
    {
      icon: <BarChart size={24} className="text-primary-500" />,
      title: 'Analytics Dashboard',
      description: 'Get detailed insights into your projects with visual analytics and progress tracking.',
    },
    {
      icon: <Users size={24} className="text-primary-500" />,
      title: 'Team Collaboration',
      description: 'Work together seamlessly with your team members. Assign tasks and share updates in real-time.',
    },
    {
      icon: <Shield size={24} className="text-primary-500" />,
      title: 'Secure Access Control',
      description: 'Control who can access what with role-based permissions and secure authentication.',
    },
  ];
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero section */}
      <header className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Streamline Your Projects with ProjectHub
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              A modern project management platform designed to help your team collaborate 
              efficiently and deliver exceptional results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button
                  variant="accent"
                  size="lg"
                  rightIcon={<ArrowRight size={20} />}
                >
                  Get Started
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-primary-600"
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Features section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Everything You Need in One Place
            </h2>
            <p className="text-xl text-gray-600">
              ProjectHub combines powerful features with intuitive design to make project 
              management simple and effective.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 md:py-20 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-primary-900">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl mb-8 text-primary-700">
              Join thousands of teams who rely on ProjectHub to deliver successful projects.
            </p>
            <Link to="/register">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight size={20} />}
              >
                Start for Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">ProjectHub</h2>
              <p className="text-gray-400 mt-2">© 2025 ProjectHub. All rights reserved.</p>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;