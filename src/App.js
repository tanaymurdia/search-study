import React, { useState, useEffect } from 'react';
import './App.css';
import Study from './Components/List';
import axios from 'axios';

const studyData = {
  'NCT Number': { 9: 'NCT06685666', 43: 'NCT06685224' },
  'Study Title': {
    9: 'Effects of Band Exercises Added to the Warm-Up on Shooting and Viscoelastic Properties of Muscles in Handball Players',
    43: 'Prediction of Weaning Outcome From Mechanical Ventilation Using Ultrasound'
  },
  'Study URL': {
    9: 'https://clinicaltrials.gov/study/NCT06685666',
    43: 'https://clinicaltrials.gov/study/NCT06685224'
  },
  'Study Status': { 9: 'RECRUITING', 43: 'NOT_YET_RECRUITING' },
  'Brief Summary': {
    9: "Under the same training conditions and additional elastic band exercises. In order to examine the effects of the warm-up programs to be applied in the chronic period, goal shooting, Modified Push Up test, Medicine Ball Throwing test, Upper Extremity Y Balance",
    43: 'DIAGNOSTIC_TEST: Ultrasound Assessment of the aeration of lung tissue and Parasternal Intercostal Muscle Thickness'
  },
  'Primary Outcome Measures': {
    9: 'Goal Shot (Shot Accuracy), In order to evaluate the shooting performance of the handball players, they will be asked to shoot at the designated areas of the goal. Four yellow target areas measuring 50 cm x 50 cm will be determined on the right-left, bottom and top corners of the handball goal. Athletes will be asked to take balls 11 m away from the goal and shoot at the goal from 9 meters. Each athlete will '
  },
  'Secondary Outcome Measures': { 9: 'Medicine Ball Throw Testr' },
  'Sponsor': { 9: 'Marmara University', 43: 'Tanta University' },
  'Sex': { 9: 'FEMALE', 43: 'ALL' },
  'Age': { 9: 'CHILD, ADULT', 43: 'ADULT, OLDER_ADULT' },
  'Enrollment': { 9: 30, 43: 50 },
  'Funder Type': { 9: 'OTHER', 43: 'OTHER' },
  'Study Type': { 9: 'INTERVENTIONAL', 43: 'OBSERVATIONAL' },
  'Study Design': {
    9: 'Allocation: RANDOMIZED|Intervention Model: SEQUENTIAL|Masking: NONE|Primary Purpose: OTHER',
    43: 'Observational Model: |Time Perspective: p'
  },
  'Other IDs': { 9: 'MarmaraU-AYDOGDU-OZCELİK001', 43: 'Prediction of Weaning Outcome' },
  'Start Date': { 9: '2024-09-30', 43: '2024-11-10' },
  'Primary Completion Date': { 9: '2024-11-15', 43: '2025-08-20' },
  'Completion Date': { 9: '2025-01-30', 43: '2025-11-20' },
  'First Posted': { 9: '2024-11-12', 43: '2024-11-12' },
  'Last Update Posted': { 9: '2024-11-12', 43: '2024-11-12' },
  'Locations': { 9: 'Marmara University, Istanbul, Maltepe, 34854, Turkey' }
};

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState(studyData);

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
