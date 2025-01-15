import React, { useState } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Quiz = ({ questions, choices }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [textAnswer, setTextAnswer] = useState('');
  const navigate = useNavigate();

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentIndex];

    // Create a new answer object
    const newAnswer = {
      user_name: 'Anonymous', // Placeholder; replace with actual user info if needed
      last_name: 'Unknown',   // Placeholder; replace with actual user info if needed
      question: currentQuestion.id,
      selected_choice: null, // No choice for text-based questions
      text_answer: textAnswer,
    };

    setUserAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
    setTextAnswer('');

    // Navigate after the last question
    if (currentIndex === questions.length - 1) {
      navigate('/userinfo', { state: { userAnswers: [...userAnswers, newAnswer] } });
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleAnswerSelection = (questionId, choiceId) => {
    const currentQuestion = questions[currentIndex];

    // Create a new answer object
    const newAnswer = {
      user_name: 'Anonymous', // Placeholder; replace with actual user info if needed
      last_name: 'Unknown',   // Placeholder; replace with actual user info if needed
      question: questionId,
      selected_choice: choiceId,
      text_answer: null,
    };

    setUserAnswers((prevAnswers) => [
      ...prevAnswers.filter((answer) => answer.question !== questionId), // Replace answer for the same question
      newAnswer,
    ]);

    // Navigate after the last question
    if (currentIndex === questions.length - 1) {
      navigate('/userinfo', { state: { userAnswers: [...userAnswers.filter((answer) => answer.question !== questionId), newAnswer] } });
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  if (questions.length === 0) {
    return <p>Kraunama...</p>;
  }

  const currentQuestion = questions[currentIndex];
  const currentChoices = choices.filter((choice) => choice.question === currentQuestion.id);

  return (
    <div className="quiz">
      <h2>{currentQuestion.question_text}</h2>

      <div id="options-container">
        {currentQuestion.is_text_field ? (
          <input
            type="text"
            className="input-field"
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            placeholder="Įrašykite atsakymą"
            required
          />
        ) : (
          currentChoices.map((choice) => (
            <Button
              id={choice.id}
              key={choice.id}
              buttonText={choice.choice_text}
              className={`option ${
                userAnswers.find((answer) => answer.question === currentQuestion.id)?.selected_choice === choice.id
                  ? 'selected'
                  : ''
              }`}
              onClick={() => handleAnswerSelection(currentQuestion.id, choice.id)}
            />
          ))
        )}
      </div>

      {currentQuestion.is_text_field && (
        <button
          onClick={handleNextQuestion}
          disabled={!textAnswer} // Disable if input is empty
        >
          Kitas
        </button>
      )}

      <button className="restart-game" onClick={() => navigate('/')}>
        Išeiti
      </button>
    </div>
  );
};

export default Quiz;
