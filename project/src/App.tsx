import React, { useState } from 'react';
import { Upload, BookOpen, Trophy, ArrowRight, FileQuestion } from 'lucide-react';

type QuizTopic = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

const topics: QuizTopic[] = [
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

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileQuestion className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">QuizMaster</h1>
            </div>
            <nav className="flex space-x-4">
              <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                My Quizzes
              </button>
              <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Leaderboard
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Challenge Your Knowledge
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take quizzes on various topics or upload your documents to generate custom questions.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <Upload className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Generate Custom Quiz</h3>
              <p className="text-gray-600 mb-6">
                Upload your document and we'll create personalized questions
              </p>
              <label className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt"
                />
                Upload Document
              </label>
              {selectedFile && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Quiz Topics */}
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

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: BookOpen, label: 'Available Quizzes', value: '100+' },
            { icon: Trophy, label: 'Active Users', value: '5,000+' },
            { icon: FileQuestion, label: 'Questions Generated', value: '50,000+' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 text-center"
            >
              <stat.icon className="h-8 w-8 text-indigo-600 mx-auto mb-4" />
              <h4 className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</h4>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 QuizMaster. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;