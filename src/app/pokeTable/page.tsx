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
// import SearchPokemon from '../SearchPokemon';
import * as motion from "motion/react-client"
import Footer from '../Footer';

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
      {/* <SearchPokemon /> */}
      <main className='p-3 mx-auto' style={{ maxWidth: '29rem' }}>
        <div 
          className="grid grid-cols-3 gap-4 row-start-2 justify-center items-center w-full p-3
          rounded-lg bg-white shadow-inner" 
          style={{ maxHeight: 'calc(100vh - 180px)', overflowY: 'auto', boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 4px inset, rgba(0, 0, 0, 0.65) 0px 2px 8px inset' }}
          >
          {detailedPokemonList.map((pokemon) => (
            <motion.div
            key={pokemon.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            variants={{
              visible: { opacity: 1, scale: 1 },
              hidden: { opacity: 0, scale: 0 }
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          >
            <Card className="flex flex-col justify-center w-auto shadow-md">
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
          </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
