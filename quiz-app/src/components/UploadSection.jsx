import React, { useState } from 'react';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf';
import '../styles/UploadSelection.css';

const UploadSection = () => {
    const [uploadedText, setUploadedText] = useState('');
    const [questions, setQuestions] = useState([]);

    const handleFileChange = async (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const file = files[0];
            const text = await extractTextFromFile(file);
            if (text) {
                setUploadedText(text); 
            }
        }
    };

    const extractTextFromFile = async (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const fileType = file.type;
                let text = '';

                if (fileType === 'application/pdf') {
                    const pdfData = new Uint8Array(e.target.result);
                    const pdf = await getDocument({ data: pdfData }).promise;

                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const content = await page.getTextContent();
                        text += content.items.map(item => item.str).join(' ') + ' ';
                    }
                } else if (fileType === 'text/plain') {
                    text = e.target.result; 
                } else {
                    alert('Unsupported file type. Please upload a PDF or TXT file.');
                }
                resolve(text); 
            };
            reader.readAsArrayBuffer(file);
        });
    };

    const generateQuestions = (text) => {
        const sentences = text.split('.').map(sentence => sentence.trim()).filter(Boolean);
        const questions = [];

        sentences.forEach((sentence) => {
            if (sentence.length > 5) {
                const question = {
                    question: `What does the following statement mean? "${sentence}"`,
                    options: generateOptions(sentence),
                    answer: 'Option A' 
                };
                questions.push(question);
            }

            if (sentence.includes('is')) {
                const parts = sentence.split('is');
                const fillInTheBlank = {
                    question: `What is missing? ${parts[0].trim()} is ___`,
                    answer: parts[1].trim()
                };
                questions.push(fillInTheBlank);
            }
        });

        return questions.filter(q => q.question); 
    };

    const generateOptions = (sentence) => {
        const words = sentence.split(' ');
        const options = [
            sentence, 
            `${words[0]} example`, 
            `${words[1]} alternative`, 
            `${words[2]} distraction`, 
        ];
        return options.sort(() => Math.random() - 0.5); 
    };

    const handleGenerateQuestions = () => {
        if (uploadedText) {
            const generatedQuestions = generateQuestions(uploadedText);
            setQuestions(generatedQuestions);
        } else {
            alert('Please upload a document first.');
        }
    };

    return (
        <div className="upload-container">
            <h1>Upload Files for Custom Questions</h1>
            <p>Let us know. We'll help you prepare the perfect set of questions.</p>
            <label className="upload-label">
                <input type="file" accept=".pdf, .txt" onChange={handleFileChange} />
                <span className="upload-icon">📤 Upload PDF or TXT</span>
            </label>
            <button onClick={handleGenerateQuestions} disabled={!uploadedText}>
                Generate Questions
            </button>
            {questions.length > 0 && (
                <div className="questions-container">
                    <h3>Generated Questions:</h3>
                    <ul>
                        {questions.map((q, index) => (
                            <li key={index}>{q.question}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UploadSection;