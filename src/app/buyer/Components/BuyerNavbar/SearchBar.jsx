"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="flex w-96 absolute top-7 left-1/2 transform cardesbackground -translate-x-1/2 items-center text-color border-2 border-primary dark:border-white px-4 py-3 rounded-full">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="What do you want to learn?"
        className="cardesbackground outline-none w-96"
        aria-label="Search courses"
      />
      <FaSearch className="absolute right-5" size={27} />
    </div>
  );
};

export default SearchBar;
