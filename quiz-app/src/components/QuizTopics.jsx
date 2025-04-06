import React from 'react';
import { ArrowRight } from 'lucide-react';

const topics = [
  {
    id: '1',
    title: 'Science & Technology',
    description: 'Test your knowledge of scientific discoveries and technological innovations',
    imageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '2',
    title: 'History & Culture',
    description: 'Explore historical events and cultural phenomena',
    imageUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '3',
    title: 'Arts & Literature',
    description: 'Dive into the world of creative arts and literary masterpieces',
    imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1000',
  },
];

function QuizTopics() {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-8">Featured Topics</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${topic.imageUrl})` }}
            />
            <div className="p-6">
              <h4 className="text-xl font-semibold mb-2">{topic.title}</h4>
              <p className="text-gray-600 mb-4">{topic.description}</p>
              <button className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium">
                Start Quiz
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizTopics;
