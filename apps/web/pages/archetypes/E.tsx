import { useState } from 'react';
import ArchetypeLayout from '../../components/archetypes/ArchetypeLayout';
import ArchetypeTabs from '../../components/archetypes/ArchetypeTabs';

export default function ArchitectPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'traits', label: 'Core Traits' },
    { id: 'strengths', label: 'Strengths & Shadow' },
    { id: 'work', label: 'Work & Relationships' },
    { id: 'growth', label: 'Growth & Path' },
    { id: 'communication', label: 'Communication' },
    { id: 'compatibility', label: 'Compatibility' },
    { id: 'values', label: 'Values & Philosophy' }
  ];

  const traits = [
    { name: 'Systems Thinking', value: 94, color: '#0B3D91' },
    { name: 'Strategic Planning', value: 90, color: '#1565c0' },
    { name: 'Analytical Logic', value: 92, color: '#1976d2' },
    { name: 'Adaptability', value: 55, color: '#64b5f6' },
    { name: 'Emotional Expression', value: 45, color: '#ef5350' },
    { name: 'Risk Tolerance', value: 50, color: '#ffb300' }
  ];

  const quickInsights = [
    { title: 'Strength', value: 'System design' },
    { title: 'Growth Edge', value: 'Emotional openness' },
    { title: 'Motivation', value: 'Elegant structure' },
    { title: 'Challenge', value: 'Perfection delay' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 archetype-page">
      <ArchetypeLayout
        title="Architect"
        type="E"
        subtitle="Master Builder | Systematic Planner"
        color="#0B3D91"
        essenceText="Precision-minded system builder who converts complexity into enduring frameworks."
        traits={traits}
        quickInsights={quickInsights}
      />

      <ArchetypeTabs tabs={tabs} active={activeTab} onChange={setActiveTab} color="#0B3D91" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#0B3D91' }}>The Architect Archetype</h2>
              <div className="prose max-w-none text-gray-700 text-lg leading-relaxed">
                <p className="mb-6">Architects are <strong>design strategists</strong> who see patterns, systems, and scalable pathways where others see chaos. They optimize structure, interfaces, roles, and execution layers.</p>
                <p className="mb-6">Unlike improvisational archetypes, they blend foresight + rigor: mapping dependencies, anticipating failure modes, and embedding resilience. Their gift: turning ambiguity into coherent architecture.</p>
                <p>Shadow emerges as over-optimization, emotional detachment, or analysis paralysis that delays momentum or human connection.</p>
              </div>
            </section>
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#0B3D91' }}>Daily Mantra</h3>
              <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-xl p-6 text-white text-center">
                <blockquote className="text-xl italic font-medium">"I build clarity from complexity—and remember that people are part of every system."</blockquote>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'traits' && (
          <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#0B3D91' }}>Core Traits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  ['Systematic Thinker', 'Breaks complexity into modular components.'],
                  ['Strategic Planner', 'Simulates long-range impacts early.'],
                  ['Analytical', 'Anchors decisions in logic + data.'],
                  ['Structured Creative', 'Innovates inside constraints.'],
                  ['Precision Driven', 'Pursues clean, durable solutions.'],
                  ['Process Refiner', 'Iteratively improves efficiency.']
                ].map(([title, text]) => (
                  <div key={title} className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-3 text-lg">{title}</h3>
                    <p className="text-blue-800 text-sm">{text}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#0B3D91' }}>Behavioral Patterns</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  ['Blueprint First', 'Designs frameworks before scaling'],
                  ['Dependency Mapping', 'Charts flows & interfaces'],
                  ['Iterative Refinement', 'Continuously optimizes structure']
                ].map(([title, desc]) => (
                  <div key={title} className="text-center p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">{title}</h4>
                    <p className="text-sm text-gray-600">{desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'strengths' && (
          <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-8" style={{ color: '#0B3D91' }}>Strengths & Shadow Aspects</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-green-700">Core Strengths</h3>
                  <ul className="space-y-3 text-green-800">
                    {[
                      ['Complexity Mastery', 'Holds multi-layered architecture coherently'],
                      ['Reliability', 'Executes with consistency and integrity'],
                      ['Translational Clarity', 'Makes complexity legible to others'],
                      ['Strategic Execution', 'Bridges long-term design and current ops'],
                      ['Adaptive Structuring', 'Refactors when evidence demands']
                    ].map(([title, text]) => (
                      <li key={title} className="flex items-start"><span className="mr-2 mt-2 w-2 h-2 bg-green-600 rounded-full inline-block" /><span><strong>{title}:</strong> {text}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-red-700">Shadow Patterns</h3>
                  <ul className="space-y-3 text-red-800">
                    {[
                      ['Perfection Drift', 'Refines past the point of marginal gain'],
                      ['Over-Control', 'Locks systems prematurely'],
                      ['Emotional Distance', 'Prioritizes logic over human signals'],
                      ['Risk Aversion', 'Avoids necessary experimentation'],
                      ['Rigidity', 'Resists emergent alternative models']
                    ].map(([title, text]) => (
                      <li key={title} className="flex items-start"><span className="mr-2 mt-2 w-2 h-2 bg-red-600 rounded-full inline-block" /><span><strong>{title}:</strong> {text}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'work' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#0B3D91' }}>Work & Relationships</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-3">Professional Strengths</h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>Excels in architecture, systems design, research strategy</li>
                    <li>Stabilizes scaling processes with structure</li>
                    <li>Identifies failure points before launch</li>
                  </ul>
                </div>
                <div className="bg-indigo-50 rounded-lg p-6">
                  <h3 className="font-semibold text-indigo-900 mb-3">Relational Dynamics</h3>
                  <ul className="space-y-2 text-sm text-indigo-800">
                    <li>Can appear distant while processing</li>
                    <li>Values clarity over emotional nuance</li>
                    <li>Thrives with partners who bring warmth + spontaneity</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'growth' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#0B3D91' }}>Growth & Path</h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                {[
                  ['Emotional Calibration', 'Name internal states before optimizing external ones'],
                  ['Release Perfect Timing', 'Ship v1 earlier; refactor later'],
                  ['Invite Feedback Loops', 'Human input improves structural elegance'],
                  ['Risk Reps', 'Run low-stakes experiments monthly'],
                  ['Context Switching Warmth', 'Add relational check-ins to technical meetings']
                ].map(([title, text]) => (
                  <div key={title} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-1">{title}</h4>
                    <p className="text-blue-800 text-xs leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'communication' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#0B3D91' }}>Communication</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-blue-900 mb-3">Preferred Style</h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>Structured, sequential articulation</li>
                    <li>Evidence-backed framing</li>
                    <li>Clarifying question cadence</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-3">When Misaligned</h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>Information overload via detail</li>
                    <li>Impatience with ambiguity</li>
                    <li>Appears dismissive of emotional context</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'compatibility' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#0B3D91' }}>Compatibility</h2>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Synergy</h3>
                  <p className="text-green-800 mb-2">Shared clarity + structure</p>
                  <div className="text-xs text-green-700 space-x-1">
                    <span className="bg-green-100 px-2 py-1 rounded">Visionary</span>
                    <span className="bg-green-100 px-2 py-1 rounded">Realist</span>
                    <span className="bg-green-100 px-2 py-1 rounded">Sage</span>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-900 mb-2">Complement</h3>
                  <p className="text-yellow-800 mb-2">Balance structure with energy</p>
                  <div className="text-xs text-yellow-700 space-x-1">
                    <span className="bg-yellow-100 px-2 py-1 rounded">Builder</span>
                    <span className="bg-yellow-100 px-2 py-1 rounded">Catalyst</span>
                    <span className="bg-yellow-100 px-2 py-1 rounded">Connector</span>
                  </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 mb-2">Friction</h3>
                  <p className="text-red-800 mb-2">Pace / structure mismatch</p>
                  <div className="text-xs text-red-700 space-x-1">
                    <span className="bg-red-100 px-2 py-1 rounded">Maverick</span>
                    <span className="bg-red-100 px-2 py-1 rounded">Dreamer</span>
                    <span className="bg-red-100 px-2 py-1 rounded">Harmonizer</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'values' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#0B3D91' }}>Values & Philosophy</h2>
              <ul className="space-y-3 text-gray-700">
                {[
                  ['Quality', 'Build for longevity & integrity'],
                  ['Precision', 'Care in detail reduces downstream waste'],
                  ['Logic', 'Sound reasoning as decision substrate'],
                  ['Structure', 'Order enables scalable collaboration'],
                  ['Iterative Improvement', 'Versioning > stagnation']
                ].map(([title, text]) => (
                  <li key={title} className="flex items-start"><span className="mr-2 mt-2 w-2 h-2 bg-blue-600 rounded-full inline-block" /><span><strong>{title}:</strong> {text}</span></li>
                ))}
              </ul>
              <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6">
                <p className="text-blue-900 mb-4 font-medium">Self-Assessment Prompts</p>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
                  {[
                    'Do you naturally model systems before acting?',
                    'Do inefficiencies bother you viscerally?',
                    'Do you refactor processes others ignore?',
                    'Do you document to enable scaling?',
                    'Do you simulate outcomes mentally first?',
                    'Do unfinished frameworks occupy mindshare?'
                  ].map(q => (
                    <div key={q} className="flex items-start"><span className="mt-2 mr-2 w-1.5 h-1.5 bg-blue-600 rounded-full inline-block" />{q}</div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
