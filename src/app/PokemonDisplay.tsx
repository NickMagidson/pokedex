"use client"

import Image from "next/image"

interface PokemonDisplayProps {
  name: string;
  sprite: string;
}

export default function PokemonDisplay({ name, sprite }: PokemonDisplayProps) {
  return (
    <div className="flex flex-col justify-center align-middle">
      <Image src={sprite} alt="Ditto" width={96} height={96} />
      <h1 className="text-center">{name}</h1>
    </div>
  )
}