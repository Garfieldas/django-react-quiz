import axios from "axios";

const BASE_URL = '';
const GET_QUESIONS = `${BASE_URL}questions/`;
const GET_CHOICES = `${BASE_URL}choices/`;
const SUBMIT_ANSWERS = `${BASE_URL}submit_answers/`;

export const get_questions = async () => {
    const response = await axios.get(GET_QUESIONS);
    // console.log('Fetched', response.data);
    return response.data;
}

export const get_choices = async () => {
    const response = await axios.get(GET_CHOICES);
    // console.log('Fetched', response.data);
    return response.data;
}


export const submit_answers = async (answers) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`,
            'X-CSRFToken': getCsrfToken(), 
        };

        const response = await axios.post(SUBMIT_ANSWERS, answers, { headers });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error Submitting Answers:', error.response.data);
            throw new Error(`Submission failed: ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
            console.error('No response received:', error.request);
            throw new Error('Submission failed: No response from server');
        } else {
            console.error('Error Submitting Answers:', error.message);
            throw new Error(`Submission failed: ${error.message}`);
        }
    }
};

function getCsrfToken() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        if (cookie.trim().startsWith('csrftoken=')) {
            return cookie.split('=')[1];
        }
    }
    return '';
}