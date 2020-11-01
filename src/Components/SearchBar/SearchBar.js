import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.css';

const SearchBar = ({onSearch}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef();

  const search = () => {
    localStorage.setItem('searchTerm', inputRef.current.value)
    onSearch(searchTerm);
  }

  const handleTermChange = e => setSearchTerm(e.target.value);  

  const handleKeyDown = e => {
    if (e.keyCode !== 13) return;    
    search();
  }
  
  useEffect(() => {
    inputRef.current.value = localStorage.getItem('searchTerm');
    if (inputRef.current.value) onSearch(inputRef.current.value);
  }, [])  

  return (
    <div className="SearchBar">
      <input ref={inputRef} placeholder="Enter A Song, Album, or Artist" 
        onChange={handleTermChange} onKeyDown={handleKeyDown}/>
      <button className="SearchButton" onClick={search}>SEARCH</button>
    </div>
  );  
}

export default SearchBar;