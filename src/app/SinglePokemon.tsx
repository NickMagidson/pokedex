import PokemonDisplay from "./PokemonDisplay";

// interface SinglePokemonProps {
//   selectedPokemon: string;
// }

export default async function SinglePokemon() {
  const selectedPokemon = "pikachu";
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`);
  const singlePokemon = await response.json();

  return (
    <PokemonDisplay 
      name={singlePokemon.name} 
      sprite={singlePokemon.sprites.other['official-artwork'].front_default} 
    />
  );
}