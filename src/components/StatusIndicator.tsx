
import React from 'react';
import { CheckCircle, AlertCircle, XCircle, Clock } from 'lucide-react';

interface StatusIndicatorProps {
  status: 'success' | 'warning' | 'error' | 'pending';
  title: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  status, 
  title, 
  description, 
  size = 'md' 
}) => {
  const statusConfig = {
    success: {
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-200'
    },
    warning: {
      icon: AlertCircle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-200'
    },
    error: {
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-200'
    },
    pending: {
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-200'
    }
  };

  const sizeConfig = {
    sm: { icon: 'h-4 w-4', text: 'text-sm', padding: 'p-2' },
    md: { icon: 'h-5 w-5', text: 'text-base', padding: 'p-3' },
    lg: { icon: 'h-6 w-6', text: 'text-lg', padding: 'p-4' }
  };

  const config = statusConfig[status];
  const sizes = sizeConfig[size];
  const IconComponent = config.icon;

  return (
    <div className={`flex items-center gap-3 ${sizes.padding} rounded-lg border ${config.bgColor} ${config.borderColor}`}>
      <IconComponent className={`${sizes.icon} ${config.color} flex-shrink-0`} />
      <div className="flex-1">
        <p className={`font-medium ${sizes.text} ${config.color}`}>
          {title}
        </p>
        {description && (
          <p className={`text-gray-600 ${size === 'sm' ? 'text-xs' : 'text-sm'} mt-1`}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatusIndicator;
