import React from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Header from '../Header';

interface PokemonTableProps {
  id: number;
  name: string;
  url: string;
  stats: {
    base_stat: number;
  }[];
  sprites: {
    other: any;
    front_default: string;
  };
}

interface PokemonList {
  results: PokemonTableProps[];
}

// interface PokemonDetails {
//   name: string;
//   sprites: {
//     front_default: string;
//   };
// }


export default async function PokemonTable({}: PokemonTableProps) {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
  const pokemonList: PokemonList = await response.json();
  // console.log(pokemonList);
  // console.log(JSON.stringify(pokemonList.results));

  const detailedPokemonList = await Promise.all(
    pokemonList.results.map(async (pokemon) => {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData: PokemonTableProps = await pokemonResponse.json();
      // console.log(pokemonData);
      return pokemonData;
    })
  );

  return (
    <>
      <Header />
      <main className='p-3 mx-auto' style={{ maxWidth: '29rem' }}>
        <div className="grid grid-cols-3 gap-4 row-start-2 justify-center items-center w-full p-3 rounded-lg bg-white inset-shadow-sm" >
          {detailedPokemonList.map((pokemon) => (
            <Card key={pokemon.name} className="flex flex-col justify-center w-auto shadow-x">
              <CardHeader className='flex flex-row justify-end p-0 pt-1 pe-2'>
                <CardTitle className='font-thin'>{pokemon.id}</CardTitle>
              </CardHeader>
              <CardContent className='p-0'>
                <Image className='mx-auto pb-1' src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} width={70} height={70} />
                {/* <CardDescription>
                  <p>HP: {pokemon.stats[0].base_stat}</p>
                  <p>Attack: {pokemon.stats[1].base_stat}</p>
                  <p>Defense: {pokemon.stats[2].base_stat}</p>
                </CardDescription> */}
              </CardContent>
              <CardFooter className='p-0 pb-1 pt-1 rounded-lg bg-gray-100'>
                <CardTitle className='mx-auto font-normal'>{pokemon.name}</CardTitle>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}
