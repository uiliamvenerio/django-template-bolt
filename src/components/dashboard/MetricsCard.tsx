import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import Card from '../ui/Card';

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: number;
  changeText?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  icon,
  change,
  changeText,
  changeType = 'neutral',
}) => {
  const renderChangeIndicator = () => {
    if (change === undefined) return null;
    
    const changeColors = {
      increase: 'text-success-600',
      decrease: 'text-error-600',
      neutral: 'text-gray-600',
    };
    
    const ChangeIcon = changeType === 'increase' ? ArrowUp : ArrowDown;
    
    return (
      <div className={`flex items-center ${changeColors[changeType]}`}>
        {changeType !== 'neutral' && (
          <ChangeIcon size={16} className="mr-1" />
        )}
        <span className="text-sm font-medium">
          {change}% {changeText || (changeType === 'increase' ? 'increase' : 'decrease')}
        </span>
      </div>
    );
  };
  
  return (
    <Card className="h-full">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
          {renderChangeIndicator()}
        </div>
        <div className="p-3 rounded-full bg-primary-50 text-primary-500">
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default MetricsCard;