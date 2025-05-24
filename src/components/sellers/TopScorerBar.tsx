import React from 'react';

interface TopScorerBarProps {
  score: number;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function TopScorerBar({ 
  score, 
  showText = true, 
  size = 'md' 
}: TopScorerBarProps) {
  // Ensure score is between 0 and 100
  const normalizedScore = Math.max(0, Math.min(100, score));
  
  // Define size classes
  const heightClass = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };
  
  // Define color classes based on score
  const getColorClass = (score: number) => {
    if (score < 30) return 'bg-red-500';
    if (score < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  return (
    <div className="flex items-center">
      <div className="flex-1 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`${getColorClass(normalizedScore)} ${heightClass[size]}`}
          style={{ width: `${normalizedScore}%` }}
        />
      </div>
      
      {showText && (
        <span className="ml-2 text-sm font-medium text-gray-700">
          {normalizedScore}%
        </span>
      )}
    </div>
  );
} 