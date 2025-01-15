import React from 'react'
import Image from '../assets/unicorn.png';

const Ending= () => {
  return (
    <div className="landing-page">
    <img src={Image}/>
    <h1>Ačiū už pateiktus atsakymus</h1>
    <div className="line"></div>
    <p>Odos tipo testas, skirtas išsiaiškinti jūsų odos tipui!</p>

    {/* <Button onClick={handlePlayNow} buttonText=''/> */}
</div>
  )
}

export default Ending