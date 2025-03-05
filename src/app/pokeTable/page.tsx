import React, { Suspense } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import PokemonCardList from './PokemonCardList';
// import SearchPokemonServer from '../SearchPokemonServer';
import SearchPokemon from '../SearchPokemon';

// const PokemonCardList = React.lazy(() => import('./PokemonCardList'));
// const SearchPokemon = React.lazy(() => import('../SearchPokemon'));


export default async function PokemonTable() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
  const pokemonData = await response.json();

  return (
    <>
      <Header />
      <Suspense fallback={<h1 style={{ fontSize: '2em', textAlign: 'center' }}>Loading...</h1>}>
        <SearchPokemon />
        <PokemonCardList pokemonList={pokemonData} />  
      </Suspense>
      <Footer />
    </>
  );
}
