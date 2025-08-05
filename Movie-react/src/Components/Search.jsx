import React from 'react';

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div>
        <img src='search.png' alt='search'></img>
          <input type='text' placeholder='Manu Loves Krish' 
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}

          ></input>
          
          
      </div>
    </div>
  );
};

export default Search;