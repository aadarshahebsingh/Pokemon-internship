import React from "react";
import { motion } from "framer-motion";
import { Pokemon } from "../types/pokemon";

const PokemonCard: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  const getTypeAnimation = (type: string) => {
    switch (type) {
      case "fire":
        return "bg-gradient-to-r from-red-400 to-yellow-500 shadow-lg animate-pulse";
      case "water":
        return "bg-gradient-to-r from-blue-400 to-cyan-500 shadow-lg animate-wave"; 
      case "electric":
        return "bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg animate-bounce";
      case "grass":
        return "bg-gradient-to-r from-green-400 to-lime-500 shadow-lg animate-pulse";
      case "psychic":
        return "bg-gradient-to-r from-purple-400 to-pink-500 shadow-lg animate-shine";
      default:
        return "bg-gray-200 dark:bg-gray-700 shadow-md"; // Default for unknown types
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`rounded-2xl p-4 text-center transition-all duration-300 ${getTypeAnimation(
        pokemon.types[0]
      )}`}
    >
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="mx-auto mb-2 w-24 h-24"
      />
      <h2 className="text-lg font-bold capitalize">{pokemon.name}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">ID: {pokemon.id}</p>
      <div className="flex justify-center flex-wrap gap-2 mt-2">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className={`px-2 py-1 rounded-full text-xs capitalize ${getTypeAnimation(type)}`}
          >
            {type}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default PokemonCard;
