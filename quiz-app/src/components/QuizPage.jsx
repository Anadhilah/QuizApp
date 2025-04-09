import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/QuizPage.css';

const QuizPage = () => {
    const location = useLocation();
    const { title, category } = location.state || {}; // Safely access state

    if (!title || !category) {
        return <div>Error: Quiz details not found.</div>;
    }

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const fetchQuestions = async () => {
        const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`);
        const data = await response.json();
        setQuestions(data.results);
    };

    useEffect(() => {
        fetchQuestions();
    }, [category]);

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        const nextQuestion = currentQuestionIndex + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestionIndex(nextQuestion);
        } else {
            setFinished(true);
        }
    };

    if (finished) {
        return (
            <div className="quiz-results">
                <h2>Your Score: {score} / {questions.length}</h2>
                <a href="/">Return to Topics</a>
            </div>
        );
    }

    return (
        <div className="quiz-container">
            <h2>{title}</h2>
            {questions.length > 0 && (
                <div className="question-card">
                    <p>{questions[currentQuestionIndex].question}</p>
                    <ul>
                        {questions[currentQuestionIndex].incorrect_answers.map((answer, index) => (
                            <li key={index} onClick={() => handleAnswer(false)}>{answer}</li>
                        ))}
                        <li onClick={() => handleAnswer(true)}>{questions[currentQuestionIndex].correct_answer}</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default QuizPage;