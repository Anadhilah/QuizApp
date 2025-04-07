import React from 'react';
import '../styles/UploadSelection.css';

const UploadSection = () => {
    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
           
            console.log(files);
        }
    };

    return (
        <div className="upload-container">
            <h1>Upload Files for Custom Questions</h1>
            <p>Let us know. We'll help you prepare the perfect set of questions.</p>
            <label className="upload-label">
                <input type="file" accept=".ppt, .pdf, .doc, .txt" onChange={handleFileChange} />
                <span className="upload-icon">📤 Upload PPT, PDF, DOC, TXT</span>
            </label>
        </div>
    );
};

export default UploadSection;