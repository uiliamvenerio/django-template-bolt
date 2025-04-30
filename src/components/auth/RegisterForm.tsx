import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});
  
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (!name) {
      newErrors.name = 'Name is required';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (error) {
      setErrors({
        general: 'Registration failed. Please try again.',
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errors.general && (
        <div className="bg-error-50 text-error-800 p-3 rounded-lg">
          {errors.general}
        </div>
      )}
      
      <div>
        <Input
          label="Full Name"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          error={errors.name}
          leftIcon={<User size={18} />}
          fullWidth
        />
      </div>
      
      <div>
        <Input
          label="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          error={errors.email}
          leftIcon={<Mail size={18} />}
          fullWidth
        />
      </div>
      
      <div>
        <Input
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          error={errors.password}
          leftIcon={<Lock size={18} />}
          hint="Password must be at least 8 characters"
          fullWidth
        />
      </div>
      
      <div>
        <Input
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          error={errors.confirmPassword}
          leftIcon={<Lock size={18} />}
          fullWidth
        />
      </div>
      
      <div className="flex items-center">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          required
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
          I agree to the{' '}
          <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
            Privacy Policy
          </a>
        </label>
      </div>
      
      <div>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          fullWidth
          className="py-2.5"
        >
          Create Account
        </Button>
      </div>
      
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;