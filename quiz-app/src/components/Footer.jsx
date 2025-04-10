import React, { useState } from 'react';
import '../styles/Footer.css';
import logo from '../assets/logo.jpg';
import facebook from '../assets/facebook.png';
import whatsApp from '../assets/whatsApp.png';
import instagram from '../assets/instagram.jpeg';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubscribe = () => {
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setMessage('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        setMessage(''); 

      
        setTimeout(() => {
            setLoading(false);
            setMessage('Thank you for subscribing!');
            setEmail(''); 
        }, 2000);
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className='logo'>
                    <img src={logo} alt="QuizMaster Logo" className="logo" />
                    <h2>QuizMaster</h2>
                </div>
                
                <div className="newsletter">
                    <input
                        type="email"
                        placeholder="Input your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="subscribe-button" onClick={handleSubscribe}>
                        {loading ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </div>
                {message && <p className="subscribe-message">{message}</p>}
            </div>

            <div className="footer-links">
                <div className="footer-column">
                    <h3>Product</h3>
                    <ul>
                        <li>Features</li>
                        <li>Pricing</li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Resources</h3>
                    <ul>
                        <li>Blog</li>
                        <li>User Guides</li>
                        <li>Webinars</li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Company</h3>
                    <ul>
                        <li>About Us</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 brand</p>
                <div className="social-icons">
                    <span><img src={facebook} alt="Facebook" /></span>
                    <span><img src={instagram} alt="Instagram" /></span>
                    <span><img src={whatsApp} alt="WhatsApp" /></span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;