"use client"
import { useState } from 'react';
import { usePokemon } from '../context/PokemonContext';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SearchPokemon() {
  const { selectedPokemon, setSelectedPokemon } = usePokemon();
  const [inputValue, setInputValue] = useState(selectedPokemon);

  const handleSearch = (e: { target: { value: string } }) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedPokemon(inputValue);
  }

  return (
    <form className='flex flex-row space-x-2' onSubmit={handleSubmit}>
      <Input onChange={handleSearch} type="text" placeholder="Search pokemon here!" value={inputValue} />
      <Button type="submit">Search</Button>
    </form>
  )
}