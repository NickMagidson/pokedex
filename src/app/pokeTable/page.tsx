import React from 'react';
import Image from 'next/image';

interface PokemonTableProps {
  name: string;
  url: string;
  stats: {
    base_stat: number;
  }[];
  sprites: {
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
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 justify-center items-center w-4/5 sm:items-start ">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Image</th>
                <th scope="col" className="px-6 py-3">HP</th>
                <th scope="col" className="px-6 py-3">Attack</th>
                <th scope="col" className="px-6 py-3">Defense</th>
              </tr>
            </thead>
            <tbody>
              {detailedPokemonList.map((pokemon) => (
                <tr key={pokemon.name} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {pokemon.name}
                  </th>
                  <td className="px-6 py-4">
                    <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={96} height={96} />
                  </td>
                  <td className="px-6 py-4">
                    {pokemon.stats[0].base_stat}
                  </td>
                  <td className="px-6 py-4">
                    {pokemon.stats[1].base_stat}
                  </td>
                  <td className="px-6 py-4">
                    {pokemon.stats[2].base_stat}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
