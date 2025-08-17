import React from 'react';

interface ArchetypeCardProps {
  archetype: string;
  letter: string;
  score: number;
  description: string;
  isPrimary?: boolean;
  className?: string;
}

const ARCHETYPE_COLORS: Record<string, { primary: string; positive: string; shadow: string; meaning: string }> = {
  V: { primary: '#2A4D69', positive: '#2A4D69', shadow: '#1B2838', meaning: 'Wisdom, ambition, authority' },
  I: { primary: '#9B59B6', positive: '#9B59B6', shadow: '#6B3381', meaning: 'Imagination, empathy, idealism' },
  E: { primary: '#7F8C8D', positive: '#7F8C8D', shadow: '#56606A', meaning: 'Logic, structure, adaptability' },
  P: { primary: '#E67E22', positive: '#E67E22', shadow: '#B35413', meaning: 'Energy, sociability, motivation' },
  C: { primary: '#6E4B3A', positive: '#6E4B3A', shadow: '#4B321F', meaning: 'Stability, practicality, caution' },
  R: { primary: '#E74C3C', positive: '#E74C3C', shadow: '#962D22', meaning: 'Boldness, risk, independence' },
  S: { primary: '#1ABC9C', positive: '#1ABC9C', shadow: '#13685A', meaning: 'Empathy, harmony, diplomacy' },
  M: { primary: '#16A085', positive: '#16A085', shadow: '#0E5C43', meaning: 'Knowledge, logic, detachment' },
  L: { primary: '#27AE60', positive: '#27AE60', shadow: '#1A6B3F', meaning: 'Growth, drive, creation' },
  A: { primary: '#F1948A', positive: '#F1948A', shadow: '#B0635B', meaning: 'Peace, cooperation, sensitivity' },
};

const ArchetypeCard: React.FC<ArchetypeCardProps> = ({ 
  archetype, 
  letter, 
  score, 
  description, 
  isPrimary = false, 
  className = '' 
}) => {
  const color = ARCHETYPE_COLORS[letter] || ARCHETYPE_COLORS.A;
  const getScoreLevel = (score: number) => {
    if (score >= 80) return { level: 'Dominant' };
    if (score >= 60) return { level: 'Strong' };
    if (score >= 40) return { level: 'Moderate' };
    return { level: 'Emerging' };
  };

  const scoreLevel = getScoreLevel(score);

  return (
    <div className={`bg-white rounded-lg border shadow-sm p-6 transition-shadow hover:shadow-md ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold tracking-tight" style={{ color: color.primary }}>{archetype}</h3>
            {isPrimary && (
              <span className="inline-flex items-center rounded-md" style={{ background: color.primary, color: '#fff', padding: '0 8px', fontSize: '12px', fontWeight: 500 }}>Primary</span>
            )}
          </div>
          <div className="mt-1 text-sm text-gray-500">Type {letter}</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-semibold" style={{ color: color.primary }}>{Math.round(score)}</div>
          <div className="text-xs text-gray-500">Score</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Strength</span>
          <span className="font-medium">{scoreLevel.level}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="h-2 rounded-full transition-all" style={{ width: `${score}%`, background: color.primary }} />
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-700 leading-relaxed">
        {description}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        {getKeyTraits(letter).map((trait, index) => (
          <div key={index} className="rounded border bg-gray-50 px-2 py-1 text-gray-700 text-center">
            {trait}
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs text-gray-500">{color.meaning}</div>
    </div>
  );
};

// Helper function to get key traits for each archetype
const getKeyTraits = (letter: string): string[] => {
  const traits = {
    V: ['Visionary', 'Inspiring', 'Strategic', 'Future-focused'],
    I: ['Creative', 'Optimistic', 'Imaginative', 'Idealistic'],
    E: ['Structured', 'Flexible', 'Systematic', 'Adaptive'],
    P: ['Leadership', 'Results-driven', 'Organized', 'Goal-oriented'],
    C: ['Practical', 'Realistic', 'Grounded', 'Analytical'],
    R: ['Independent', 'Risk-taking', 'Innovative', 'Challenging'],
    S: ['Collaborative', 'Harmonious', 'Supportive', 'Connecting'],
    M: ['Wise', 'Insightful', 'Knowledgeable', 'Thoughtful'],
    L: ['Reliable', 'Consistent', 'Dependable', 'Methodical'],
    A: ['Balanced', 'Adaptive', 'Diplomatic', 'Stabilizing']
  };
  
  return traits[letter as keyof typeof traits] || ['Insightful', 'Adaptive', 'Focused', 'Pragmatic'];
};

export default ArchetypeCard;
