
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatItem {
  number: string;
  label: string;
  icon: LucideIcon;
  color: string;
}

interface StatsGridProps {
  stats: StatItem[];
}

const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center stagger-container">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div 
            key={index} 
            className="space-y-2 animate-stagger-in" 
            style={{'--index': index} as React.CSSProperties}
          >
            <div className="flex items-center justify-center mb-2">
              <IconComponent className={`h-6 w-6 ${stat.color} mr-2`} />
              <div className={`text-3xl font-bold font-heading ${stat.color}`}>
                {stat.number}
              </div>
            </div>
            <div className="text-gray-600 dark:text-gray-300 font-medium">
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;
