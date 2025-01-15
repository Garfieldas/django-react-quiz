import React from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom';

const Category = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate('/');
    }
    const quiz = () => {
        navigate('/quiz');
    }


  return (
    <div className="game-category">
    <h1>Menu</h1>
    <div className="line"></div>

    <div className="category-options">
        <Button buttonText='Testas' onClick={quiz}/>
        {/* <Button buttonText='Rezultatai' onClick={quiz}/> */}
        <Button buttonText='Instrukcija' onClick={quiz}/>
        <Button buttonText='Grįžti' onClick={goBack}/>
    </div>
</div>
  )
}

export default Category