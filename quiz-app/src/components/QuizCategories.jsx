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
import { useEffect, useState } from 'react';
import axios from 'axios';

const QuizCategories = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [quizNumber, setQuizNumber] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

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
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 4 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
          backgroundColor: '#f9f9fb',
        }}
      >
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

      {/* Display Questions */}
      {!loading && questions.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            mt: 5,
            p: 4,
            borderRadius: 4,
            backgroundColor: '#fff',
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            🧠 Quiz Questions
          </Typography>
          {questions.map((q, idx) => (
            <div key={idx} style={{ marginBottom: '2rem' }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 'bold' }}
                dangerouslySetInnerHTML={{
                  __html: `${idx + 1}. ${q.question}`,
                }}
              />
              <ul style={{ listStyleType: 'none', paddingLeft: 0, marginTop: '1rem' }}>
                {q.answers.map((ans, i) => (
                  <li
                    key={i}
                    style={{
                      backgroundColor: '#f1f1f1',
                      marginBottom: '0.5rem',
                      padding: '10px 15px',
                      borderRadius: '10px',
                      transition: '0.3s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f1f1f1')}
                  >
                    <span dangerouslySetInnerHTML={{ __html: ans }} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Paper>
      )}
    </Container>
  );
};

export default QuizCategories;
