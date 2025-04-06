import React from 'react';
import { BookOpen, Trophy, FileQuestion } from 'lucide-react';

function StatsSection() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {[ 
        { icon: BookOpen, label: 'Available Quizzes', value: '100+' },
        { icon: Trophy, label: 'Active Users', value: '5,000+' },
        { icon: FileQuestion, label: 'Questions Generated', value: '50,000+' }
      ].map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center">
          <stat.icon className="h-8 w-8 text-indigo-600 mx-auto mb-4" />
          <h4 className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</h4>
          <p className="text-gray-600">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

export default StatsSection;
