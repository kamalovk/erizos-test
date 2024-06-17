import React, { Component } from 'react';
import './style.css';

interface SearchBarProps {
  searchQuery: string;
  onSearch: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default class SearchBar extends Component<SearchBarProps> {
  render() {
    const { searchQuery, onSearch, onInputChange } = this.props;
    return (
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={onInputChange}
          placeholder="Search..."
        />
        <button onClick={onSearch}>Search</button>
      </div>
    );
  }
}
