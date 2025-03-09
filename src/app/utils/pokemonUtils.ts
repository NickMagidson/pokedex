export const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    grass: 'bg-green-500',
    electric: 'bg-yellow-400',
    ice: 'bg-cyan-400',
    fighting: 'bg-orange-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-sky-400',
    psychic: 'bg-pink-500',
    bug: 'bg-lime-500',
    rock: 'bg-gray-600',
    ghost: 'bg-indigo-600',
    dragon: 'bg-orange-600',
    dark: 'bg-gray-900',
    steel: 'bg-gray-400',
    fairy: 'bg-pink-300',
  };
  return colors[type] || 'bg-gray-900';
};

export const getTypeTitleColor = (type: string) => {
  const colors: Record<string, string> = {
    fire: '#F87171', // red-500
    water: '#3B82F6', // blue-500
    grass: '#22C55E', // green-500
    electric: '#FACC15', // yellow-400
    ice: '#22D3EE', // cyan-400
    fighting: '#EA580C', // orange-700
    poison: '#A855F7', // purple-500
    ground: '#D97706', // yellow-600
    flying: '#38BDF8', // sky-400
    psychic: '#EC4899', // pink-500
    bug: '#84CC16', // lime-500
    rock: '#4B5563', // gray-600
    ghost: '#4F46E5', // indigo-600
    dragon: '#EA580C', // orange-600
    dark: '#111827', // gray-900
    steel: '#9CA3AF', // gray-400
    fairy: '#F9A8D4', // pink-300
  };
  return { color: colors[type] || '#111827' }; // default to gray-900
};

export const getStatAbbreviation = (statName: string) => {
  const abbreviations: Record<string, string> = {
    attack: 'ATK',
    defense: 'DEF',
    'special-attack': 'SATK',
    'special-defense': 'SDEF',
    speed: 'SPD',
    hp: 'HP',
  };
  return abbreviations[statName.toLowerCase()] || statName;
};

