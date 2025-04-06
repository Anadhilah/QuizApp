import React from 'react';
import '../styles/Header.css'; 
import logo from '../assets/logo.jpg';


const Header = () => {
    return (
        <header className="header">
            <div className="logo">
            <img src={logo} alt="QuizMaster Logo" className="logo" />
                <h1>QuizMaster</h1>
            </div>
            <nav className="nav">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/topics">Topics</a></li>
                    <li><a href="/upload">Upload</a></li>
                </ul>
            </nav>
            <div className="buttons">
                <button className="start-quiz">Start Quiz</button>
                <button className="signup">Sign Up</button>
            </div>
        </header>
    );
};

export default Header;