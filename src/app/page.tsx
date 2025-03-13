import React, { Suspense } from 'react';
import Header from './Header';
import Footer from './Footer';
import PokemonCardList from './PokemonCardList'
import SearchPokemon from './SearchPokemon';

export default async function Home() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
  const pokemonData = await response.json();

  return (
    <>
      <Header />
      <Suspense fallback={<h1 style={{ fontSize: '2em', textAlign: 'center', fontWeight: 'bold', padding: '3rem' }}>Loading...</h1>}>
        <SearchPokemon />
        <PokemonCardList pokemonList={pokemonData} />  
      </Suspense>
      <Footer />
    </>
  );
}
