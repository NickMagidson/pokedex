import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import Header from '../../Header'

const getTypeColor = (type: string) => {
  switch (type) {
    case 'fire':
      return 'red';
    case 'water':
      return 'blue';
    case 'grass':
      return 'green';
    case 'electric':
      return 'yellow';
    case 'ice':
      return 'cyan';
    case 'fighting':
      return 'brown';
    case 'poison':
      return 'purple';
    case 'ground':
      return 'sandybrown';
    case 'flying':
      return 'skyblue';
    case 'psychic':
      return 'pink';
    case 'bug':
      return 'limegreen';
    case 'rock':
      return 'gray';
    case 'ghost':
      return 'indigo';
    case 'dragon':
      return 'orange';
    case 'dark':
      return 'black';
    case 'steel':
      return 'silver';
    case 'fairy':
      return 'magenta';
    default:
      return 'black';
  }
};

export default async function PokemonDetail(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
  if (!res.ok) return <h1>Pokémon not found</h1>;

  const pokemon = await res.json();

    // Fetching the species data for the flavor text
    const speciesRes = await fetch(pokemon.species.url);
    const speciesData = await speciesRes.json();
  
    // Extracting the English flavor text
    const flavorTextEntry = speciesData.flavor_text_entries.find((entry: any) => entry.language.name === 'en');
    const flavorText = flavorTextEntry ? flavorTextEntry.flavor_text : 'No flavor text available';
  

  return (
    <>
      {/* <Header /> */}
      <header className='flex flex-row justify-between items-center gap-2 p-3 w-full'>
        <Link href="/" className='flex flex-row items-center gap-3'>
          <Image src="/arrow_back.png" alt="Back Arrow" width={30} height={30} />
        </Link>
        <h1 className='font-bold text-3xl capitalize'>{pokemon.name}</h1>
        <p className='font-bold mr-1 '># {pokemon.id}</p>
      </header>

      <div>


        <Image 
          src={pokemon.sprites.other['official-artwork'].front_default} 
          alt={pokemon.name} 
          className='mx-auto'
          width={200} 
          height={200} />

        <div 
          className="gap-5 flex-grow row-start-2 justify-center items-center w-11/12 p-3 mx-auto
          rounded-lg bg-white shadow-inner" 
          style={{ 
            boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 4px inset, rgba(0, 0, 0, 0.65) 0px 2px 8px inset' 
          }}
        >

          <div className='flex flex-row gap-2 justify-center'>
          {pokemon.types.map((type: { type: { name: string } }) => (
              <span 
                key={type.type.name} 
                className='capitalize text-xs px-3 py-1 font-bold text-white' 
                style={{ borderRadius: "9999px",  backgroundColor: getTypeColor(type.type.name) }}
              >
                {type.type.name} 
              </span>
            ))}
          </div>

            <h3 className='font-bold text-center' style={{ color: getTypeColor(pokemon.types[0].type.name) }}>About</h3>

            <div className="flex justify-between w-full py-3 border-t-2 border-b-2 mt-4">
              <div className="flex flex-col items-center flex-1 h-full pt-2">

                <div className='flex flex-row items-center gap-2'>
                  <Image src="/weight.png" alt="Weight" width={18} height={18} />
                  
                  <p className='text-black mt-auto'>{pokemon.weight / 10} kg</p> {/* weight in kilograms */}
                </div>
                <div className='h-2'></div>
                <p className="text-sm font-light text-gray-500">Weight</p>
              </div>
              <div className="border-x-2 px-4">

                <div className="flex flex-col items-center pt-2">

                  <div className='flex flex-row items-center gap-2'>
                    <Image src="/height.png" alt="Height" width={18} height={18} />
                    <p className='text-black mt-auto'>{pokemon.height / 10} m</p> {/* height in meters */}
                  </div>
                  <div className='h-2'></div>
                  <p className="text-sm font-light text-gray-500">Height</p>
                </div>
              </div>
              <div className="flex flex-col items-center flex-1">
                <p>Choose a move</p> {/* Placeholder for dropdown */}
                <p className="text-sm font-light text-gray-500">Moves</p>
              </div>
            </div>

            <div className='p-4'>
              <p className="text-xs font-normal text-black">{flavorText}</p>
            </div>

            <h3 className='font-bold text-center' style={{ color: getTypeColor(pokemon.types[0].type.name) }}>Base Stats</h3>


          {/* <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1> */}

          {/* <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Base experience: {pokemon.base_experience}</p> */}
        </div>
      </div>  


    </>
  
  );
}