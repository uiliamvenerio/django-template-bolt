import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hover = false,
  padding = 'md',
}) => {
  const paddingClass = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const hoverClass = hover
    ? 'hover:shadow-md transition-shadow duration-200 cursor-pointer'
    : '';

  return (
    <div
      className={`
        bg-white rounded-lg shadow-sm border border-gray-200
        ${paddingClass[padding]}
        ${hoverClass}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;