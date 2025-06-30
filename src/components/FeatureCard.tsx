
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  darkBgColor: string;
  index: number;
}

const FeatureCard = ({ 
  icon: IconComponent, 
  title, 
  description, 
  color, 
  bgColor, 
  darkBgColor, 
  index 
}: FeatureCardProps) => {
  return (
    <Card 
      className="group glass-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg animate-stagger-in" 
      style={{'--index': index} as React.CSSProperties}
    >
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 relative">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${bgColor} dark:${darkBgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
            <IconComponent className={`h-8 w-8 ${color} group-hover:animate-bounce-subtle`} />
          </div>
          <div className="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 opacity-0 group-hover:opacity-20 group-hover:animate-ping"></div>
        </div>
        <CardTitle className="text-xl font-bold font-heading text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
