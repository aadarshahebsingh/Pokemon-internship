
import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search Pokémon..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-2 w-72 border rounded-xl shadow-sm text-black dark:text-white dark:bg-gray-700 outline-none"
    />
  );
};

export default SearchBar;
