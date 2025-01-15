import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { submit_answers } from '../api/endpoints';
import emailjs from '@emailjs/browser';

const UserInfo = () => {
  const [userName, setUserName] = useState('');
  const [lastName, setLastName] = useState('');
  const [user_email, setUser_Email] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const userAnswers = location.state?.userAnswers || [];
      const finalAnswers = userAnswers.map(answer => ({
        ...answer,
        user_name: userName,
        last_name: lastName,
      }));
      await submit_answers(finalAnswers); // Send user answers to the API
      navigate('/ending');
    } catch (error) {
      console.error('Error submitting answers:', error);
      alert('Failed to submit answers. Please try again.');
    }
  };

  const sendEmail = async () => {
    const params = {
      userName: userName,
      user_email: user_email
    };
    emailjs
      .send('service_7dlawdf', 'template_tpwu2ik', params, {
        publicKey: 'P9kgH5NQK03ZmJ5Ze',
      })
      .then(
        () => {
        console.log('Success');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div className='quiz'>
      <h2>Pabaiga</h2>
      <input
        type="text"
        className="input-field"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Įveskite savo vardą"
        required
      />
      <input
        type="text"
        className="input-field"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Įveskite savo pavardę"
        required
      />
      <input
        type="text"
        className="input-field"
        value={user_email}
        onChange={(e) => setUser_Email(e.target.value)}
        placeholder="Įveskite savo el.paštą"
        required
      />
      <button
        onClick={() => { handleSubmit(); sendEmail(); }}
        disabled={!userName || !lastName || !user_email}
      >
        Patvirtinti
      </button>
    </div>
  );
};

export default UserInfo;
