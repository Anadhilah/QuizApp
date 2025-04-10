// TotalResult.jsx
import React from 'react';
import { Paper, Typography, Button } from '@mui/material';

const TotalResult = ({ score, totalQuestions, onResetQuiz }) => {
    return (
        <Paper elevation={3} sx={{ mt: 5, p: 4, borderRadius: 4, backgroundColor: '#fff' }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                🎉 Quiz Finished!
            </Typography>
            <Typography variant="h6">
                Your Score: {score} out of {totalQuestions}
            </Typography>
            <Button variant="contained" color="primary" onClick={onResetQuiz} sx={{ mt: 2 }}>
                Restart Quiz
            </Button>
        </Paper>
    );
};

export default TotalResult;