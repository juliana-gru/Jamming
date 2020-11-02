import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.css';

const SearchBar = ({onSearch}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef();

  const search = () => {
    localStorage.setItem('searchTerm', inputRef.current.value);
    onSearch(searchTerm);
  }

  const handleTermChange = e => setSearchTerm(e.target.value);  

  const handleKeyDown = e => {
    if (e.keyCode !== 13) return;    
    search();
  }
  
  useEffect(() => {
    //Get saved search term from local storage
    const firstSearchTerm = localStorage.getItem('searchTerm');
    
    //"Insert" saved search term on the input
    inputRef.current.value = firstSearchTerm;
    
    // Set search term and call a search with the term
    setSearchTerm(firstSearchTerm);
    if (firstSearchTerm) onSearch(firstSearchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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