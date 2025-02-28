// import React from 'react';
// import SearchPokemon from './SearchPokemon';

// async function fetchInitialPokemon() {
//   const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
//   const data = await response.json();
//   const pokemonData = await Promise.all(
//     data.results.map(async (pokemon: { url: string }) => {
//       const pokemonDetails = await fetch(pokemon.url);
//       const pokemonInfo = await pokemonDetails.json();
//       return {
//         name: pokemonInfo.name,
//         sprite: pokemonInfo.sprites.other['official-artwork'].front_default,
//       };
//     })
//   );
//   return pokemonData;
// }

// export default async function SearchPokemonServer() {
//   const initialPokemon = await fetchInitialPokemon();

//   return <SearchPokemon initialPokemon={initialPokemon} />;
// }