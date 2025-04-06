import React from 'react';
import background from '../assets/background.jpg'

const HeroSection = () => {
    return (
        <section >
            <div className="hero-section1">
                <div className="hero-content">
                    <h1 >ENHANCE YOUR KNOWLEDGE </h1>
                    <p>Dive into fun and challenging quizzes to expand your horizons.</p>
                    <button className="get-started">Start Quizzling</button>
                </div>
            </div>

            <div className="features-overview">
                <h2>Features Overview</h2>
                <div className="features-cards">
                    <div className="feature-card">
                        <h3>Custom Quizzes</h3>
                        <p>Create quiz with ease. Tailor questions to your needs.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Real-Time Results</h3>
                        <p>Track performance instantly. Get insights on quiz trends.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Leaderboard</h3>
                        <p>Compete with friends. See who tops the charts.</p>
                    </div>
                </div>
             </div>
             <div className="signup-section">
                <h2>Join Us and Start Your Quizzing Journey</h2>
                <p>Sign up now to access exciting quizzes and challenge your knowledge!</p>
                <button className="signup-button">Sign Up</button>
            </div>
           
        </section>
    );
};

export default HeroSection;