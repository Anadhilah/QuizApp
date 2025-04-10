import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Select,
  Button,
  MenuItem,
  TextField,
  Container,
  Typography,
  InputLabel,
  FormControl,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import QuizAnswers from './QuizAnswers';
import TotalResult from './TotalResult';

const QuizCategories = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [quizNumber, setQuizNumber] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const difficulties = [
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' },
  ];

  const fetchQuizCategories = async () => {
    try {
      const { data } = await axios.get('https://opentdb.com/api_category.php');
      setCategories(data.trivia_categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchQuizCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setQuestions([]);
    setScore(0);
    setSelectedAnswers([]);

    try {
      const { data } = await axios.get('https://opentdb.com/api.php', {
        params: {
          amount: quizNumber,
          category,
          difficulty,
          type: 'multiple',
        },
      });

      const formatted = data.results.map((q) => {
        const allAnswers = [...q.incorrect_answers];
        const randomIndex = Math.floor(Math.random() * (allAnswers.length + 1));
        allAnswers.splice(randomIndex, 0, q.correct_answer);

        return {
          ...q,
          answers: allAnswers,
        };
      });

      setQuestions(formatted);
      setIsQuizStarted(true);
      setCurrentQuestionIndex(0);
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }

    setLoading(false);
  };

  const handleAnswerSelect = (answer) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(updatedSelectedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    const finalScore = selectedAnswers.reduce((acc, answer, idx) => {
      return answer === questions[idx].correct_answer ? acc + 1 : acc;
    }, 0);
    setScore(finalScore);
    alert(`Quiz Finished! Your Score: ${finalScore} out of ${questions.length}`);
    setIsQuizStarted(false);
  };

  const handleResetQuiz = () => {
    setIsQuizStarted(false);
    setCategory('');
    setDifficulty('');
    setQuizNumber(1);
    setQuestions([]);
    setScore(0);
    setSelectedAnswers([]);
    setCurrentQuestionIndex(0);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 4 }}>
      {!isQuizStarted ? (
        <Paper elevation={4} sx={{ p: 4, borderRadius: 4, backgroundColor: '#f9f9fb' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
            🎯 Generate Quiz
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    label="Category"
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="difficulty-label">Difficulty</InputLabel>
                  <Select
                    labelId="difficulty-label"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    required
                    label="Difficulty"
                  >
                    {difficulties.map((diff) => (
                      <MenuItem key={diff.id} value={diff.id}>
                        {diff.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Number of Questions (1 - 10)"
                  value={quizNumber}
                  inputProps={{ min: 1, max: 10 }}
                  onChange={(e) => setQuizNumber(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    px: 5,
                    py: 1.5,
                    borderRadius: '30px',
                    textTransform: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Start Quiz'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      ) : questions.length > 0 && currentQuestionIndex < questions.length ? (
        <Paper elevation={3} sx={{ mt: 5, p: 4, borderRadius: 4, backgroundColor: '#fff' }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            🧠 Quiz Question
          </Typography>
          <QuizAnswers
            question={questions[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
          />
          <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0} // Disable if on the first question
              >
                Previous Question
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1} // Disable if on the last question
              >
                Next Question
              </Button>
            </Grid>
            <Grid item>
              {currentQuestionIndex === questions.length - 1 && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleSubmitQuiz}
                >
                  Submit Quiz
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <TotalResult score={score} totalQuestions={questions.length} onResetQuiz={handleResetQuiz} />
      )}
    </Container>
  );
};

export default QuizCategories;