import React, { useState, useEffect } from 'react';
import '../styles/QuizTopics.css';
import maths from '../assets/maths.png';
import IT from '../assets/IT.png';
import science from '../assets/science.png';
import english from '../assets/english.png';
import business from '../assets/bussiness.png';

const QuizTopics = () => {
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
    const [questions, setQuestions] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);

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

    const fetchQuestions = async (category) => {
        const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`);
        const data = await response.json();
        setQuestions(data.results);
    };

    const handleTopicClick = (topic) => {
        setSelectedTopic(topic);
        fetchQuestions(topic.category);
    };

    return (
        <div className="topics-container">
            <h1>Browse Quiz Topics</h1>
            <div className="topics-grid">
                {topics.map((topic, index) => (
                    <div className="topic-card" key={index} onClick={() => handleTopicClick(topic)}>
                        <img src={topic.image} alt={topic.title} />
                        <h2>{topic.title}</h2>
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
            {selectedTopic && (
                <div className="questions-container">
                    <h2>{selectedTopic.title} Questions</h2>
                    {questions.map((question, index) => (
                        <div key={index} className="question-card">
                            <p>{question.question}</p>
                            <ul>
                                {question.incorrect_answers.map((answer, idx) => (
                                    <li key={idx}>{answer}</li>
                                ))}
                                <li>{question.correct_answer}</li>
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default QuizTopics;