import './styles/Header.css';
import './styles/HeroSection.css';
import './styles/SignUp.css'; 

import './styles/QuizTopics.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import UploadSection from './components/UploadSection';
import QuizTopics from './components/QuizTopics'; 
import QuizCategories from './components/quizCategories';
import Footer from './components/Footer';
import SignUp from './components/SignUp';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <Router>
      <div className="container">
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/upload" element={<UploadSection />} />
            <Route path="/topics" element={<QuizTopics />} /> 
           <Route path="/quiz-categories" element={<QuizCategories />}/>
            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>

 
  );
}

export default App;
