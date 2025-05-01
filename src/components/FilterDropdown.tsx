
import React from "react";

const types = ["", "fire", "water", "grass", "electric", "bug", "poison", "ground", "fairy", "fighting", "psychic", "rock", "ghost", "ice", "dragon"];

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const FilterDropdown: React.FC<Props> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-2 border rounded-xl shadow-sm text-black dark:text-white dark:bg-gray-700 outline-none"
    >
      <option value="">All Types</option>
      {types.map((type) => (
        <option key={type} value={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default FilterDropdown;
