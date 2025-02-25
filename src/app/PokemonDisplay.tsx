// src/app/PokemonDisplay.tsx
"use client"

import Image from "next/image"
import SearchPokemon from "./SearchPokemon";
import { usePokemon } from '../context/PokemonContext';
import { useEffect, useState } from 'react';

interface PokemonDisplayProps {
  name: string;
  sprite: string;
}

export default function PokemonDisplay({ name, sprite }: PokemonDisplayProps) {
  const { selectedPokemon } = usePokemon();
  const [pokemonData, setPokemonData] = useState({ name, sprite });

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`);
      const data = await response.json();
      // console.log(JSON.stringify(data.sprites.other.['official-artwork'].front_default));
      setPokemonData({ name: data.name, sprite: data.sprites.other['official-artwork'].front_default });
    };

    fetchPokemon();
  }, [selectedPokemon]);

  return (
    <>
      <div className="flex flex-col justify-center">
        <SearchPokemon />
        <div className="flex flex-col justify-center align-middle">
          <Image src={pokemonData.sprite} alt={pokemonData.name} width={100} height={100} className=" mx-auto" />
          <h1 className="text-center">{pokemonData.name}</h1>
        </div>
      </div>
    </>
  )
}