


import React, { useState } from 'react';

interface GeocoderInputProps {
  onSearch: (location: string) => void;
}

const GeocoderInput: React.FC<GeocoderInputProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearch = () => {
    onSearch(searchValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
      <input
      style={{padding: '4px'}}
        type="text"
        placeholder="Search location"
        value={searchValue}
        onChange={handleInputChange}
      />
    <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        style={{
          marginLeft: '5px', 
          padding: '5px 10px', 
          color: 'white', 
          border: 'none', 
          borderRadius: '3px', 
          cursor: 'pointer', 
        }}
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default GeocoderInput;


