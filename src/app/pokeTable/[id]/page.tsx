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

  return (
    <>
      {/* <Header /> */}
      <header className='flex flex-row justify-between items-center gap-2 p-3 w-full'>
        <Link href="/" className='flex flex-row items-center gap-3'>
          <Image src="/arrow_back.png" alt="Back Arrow" width={30} height={30} />
          <h1 className='font-bold text-3xl capitalize'>{pokemon.name}</h1>
        </Link>
        <p className='font-bold mr-1 '># {pokemon.id}</p>
      </header>

      <div className='px-2'>


        <Image 
          src={pokemon.sprites.other['official-artwork'].front_default} 
          alt={pokemon.name} 
          className='mx-auto'
          width={200} 
          height={200} />

        <div 
          className="gap-4 flex-grow row-start-2 justify-center items-center w-11/12 p-3 mx-auto
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




          {/* <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1> */}

          {/* <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Base experience: {pokemon.base_experience}</p> */}
        </div>
      </div>  


    </>
  
  );
}