import React from 'react';
import { getTypeColor, getStatAbbreviation } from './utils/pokemonUtils';

interface Stat {
  stat: { name: string };
  base_stat: number;
}

const MAX_STAT = 255;

export default function PokemonStats({ stats, primaryType }: { stats: Stat[]; primaryType: string }) {
  return (
    <div className="space-y-2 mt-4">
      {stats.map((stat) => (
        <div key={stat.stat.name} className="flex items-center">
          <span className="capitalize w-20 text-xs font-bold text-black">{getStatAbbreviation(stat.stat.name)}</span>
          <span className="w-10 text-center text-xs text-black">{stat.base_stat}</span>
          <div className="w-full h-2 bg-gray-200 rounded-lg overflow-hidden ml-2">
            <div 
              className={`h-full ${getTypeColor(primaryType)}`} 
              style={{ width: `${(stat.base_stat / MAX_STAT) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
