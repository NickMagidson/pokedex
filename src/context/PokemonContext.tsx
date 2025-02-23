"use client"

import { createContext, useContext, useState, ReactNode } from 'react';

interface PokemonContextProps {
  selectedPokemon: string;
  setSelectedPokemon: (pokemon: string) => void;
}

const PokemonContext = createContext<PokemonContextProps | undefined>(undefined);

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPokemon, setSelectedPokemon] = useState<string>('pikachu');

  return (
    <PokemonContext.Provider value={{ selectedPokemon, setSelectedPokemon }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
};
