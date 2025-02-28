import React, { Suspense } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import PokemonCardList from './PokemonCardList';
// import SearchPokemonServer from '../SearchPokemonServer';
import SearchPokemon from '../SearchPokemon';


export default async function PokemonTable() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
  const pokemonData = await response.json();

  return (
    <>
      <Header />
      <Suspense fallback={<h1 style={{ fontSize: '2em', textAlign: 'center' }}>Loading...</h1>}>
          <SearchPokemon />
          <PokemonCardList 
            pokemonList={pokemonData}
          />  
      </Suspense>
      <Footer />
    </>
  );
}
