import Header from '../../Header'

export default async function PokemonDetail(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
  if (!res.ok) return <h1>Pokémon not found</h1>;

  const pokemon = await res.json();

  return (
    <>
      <Header />
      <div className="p-6">
        <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
        <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} className="w-48 h-48" />
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
        <p>Base experience: {pokemon.base_experience}</p>
      </div>
    </>

  );
}
