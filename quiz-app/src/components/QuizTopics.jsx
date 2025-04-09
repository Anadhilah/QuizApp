import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/QuizTopics.css';
import maths from '../assets/maths.png';
import IT from '../assets/IT.png';
import science from '../assets/science.png';
import english from '../assets/english.png';
import business from '../assets/bussiness.png';

const QuizTopics = () => {
    const navigate = useNavigate();
    const [topics, setTopics] = useState([
        { title: 'Maths Quiz', image: maths, category: '18' },
        { title: 'Science Quiz', image: science, category: '17' },
        { title: 'English Quiz', image: english, category: '9' },
        { title: 'Business Quiz', image: business, category: '21' },
        { title: 'IT Quiz', image: IT, category: '18' },
        { title: 'Network Quiz', image: IT, category: '18' },
    ]);
  
    const [newTopic, setNewTopic] = useState('');
    const [newImage, setNewImage] = useState('');

    const handleAddTopic = (event) => {
        event.preventDefault();
        if (newTopic && newImage) {
            setTopics([...topics, { title: newTopic, image: newImage }]);
            setNewTopic('');
            setNewImage('');
        } else {
            alert("Please fill in both fields.");
        }
    };

    const handleTopicClick = (topic) => {
        navigate('/quiz', { state: { title: topic.title, category: topic.category } });
    };

    return (
        <div className="topics-container">
            <h1>Browse Quiz Topics</h1>
            <div className="topics-grid">
                {topics.map((topic, index) => (
                    <div className="topic-card" key={index}>
                        <img src={topic.image} alt={topic.title} />
                        <h2>{topic.title}</h2>
                        <button onClick={() => handleTopicClick(topic)}>Start Quiz</button>
                    </div>
                ))}
            </div>
            <form onSubmit={handleAddTopic} className="add-topic-form">
                <input
                    type="text"
                    placeholder="Quiz Title"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    required
                />
                <button type="submit">Add Quiz</button>
            </form>
        </div>
    );
};

export default QuizTopics;