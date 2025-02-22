import PokemonDisplay from "./PokemonDisplay";

interface SinglePokemonProps {
  selectedPokemon: string;
}

export default async function SinglePokemon({ selectedPokemon }: SinglePokemonProps) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`);
  const singlePokemon = await response.json();

  return (
    <PokemonDisplay name={singlePokemon.name} sprite={singlePokemon.sprites.front_default} />
  );
}