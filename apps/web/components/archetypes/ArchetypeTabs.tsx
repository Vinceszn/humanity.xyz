import React from 'react';

export interface ArchetypeTabDef { id: string; label: string; }

interface ArchetypeTabsProps {
  tabs: ArchetypeTabDef[];
  active: string;
  color?: string; // hex or tailwind color class base
  onChange: (id: string) => void;
}

const ArchetypeTabs: React.FC<ArchetypeTabsProps> = ({ tabs, active, onChange, color = '#2563eb' }) => {
  return (
    <div className="sticky top-0 bg-white shadow-md z-40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map(t => {
            const selected = t.id === active;
            return (
              <button
                key={t.id}
                onClick={() => onChange(t.id)}
                className={`flex items-center space-x-2 px-4 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 ${selected ? 'bg-opacity-10' : 'border-transparent hover:opacity-80'} `}
                style={selected ? { color, borderColor: color, backgroundColor: `${color}15` } : {}}
              >
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ArchetypeTabs;
