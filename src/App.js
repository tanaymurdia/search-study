import React, { useState, useEffect } from 'react';
import './App.css';
import Study from './Components/List';
import axios from 'axios';


const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState();

  const handleSearch = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/search_csv', {
        text: searchTerm,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'json' // Force json response type
      });
  
      // Handle success (store token, navigate, etc.)
      const data = response.data;
      const success = data.success;
      console.log(data);
     if (success)
      if (Object.keys(data.similiar_rows).length === 0) {
        setFilteredResults(false)
      } else {
        setFilteredResults(data.similiar_rows)
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error || 'Searching text Failed');
      } else {
        alert('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App animate__animated animate__fadeIn">
      <h1>Study Search</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={() => handleSearch()}>
        Search
      </button>
      {isLoading ?     <div className="spinner-container">
      <div className="spinner"></div>
    </div>:
      <>{filteredResults ? 
        <div className='List'>
        {Object.keys(filteredResults['NCT Number']).map((key) => {
          const details = Object.keys(filteredResults).reduce((acc, current) => {
            acc[current] = filteredResults[current][key];
            return acc;
          }, {});
  
          return (
            <Study
              key={key}
              details={details}
            />
          );
        })}
        </div>
        :
        <div className="study-container" >
  <div className="study-header">
    <h3 className="study-title">No results found</h3>
  </div>
</div>
}</>}

    </div>
  );
}

export default App;
