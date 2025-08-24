import { useState } from 'react';
import ArchetypeLayout from '../../components/archetypes/ArchetypeLayout';
import ArchetypeTabs from '../../components/archetypes/ArchetypeTabs';

export default function BuilderPage() {
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
    { name: 'Drive', value: 94, color: '#27AE60' },
    { name: 'Execution Speed', value: 92, color: '#2ebf6a' },
    { name: 'Adaptability', value: 82, color: '#4cc37f' },
    { name: 'Strategic Patience', value: 48, color: '#7fd7a4' },
    { name: 'Empathy', value: 55, color: '#a6e4c1' },
    { name: 'Detail Discipline', value: 60, color: '#c8eed9' }
  ];

  const quickInsights = [
    { title: 'Strength', value: 'Relentless action' },
    { title: 'Growth Edge', value: 'Pacing & delegation' },
    { title: 'Motivation', value: 'Visible progress' },
    { title: 'Challenge', value: 'Impatience' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 archetype-page">
      <ArchetypeLayout
        title="Builder"
        type="L"
        subtitle="Purpose-Driven Creator | Relentless Executor"
        color="#27AE60"
        essenceText="Momentum-focused catalyst turning nascent ideas into tangible traction through decisive action."
        traits={traits}
        quickInsights={quickInsights}
      />

      <ArchetypeTabs tabs={tabs} active={activeTab} onChange={setActiveTab} color="#27AE60" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#27AE60' }}>The Builder Archetype</h2>
              <div className="prose max-w-none text-gray-700 text-lg leading-relaxed">
                <p>The Builder supplies kinetic force—compressing ideation into shipped artifacts and early traction.</p>
                <p>High urgency fuels compounding iteration. They bias toward shipping over polishing and momentum over theoretical completeness.</p>
                <p>Shadow emerges as haste-driven oversight, relational abrasion, or burnout loops.</p>
              </div>
            </section>
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#27AE60' }}>Operating Mantra</h3>
              <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl p-6 text-white text-center">
                <blockquote className="text-xl italic font-medium">"Ship → Learn → Refine—velocity compounds value."</blockquote>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'traits' && (
          <section className="bg-white rounded-2xl shadow-lg p-8 space-y-10">
            <h2 className="text-3xl font-bold" style={{ color: '#27AE60' }}>Core Traits</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                ['Mission-Focused','Purpose lens filters priorities'],
                ['Bold & Energetic','Initiates before inertia forms'],
                ['Results-Oriented','Optimizes for shipped deltas'],
                ['Adaptive','Pivots fast when signal shifts'],
                ['Momentum Amplifier','Stokes team activation'],
                ['Impatience Risk','Pushes past healthy pacing']
              ].map(([title, text]) => (
                <div key={title} className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-3 text-lg">{title}</h3>
                  <p className="text-green-800 text-sm">{text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'strengths' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-8" style={{ color: '#27AE60' }}>Strengths & Shadow</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-green-700">Strengths</h3>
                  <ul className="space-y-3 text-green-800 text-sm">
                    {[
                      ['Rapid Execution','Transforms intent into artifacts'],
                      ['Relentless Drive','Sustains high action throughput'],
                      ['Resourceful','Creates paths through constraint'],
                      ['Growth-Oriented','Continuously scales impact'],
                      ['Resilient','Rebounds after setbacks quickly']
                    ].map(([t,d]) => (
                      <li key={t} className="flex items-start"><span className="mr-2 mt-2 w-2 h-2 bg-green-600 rounded-full inline-block" /><span><strong>{t}:</strong> {d}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-red-700">Shadow</h3>
                  <ul className="space-y-3 text-red-800 text-sm">
                    {[
                      ['Impatience','Skips depth & validation steps'],
                      ['People Oversight','Relational signals missed'],
                      ['Impulse Reactivity','Acts before full scan'],
                      ['Bureaucracy Friction','Low tolerance for process'],
                      ['Burnout Risk','Over-extends energy reserves']
                    ].map(([t,d]) => (
                      <li key={t} className="flex items-start"><span className="mr-2 mt-2 w-2 h-2 bg-red-600 rounded-full inline-block" /><span><strong>{t}:</strong> {d}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'work' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#27AE60' }}>Work & Relationships</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="font-semibold text-green-900 mb-3">Professional Arena</h3>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>Thrives in startups & scaling environments</li>
                    <li>Ideal for zero-to-one and growth mandates</li>
                    <li>Drives sprint cadence & unblock cycles</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 rounded-lg p-6">
                  <h3 className="font-semibold text-emerald-900 mb-3">Relational Patterns</h3>
                  <ul className="space-y-2 text-sm text-emerald-800">
                    <li>Expects directness & personal ownership</li>
                    <li>Benefits from partners pacing energy</li>
                    <li>May need reminders to celebrate</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'growth' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#27AE60' }}>Growth & Path</h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                {[
                  ['Pace Calibration','Insert deliberate pause between idea and commit'],
                  ['Delegation Reps','Transfer ownership earlier'],
                  ['Empathy Checkpoints','Weekly stakeholder temperature scan'],
                  ['Process Appreciation','Adopt minimal structure scaffolds'],
                  ['Recovery Rhythm','Schedule non-negotiable recharge'],
                  ['Reflection Loop','Monthly review of misfires & wins']
                ].map(([title,text]) => (
                  <div key={title} className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-1">{title}</h4>
                    <p className="text-green-800 text-xs leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'communication' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#27AE60' }}>Communication</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-green-900 mb-3">Effective Style</h3>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>Direct, outcome-focused updates</li>
                    <li>Progress metrics & blockers</li>
                    <li>Action-aligned proposals</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-green-900 mb-3">Pitfalls</h3>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>Compressed context sharing</li>
                    <li>Impatient interruption patterns</li>
                    <li>Under-signaling appreciation</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'compatibility' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#27AE60' }}>Compatibility</h2>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Synergy</h3>
                  <p className="text-green-800 mb-2">Momentum reinforcement</p>
                  <div className="text-xs text-green-700 space-x-1">
                    <span className="bg-green-100 px-2 py-1 rounded">Architect</span>
                    <span className="bg-green-100 px-2 py-1 rounded">Realist</span>
                    <span className="bg-green-100 px-2 py-1 rounded">Catalyst</span>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-900 mb-2">Complement</h3>
                  <p className="text-yellow-800 mb-2">Adds reflection & nuance</p>
                  <div className="text-xs text-yellow-700 space-x-1">
                    <span className="bg-yellow-100 px-2 py-1 rounded">Harmonizer</span>
                    <span className="bg-yellow-100 px-2 py-1 rounded">Sage</span>
                    <span className="bg-yellow-100 px-2 py-1 rounded">Dreamer</span>
                  </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 mb-2">Friction</h3>
                  <p className="text-red-800 mb-2">Pace / patience gaps</p>
                  <div className="text-xs text-red-700 space-x-1">
                    <span className="bg-red-100 px-2 py-1 rounded">Connector</span>
                    <span className="bg-red-100 px-2 py-1 rounded">Visionary</span>
                    <span className="bg-red-100 px-2 py-1 rounded">Maverick</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'values' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#27AE60' }}>Values & Philosophy</h2>
              <ul className="space-y-3 text-gray-700 text-sm">
                {[
                  ['Bias to Action','Learning velocity compounds advantage'],
                  ['Tangible Impact','Progress must materialize'],
                  ['Ownership','Accountability fuels trust'],
                  ['Iterative Refinement','Ship small, improve fast'],
                  ['Resilience','Setbacks = data, not defeat']
                ].map(([title,text]) => (
                  <li key={title} className="flex items-start"><span className="mr-2 mt-2 w-2 h-2 bg-green-600 rounded-full inline-block" /><span><strong>{title}:</strong> {text}</span></li>
                ))}
              </ul>
              <div className="mt-8 bg-green-50 border-l-4 border-green-600 rounded-lg p-6">
                <p className="text-green-900 mb-4 font-medium">Self-Assessment Prompts</p>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-green-800">
                  {[
                    'Do you feel restless when plans stall?',
                    'Do you default to shipping over theorizing?',
                    'Do you push pace beyond team capacity?',
                    'Do you equate progress only with output?',
                    'Do you skip celebration for next sprint?',
                    'Do you ignore early fatigue signs?'
                  ].map(q => (
                    <div key={q} className="flex items-start"><span className="mt-2 mr-2 w-1.5 h-1.5 bg-green-600 rounded-full inline-block" />{q}</div>
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

