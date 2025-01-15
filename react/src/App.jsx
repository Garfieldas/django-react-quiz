import React from 'react'
import Div from './components/Div'
import Landing from './pages/landing'
import Category from './pages/Category'
import Quiz from './pages/Quiz'
import Ending from './pages/Ending'
import UserInfo from './pages/UserInfo'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useState, useEffect } from 'react'
import { get_questions, get_choices } from './api/endpoints'

const App = () => {

  const [questions, setQuestions] = useState([]);
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    const fetchQuestions = async() => {
     const questions = await get_questions();
     setQuestions(questions);
    }
    fetchQuestions();
  },[])

  useEffect(() => {
    const fetchChoices = async() => {
     const choices = await get_choices();
     setChoices(choices);
    }
    fetchChoices();
  },[])


  return (
    <Router>
    <Div>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/category" element={<Category/>} />
        <Route path="/quiz" element={<Quiz questions={questions} choices={choices}/>} />
        <Route path="/userinfo" element={<UserInfo/>} />
        <Route path="/ending" element={<Ending/>} />
      </Routes>
    </Div>
    </Router>
  )
}

export default App