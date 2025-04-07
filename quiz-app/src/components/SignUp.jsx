import React from 'react';
import '../styles/SignUp.css'; 

const SignUp = () => {
    return (
        <div className="signup-container">
            <h1>Create an account</h1>
            <form className="signup-form">
                <input type="text" placeholder="Fullname" required />
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Submit</button>
            </form>
            <div className="social-login">
                <p>Have an account? <a href="/signin">sign in</a></p>
                <div className="social-buttons">
                    <button className="google">Continue with Google</button>
                    <button className="github">Continue with GitHub</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;