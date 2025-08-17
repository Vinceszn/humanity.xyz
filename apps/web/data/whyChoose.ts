export type WhyItem = {
  id: string;
  title: string;
  description: string;
  gradient: string; // tailwind gradient classes
};

export const WHY_CHOOSE: WhyItem[] = [
  {
    id: 'fast',
    title: 'Fast & Focused',
    description: '10 minutes. High-signal questions that respect your time.',
    gradient: 'from-indigo-50 via-white to-purple-50',
  },
  {
    id: 'research',
    title: 'Research-Backed',
    description: 'Grounded in validated personality frameworks and org psychology.',
    gradient: 'from-purple-50 via-white to-blue-50',
  },
  {
    id: 'team',
    title: 'Team-Oriented',
    description: 'See blends and collaboration patterns to reduce friction.',
    gradient: 'from-blue-50 via-white to-green-50',
  },
  {
    id: 'clear',
    title: 'Clear Insights',
    description: 'No jargon. Practical guidance you can apply immediately.',
    gradient: 'from-amber-50 via-white to-rose-50',
  },
  {
    id: 'privacy',
    title: 'Privacy-First',
    description: 'Minimal data, maximum control. Your results are yours.',
    gradient: 'from-slate-50 via-white to-sky-50',
  },
  {
    id: 'growth',
    title: 'Growth-Focused',
    description: 'Track changes over time and across contexts.',
    gradient: 'from-emerald-50 via-white to-indigo-50',
  },
];

export default WHY_CHOOSE;
