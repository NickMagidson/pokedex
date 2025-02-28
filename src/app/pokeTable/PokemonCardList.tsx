import PokemonDisplayCard from './PokemonDisplayCard';

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

interface PokemonCardListProps {
  pokemonList: PokemonList;
}

export default async function PokemonCardList({ pokemonList }: PokemonCardListProps) {

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
    <main className='p-3 mx-auto' style={{ maxWidth: '29rem' }}>
    <div 
      className="grid grid-cols-3 gap-4 row-start-2 justify-center items-center w-full p-3
      rounded-lg bg-white shadow-inner" 
      style={{ 
        maxHeight: 'calc(100vh - 180px)', 
        overflowY: 'auto', 
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 4px inset, rgba(0, 0, 0, 0.65) 0px 2px 8px inset' 
      }}
      >
      {detailedPokemonList.map((pokemon) => (
        <PokemonDisplayCard
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          sprite={pokemon.sprites.other['official-artwork'].front_default} 
          altText={pokemon.name} 
        />
      ))}
    </div>
  </main>
  )
}