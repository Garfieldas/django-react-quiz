import React from 'react'
import Image from '../assets/unicorn.png';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const landing = () => {
    const navigate = useNavigate();
     const handlePlayNow = () => {
        navigate('/category');
     }
  return (
    <div className="landing-page">
    <img src={Image}/>
    <h1>Odos Quiz</h1>
    <div className="line"></div>
    <p>Odos tipo testas, skirtas išsiaiškinti jūsų odos tipui!</p>

    <Button onClick={handlePlayNow} buttonText='Žaisti!'/>
</div>
  )
}

export default landing