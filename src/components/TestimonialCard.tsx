
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  rating: number;
  index: number;
}

const TestimonialCard = ({ name, role, quote, avatar, rating, index }: TestimonialCardProps) => {
  return (
    <Card 
      className="group glass-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg animate-stagger-in" 
      style={{'--index': index} as React.CSSProperties}
    >
      <CardContent className="p-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg">
            {avatar}
          </div>
          <div>
            <div className="font-bold font-heading text-gray-900 dark:text-white">{name}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{role}</div>
          </div>
        </div>
        <blockquote className="text-gray-700 dark:text-gray-300 italic leading-relaxed group-hover:text-gray-900 dark:group-hover:text-white transition-colors mb-4">
          &quot;{quote}&quot;
        </blockquote>
        <div className="flex space-x-1">
          {[...Array(rating)].map((_, i) => (
            <div key={i} className="w-4 h-4 text-yellow-400">⭐</div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
