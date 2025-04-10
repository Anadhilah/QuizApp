import React, { useState } from 'react';
import { Typography, Button, Paper } from '@mui/material';

const QuizAnswers = ({ question, onAnswerSelect }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    onAnswerSelect(answer); 
  };

  return (
    <Paper elevation={3} sx={{ padding: '1rem', borderRadius: '10px' }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {question.question}
      </Typography>
      <div style={{ marginTop: '1rem' }}>
        {question.answers.map((answer, index) => (
          <Button
            key={index}
            variant="outlined"
            color={selectedAnswer === answer ? 'primary' : 'default'}
            onClick={() => handleAnswerSelect(answer)}
            sx={{
              display: 'block',
              width: '100%',
              marginBottom: '0.5rem',
              borderRadius: '10px',
            }}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </Button>
        ))}
      </div>
    </Paper>
  );
};

export default QuizAnswers;
