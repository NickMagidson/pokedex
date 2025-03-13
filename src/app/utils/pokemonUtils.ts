export const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    fire: '#F57D31',     // Fire
    water: '#6493EB',    // Water
    grass: '#74CB48',    // Grass
    electric: '#F9CF30', // Electric
    ice: '#9AD6DF',      // Ice
    fighting: '#C12239', // Fighting
    poison: '#A43E9E',   // Poison
    ground: '#DEC16B',   // Ground
    flying: '#A891EC',   // Flying
    psychic: '#FB5584',  // Psychic
    bug: '#A7B723',      // Bug
    rock: '#B69E31',     // Rock
    ghost: '#70559B',    // Ghost
    dragon: '#7037FF',   // Dragon
    dark: '#75574C',     // Dark
    steel: '#B7B9D0',    // Steel
    fairy: '#E69EAC',    // Fairy
  };
  return colors[type.toLowerCase()] || '#75574C'; // Default to Dark type color
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

