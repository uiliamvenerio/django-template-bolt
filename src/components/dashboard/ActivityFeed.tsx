import React from 'react';
import { Activity } from '../../types';
import Card from '../ui/Card';

interface ActivityFeedProps {
  activities: Activity[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <Card className="h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-sm text-primary-600 hover:text-primary-700">View all</button>
      </div>
      
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No recent activity</p>
        ) : (
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-5 w-0.5 bg-gray-200" />
            
            <ul className="space-y-4 relative z-10">
              {activities.map((activity) => (
                <li key={activity.id} className="flex items-start gap-4">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white">
                      <img
                        src={activity.user.avatar}
                        alt={activity.user.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full bg-primary-500 border-2 border-white" />
                  </div>
                  
                  <div className="flex-1 bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.user.name}{' '}
                        <span className="font-normal text-gray-600">
                          {activity.action} {activity.target}
                        </span>
                      </p>
                      <span className="text-xs text-gray-500">
                        {formatTime(activity.timestamp)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ActivityFeed;