'use client'

import { useState } from 'react';

export default function Search({ data }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      const filteredData = data.filter(item => 
        item.question.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filteredData);
    } else {
      setResults([]);
    }
  }

  return (
    <div className="search-container">
      <input 
        type="text" 
        placeholder="Search your question..." 
        value={query} 
        onChange={handleSearch}
      />
      {results.length > 0 && (
        <div className="results-container">
          {results.map(item => (
            <div key={item.id} className="result-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
