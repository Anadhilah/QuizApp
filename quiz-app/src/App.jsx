
import './styles/Header.css';
import './styles/HeroSection.css';

import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import UploadSection from './components/UploadSection';
import QuizTopics from './components/QuizTopics';
import StatsSection from './components/StatsSection';
import Footer from './components/Footer';



function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div className="container">
      <Header />
      <main className="container">
        <HeroSection />
        {/* <UploadSection selectedFile={selectedFile} handleFileChange={handleFileChange} />
        <QuizTopics />
        <StatsSection /> */}
      </main>
          <Footer/>
    </div>
  );
}

export default App;
