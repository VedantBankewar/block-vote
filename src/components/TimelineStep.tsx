
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TimelineStepProps {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
  isActive: boolean;
  isLast: boolean;
  index: number;
  onClick: () => void;
}

const TimelineStep = ({ 
  step, 
  title, 
  description, 
  icon: IconComponent, 
  isActive, 
  isLast, 
  index,
  onClick 
}: TimelineStepProps) => {
  return (
    <div 
      className="text-center group animate-stagger-in cursor-pointer" 
      style={{'--index': index} as React.CSSProperties}
      onClick={onClick}
    >
      <div className="relative mb-6">
        <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center transition-all duration-500 shadow-lg ${
          isActive 
            ? 'bg-gradient-to-br from-blue-600 to-purple-600 scale-110 shadow-xl animate-glow' 
            : 'glass-card group-hover:shadow-xl group-hover:scale-105'
        }`}>
          <IconComponent className={`h-8 w-8 transition-colors duration-300 ${
            isActive 
              ? 'text-white animate-bounce-subtle' 
              : 'text-gray-600 dark:text-gray-300 group-hover:text-blue-600'
          }`} />
        </div>
        <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
          isActive 
            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white animate-bounce shadow-lg' 
            : 'glass text-gray-600 dark:text-gray-300'
        }`}>
          {step}
        </div>
        {!isLast && (
          <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800"></div>
        )}
      </div>
      <h3 className={`font-bold font-heading mb-2 transition-colors duration-300 ${
        isActive 
          ? 'text-blue-600 dark:text-blue-400' 
          : 'text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'
      }`}>
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default TimelineStep;
