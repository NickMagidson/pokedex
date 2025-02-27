"use client"
import { useState, useEffect } from 'react';
import { usePokemon } from '../context/PokemonContext';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SearchPokemon() {
  const { selectedPokemon, setSelectedPokemon } = usePokemon();
  const [inputValue, setInputValue] = useState(selectedPokemon);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    if (inputValue.length) {
      const fetchPokemon = async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
        const data = await response.json();
        const filteredOptions = data.results
          .filter((pokemon: { name: string }) => pokemon.name.includes(inputValue))
          .map((pokemon: { name: string }) => pokemon.name);
        setOptions(filteredOptions);
      };

      fetchPokemon();
    }
  }, [inputValue]);

  const handleSearch = (event: React.SyntheticEvent<Element, Event>, value: string) => {
    setInputValue(value);
  };

  const handleSelect = (event: any, newValue: string | null) => {
    if (newValue) {
      setSelectedPokemon(newValue);
    }
  };

  return (
    <Autocomplete
      disablePortal
      options={options}
      sx={{ width: 300, background: "aliceblue" }}
      onInputChange={handleSearch}
      onChange={handleSelect}
      renderInput={(params) => <TextField {...params} label="Search Pokémon" />}
    />
  );
}