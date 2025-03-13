import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PokemonStats from '../PokemonStats';
import { getTypeColor, getTypeTitleColor } from '../utils/pokemonUtils';


type Params = Promise<{ id: number }>;

export default async function PokemonDetail(props: { params: Params }) {
  const { id } = await props.params;
  
  try {
    const [pokemonRes, speciesRes] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    ]);

    if (!pokemonRes.ok || !speciesRes.ok) {
      return <h1 className="text-center text-2xl font-bold text-red-500">Pokémon not found</h1>;
    }

    const pokemon = await pokemonRes.json();
    const speciesData = await speciesRes.json();

    const flavorTextEntry = speciesData.flavor_text_entries.find((entry: { language: { name: string }, flavor_text: string }) => entry.language.name === 'en');
    const flavorText = flavorTextEntry ? flavorTextEntry.flavor_text.replace(/\f/g, ' ') : 'No flavor text available';

    return (
      <>
        <div style={{ height: '100vh', background: `${getTypeColor(pokemon.types[0].type.name)}` }}>
        {/* Header */}
        <header className="flex justify-between items-center p-3 w-full">
          <div className='flex flex-row items-center gap-3'>
          <Link href="/" className="flex items-center gap-3">
            <Image src="/arrow_back.png" alt="Back" width={30} height={30} />
          </Link>
          <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
          </div>

          <p className="font-bold"># {pokemon.id}</p>
        </header>

        {/* Pokémon Image */}
        <div className="text-center h-48">
          <Image 
            src={pokemon.sprites.other['official-artwork'].front_default} 
            alt={pokemon.name} 
            width={230} 
            height={200} 
            className="mx-auto relative top-4 "
          />
        </div>

        {/* Info Card */}
        <div className="p-4 mx-auto rounded-lg mt-1 bg-white shadow-inner overflow-y-auto" style={{ height: '26.2rem', width: '98%' }}>
          
          {/* Types */}
          <div className="flex justify-center gap-2 mt-2">
            {pokemon.types.map((type: { type: { name: string } }) => (
              <span   
                key={type.type.name} 
                className={`capitalize text-xs px-3 py-1 font-bold text-white rounded-full ${getTypeColor(type.type.name)}`}
              >
                {type.type.name}
              </span>
            ))}
          </div>

          {/* About Section */}
            <h3 className="text-center font-bold mt-4" style={getTypeTitleColor(pokemon.types[0].type.name)}>About</h3>

          <div className="flex justify-between py-3 border-t-2 border-b-2 mt-4">
            {/* Weight */}
            <div className="flex flex-col items-center flex-1">
              <div className="flex items-center gap-2">
                <Image src="/weight.png" alt="Weight" width={18} height={18} />
                <p className='text-black text-sm'>{pokemon.weight / 10} kg</p>
              </div>
              <p className="text-xs text-gray-500">Weight</p>
            </div>

            {/* Height */}
            <div className="border-x-2 px-4 flex flex-col items-center">
              <div className="flex items-center gap-2">
                <Image src="/height.png" alt="Height" width={18} height={18} />
                <p className='text-black text-sm'>{pokemon.height / 10} m</p>
              </div>
              <p className="text-xs text-gray-500">Height</p>
            </div>

            {/* Moves Placeholder */}
            <div className="flex flex-col items-center flex-1">
              <p className='text-sm'>Choose a move</p>
              <p className="text-sm text-gray-500">Moves</p>
            </div>
          </div>

          {/* Flavor Text */}
          <div className="p-4">
            <p className="text-xs text-black">{flavorText}</p>
          </div>

          {/* Base Stats Section */}
          <h3 className={`text-center font-bold mt-3`} style={getTypeTitleColor(pokemon.types[0].type.name)}>Base Stats</h3>
          <PokemonStats stats={pokemon.stats} primaryType={pokemon.types[0].type.name} />
        </div>
        </div>
      </>
    );
  } catch {
    return <h1 className="text-center text-2xl font-bold text-red-500">Error fetching Pokémon data</h1>;
  }
}
