// AskGemini.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './gemini.css';

const AskGemini = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await axios.post('http://localhost:3001/ask', { prompt: input });
      setResponse(result.data.response);
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred while processing your request.');
    }
    setIsLoading(false);
  };

  return (
    <div className="widget">
      <h1>Ask GPT</h1>
      <div className="response-area">
        {response ? (
          <p>{response}</p>
        ) : (
          <p className="placeholder">Gemini's response will appear here.</p>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your prompt here..."
          rows="4"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Thinking...' : 'Ask'}
        </button>
      </form>
    </div>
  );
}

export default AskGemini;
