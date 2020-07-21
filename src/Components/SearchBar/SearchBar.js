import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = props => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const search = () => props.onSearch(searchTerm);
  const handleTermChange = e => setSearchTerm(e.target.value);  

  const handleKeyDown = e => {
    if (e.keyCode !== 13) return;    
    search();
  }
  
  return (
    <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist" 
        onChange={handleTermChange} onKeyDown={handleKeyDown}/>
      <button className="SearchButton" onClick={search}>SEARCH</button>
    </div>
  );  
}

export default SearchBar;