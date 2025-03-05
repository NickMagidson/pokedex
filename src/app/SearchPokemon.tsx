"use client"
import { useState, useEffect } from 'react';
import { usePokemon } from '../context/PokemonContext';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface PokemonOption {
  name: string;
  order: number;
  sprite: string;
}

// interface SearchPokemonProps {
//   initialPokemon: PokemonOption[];
// }

export default function SearchPokemon() {
  const { selectedPokemon, setSelectedPokemon } = usePokemon();
  const [inputValue, setInputValue] = useState(selectedPokemon);
  const [options, setOptions] = useState<PokemonOption[]>([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
      const data = await response.json();
      const pokemonData = await Promise.all(
        data.results.map(async (pokemon: { url: string | URL | Request; }) => {
          const pokemonDetails = await fetch(pokemon.url);
          const pokemonInfo = await pokemonDetails.json();
          return {
            name: pokemonInfo.name,
            sprite: pokemonInfo.sprites.other['official-artwork'].front_default,
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
      console.log(`Selected Pokémon: ${newValue.name}`);
    }
  };

  return (
    <Autocomplete
      disablePortal
      options={options}
      inputValue={inputValue}
      getOptionLabel={(option) => option.name}
      sx={{ width: 300, background: 'aliceblue', marginInline: 'auto' }}
      onInputChange={handleSearch}
      onChange={handleSelect}
      className='rounded-lg'
      // renderOption={(props, option) => (
      //   <li {...props}>
      //     <img
      //       src={option.sprite}
      //       alt={option.name}
      //       style={{ marginRight: 8, width: 40, height: 40 }}
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