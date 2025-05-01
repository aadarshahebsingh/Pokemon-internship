
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Pokemon } from "./types/pokemon";
import PokemonCard from "./components/PokemonCard";
import SearchBar from "./components/SearchBar";
import FilterDropdown from "./components/FilterDropdown";
import "./index.css";

const App: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const data = await response.json();
        const promises = data.results.map(async (p: any) => {
          const res = await fetch(p.url);
          return res.json();
        });
        const results = await Promise.all(promises);
        const formatted = results.map((poke) => ({
          id: poke.id,
          name: poke.name,
          image: poke.sprites.front_default,
          types: poke.types.map((t: any) => t.type.name),
        }));
        setPokemonList(formatted);
        setFilteredPokemon(formatted);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    let filtered = pokemonList;
    if (searchTerm) {
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (selectedType) {
      filtered = filtered.filter((p) => p.types.includes(selectedType));
    }
    setFilteredPokemon(filtered);
  }, [searchTerm, selectedType, pokemonList]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <header className="p-4 text-center text-3xl font-bold shadow-md bg-gradient-to-r from-blue-400 to-purple-500 dark:from-purple-800 dark:to-blue-800">
        Pokémon Explorer
      </header>
      <div className="flex flex-col md:flex-row gap-4 p-4 justify-center items-center">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <FilterDropdown value={selectedType} onChange={setSelectedType} />
      </div>
      {loading ? (
        <p className="text-center mt-20 text-xl">Loading Pokémon...</p>
      ) : filteredPokemon.length === 0 ? (
        <p className="text-center mt-20 text-xl">No Pokémon found.</p>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
        >
          {filteredPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default App;
