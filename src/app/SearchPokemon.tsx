"use client"
import { useState, useEffect } from 'react';
import { usePokemon } from '../context/PokemonContext';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface PokemonOption {
  name: string;
  order: number;
}

export default function SearchPokemon() {
  const { selectedPokemon, setSelectedPokemon } = usePokemon();
  const [inputValue, setInputValue] = useState(selectedPokemon);
  const [options, setOptions] = useState<PokemonOption[]>([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
      const data = await response.json();
      const pokemonData = await Promise.all(
        data.results.map(async (pokemon) => {
          const pokemonDetails = await fetch(pokemon.url);
          const pokemonInfo = await pokemonDetails.json();
          return {
            name: pokemonInfo.name,
            sprite: pokemonInfo.sprites.front_default,
          };
        })
      );
      setOptions(pokemonData);
    };
  
    fetchPokemon();
  }, []);
  

  const handleSearch = (event: React.SyntheticEvent<Element, Event>, value: string) => {
    setInputValue(value);
  };

  const handleSelect = (event: React.SyntheticEvent<Element, Event>, newValue: PokemonOption | null) => {
    if (newValue) {
      setSelectedPokemon(newValue.name);
    }
  };

  return (
    <Autocomplete
      disablePortal
      options={options}
      getOptionLabel={(option) => option.name}
      sx={{ width: 300, background: 'aliceblue' }}
      onInputChange={handleSearch}
      onChange={handleSelect}
      // renderOption={(props, option) => (
      //   <li {...props}>
      //     <img
      //       src={option.sprite}
      //       alt={option.name}
      //       style={{ marginRight: 8, width: 20, height: 20 }}
      //     />
      //     {option.name}
      //   </li>
      // )}
      renderInput={(params) => (
        <TextField {...params} label="Search Pokémon!" />
      )}
    />
  );
}