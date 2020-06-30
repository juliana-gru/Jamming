import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this)
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      searchTerm: ''
    }    
  }

  search() {
    this.props.onSearch(this.state.searchTerm);
  }

  handleTermChange(event) {
    this.setState({
      searchTerm: event.target.value
    })
  }

  handleKeyDown(event) {
    if (event.keyCode !== 13) {
      return;
    }
    this.props.onSearch(this.state.searchTerm);
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" 
        onChange={this.handleTermChange} onKeyDown={this.handleKeyDown}/>
        <button className="SearchButton" onClick={this.search}>SEARCH</button>
      </div>
    )  
  }
  
}

export default SearchBar;