"use client"
import { useState, useEffect } from 'react';
import { usePokemon } from '../context/PokemonContext';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Image from 'next/image';

interface PokemonOption {
  name: string;
  id: number;
  sprite: string;
}

// interface SearchPokemonProps {
//   initialPokemon: PokemonOption[];
// }

export default function SearchPokemon() {
  const { selectedPokemon, setSelectedPokemon } = usePokemon();
  const [inputValue, setInputValue] = useState(selectedPokemon);
  const [options, setOptions] = useState<PokemonOption[]>([]);

  const router = useRouter()
  

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
            id: pokemonInfo.id,
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
      router.push(`/${newValue.id}`);
      // console.log(`Selected Pokémon: ${newValue.name}`);
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
      renderOption={(props, option) => {
        const { key, ...rest } = props;
        return (
          <li key={key} {...rest}>
            <Image
              src={option.sprite}
              alt={option.name}
              width={40}
              height={40}
              style={{ marginRight: 8 }}
            />
            {option.name}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} label="Search Pokémon!" />
      )}
    />
  );
}