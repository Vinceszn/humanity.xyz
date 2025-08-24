import { useState } from 'react';
import ArchetypeLayout from '../../components/archetypes/ArchetypeLayout';
import ArchetypeTabs from '../../components/archetypes/ArchetypeTabs';

export default function DreamerPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'traits', label: 'Core Traits' },
    { id: 'strengths', label: 'Strengths & Shadow' },
    { id: 'work', label: 'Work & Decision' },
    { id: 'stress', label: 'Stress Patterns' },
    { id: 'communication', label: 'Communication' },
    { id: 'compatibility', label: 'Compatibility' },
    { id: 'values', label: 'Values & Philosophy' }
  ];

  const traits = [
    { name: 'Imagination', value: 97, color: '#2D1F43' },
    { name: 'Abstract Synthesis', value: 94, color: '#463062' },
    { name: 'Intuition', value: 92, color: '#5b417c' },
    { name: 'Future Orientation', value: 90, color: '#7257a0' },
    { name: 'Execution Grounding', value: 45, color: '#a28bc7' },
    { name: 'Structure Discipline', value: 40, color: '#c6b5e3' }
  ];

  const quickInsights = [
    { title: 'Strength', value: 'Vision generation' },
    { title: 'Growth Edge', value: 'Translating to action' },
    { title: 'Motivation', value: 'Exploring possibility' },
    { title: 'Challenge', value: 'Focus & completion' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-violet-100 archetype-page">
      <ArchetypeLayout
        title="Dreamer"
        type="I"
        subtitle="Possibility Weaver | Vision Synthesist"
        color="#2D1F43"
        essenceText="Expands frontiers of meaning, weaving symbolic possibility into future architectures."
        traits={traits}
        quickInsights={quickInsights}
      />

      <ArchetypeTabs tabs={tabs} active={activeTab} onChange={setActiveTab} color="#2D1F43" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#2D1F43' }}>The Dreamer Archetype</h2>
              <div className="prose max-w-none text-gray-700 text-lg leading-relaxed">
                <p>The Dreamer inhabits conceptual space—mapping potentials, generating emergent frames, and protecting nascent ideas from premature reduction.</p>
                <p>They metabolize ambiguity into narrative scaffolds. Their presence ensures teams do not collapse the solution space too early.</p>
                <p>Shadow appears as infinite ideation loops, disconnection from resource reality, or retreat into symbolic refuge when pressured.</p>
              </div>
            </section>
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#2D1F43' }}>Guiding Mantra</h3>
              <div className="bg-gradient-to-r from-indigo-800 to-violet-700 rounded-xl p-6 text-white text-center">
                <blockquote className="text-xl italic font-medium">"Every structure lived first as an imagined field."</blockquote>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'traits' && (
            <section className="bg-white rounded-2xl shadow-lg p-8 space-y-10">
              <h2 className="text-3xl font-bold" style={{ color: '#2D1F43' }}>Core Traits & Patterns</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  ['Imaginative', 'Generates symbolic and metaphoric structures freely'],
                  ['Abstract Synthesizer', 'Links distant concepts into integrative models'],
                  ['Intuitive', 'Senses directional truth pre-articulation'],
                  ['Future-Oriented', 'Tracks emergent arcs before visible trend lines'],
                  ['Fluid & Adaptive', 'Re-frames identity & lens dynamically'],
                  ['Mythic Framing', 'Assigns archetypal narrative to raw events']
                ].map(([title, text]) => (
                  <div key={title} className="bg-indigo-50 border-l-4 border-indigo-700 p-6 rounded-lg">
                    <h3 className="font-semibold text-indigo-900 mb-3 text-lg">{title}</h3>
                    <p className="text-indigo-800 text-sm">{text}</p>
                  </div>
                ))}
              </div>
            </section>
        )}

        {activeTab === 'strengths' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-8" style={{ color: '#2D1F43' }}>Strengths & Shadow</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-green-700">Strengths</h3>
                  <ul className="space-y-3 text-green-800 text-sm">
                    {[
                      ['Vision Generator', 'Conjures vivid future scaffolds'],
                      ['Meaning Maker', 'Embeds symbolic relevance'],
                      ['Creative Innovator', 'Cross-pollinates domains'],
                      ['Intuitive Forecaster', 'Anticipates inflection points'],
                      ['Adaptive Thinker', 'Reframes with high plasticity']
                    ].map(([t, d]) => (
                      <li key={t} className="flex items-start"><span className="mr-2 mt-2 w-2 h-2 bg-green-600 rounded-full inline-block" /><span><strong>{t}:</strong> {d}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-red-700">Shadow</h3>
                  <ul className="space-y-3 text-red-800 text-sm">
                    {[
                      ['Execution Drift', 'Output lags ideation velocity'],
                      ['Abstraction Looping', 'Recursive conceptual spirals'],
                      ['Boundary Erosion', 'Actionable vs symbolic blurs'],
                      ['Over-Idealization', 'Filters out pragmatic friction'],
                      ['Delay Loops', 'Seeks perfect framing before start']
                    ].map(([t, d]) => (
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
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#2D1F43' }}>Work & Decision Patterns</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-indigo-50 rounded-lg p-6">
                  <h3 className="font-semibold text-indigo-900 mb-3">Decision Style</h3>
                  <ul className="space-y-2 text-sm text-indigo-800">
                    <li>Intuition-weighted convergence</li>
                    <li>Multiple scenario buffering</li>
                    <li>Symbolic coherence checks</li>
                  </ul>
                </div>
                <div className="bg-violet-50 rounded-lg p-6">
                  <h3 className="font-semibold text-violet-900 mb-3">Work Flow</h3>
                  <ul className="space-y-2 text-sm text-violet-800">
                    <li>Ideation bursts then reflective incubation</li>
                    <li>Non-linear synthesis blocks</li>
                    <li>Needs grounding partners for execution ramp</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'stress' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#2D1F43' }}>Stress & Overextension</h2>
              <ul className="space-y-3 text-gray-700 text-sm">
                {[
                  'Dissociative fantasy retreat',
                  'Infinite branching without commit',
                  'Emotional withdrawal under forced concreteness'
                ].map(item => (
                  <li key={item} className="flex items-start"><span className="mr-2 mt-2 w-1.5 h-1.5 bg-indigo-700 rounded-full inline-block" />{item}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {activeTab === 'communication' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#2D1F43' }}>Communication</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-indigo-900 mb-3">Effective Channels</h3>
                  <ul className="space-y-2 text-sm text-indigo-800">
                    <li>Metaphoric framing</li>
                    <li>Scenario exploration</li>
                    <li>Symbolic anchoring</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-indigo-900 mb-3">Pitfalls</h3>
                  <ul className="space-y-2 text-sm text-indigo-800">
                    <li>Over-abstracted responses</li>
                    <li>Deferring concreteness excessively</li>
                    <li>Ambiguity persistence when clarity needed</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'compatibility' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#2D1F43' }}>Compatibility</h2>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Synergy</h3>
                  <p className="text-green-800 mb-2">Amplifies conceptual emergence</p>
                  <div className="text-xs text-green-700 space-x-1">
                    <span className="bg-green-100 px-2 py-1 rounded">Visionary</span>
                    <span className="bg-green-100 px-2 py-1 rounded">Connector</span>
                    <span className="bg-green-100 px-2 py-1 rounded">Sage</span>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-900 mb-2">Complement</h3>
                  <p className="text-yellow-800 mb-2">Provides structure & grounding</p>
                  <div className="text-xs text-yellow-700 space-x-1">
                    <span className="bg-yellow-100 px-2 py-1 rounded">Builder</span>
                    <span className="bg-yellow-100 px-2 py-1 rounded">Architect</span>
                    <span className="bg-yellow-100 px-2 py-1 rounded">Realist</span>
                  </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 mb-2">Friction</h3>
                  <p className="text-red-800 mb-2">Compression or overcritique</p>
                  <div className="text-xs text-red-700 space-x-1">
                    <span className="bg-red-100 px-2 py-1 rounded">Maverick</span>
                    <span className="bg-red-100 px-2 py-1 rounded">Catalyst</span>
                    <span className="bg-red-100 px-2 py-1 rounded">Realist</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'values' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#2D1F43' }}>Values & Philosophy</h2>
              <ul className="space-y-3 text-gray-700 text-sm">
                {[
                  ['Imagination as Epistemic', 'Idea fields as legitimate information sources'],
                  ['Symbolic Literacy', 'Narrative + metaphor shape adoption'],
                  ['Possibility Preservation', 'Delay premature narrowing'],
                  ['Fluid Identity', 'Evolution over fixed persona'],
                  ['Wonder', 'A creative metabolic requirement']
                ].map(([title, text]) => (
                  <li key={title} className="flex items-start"><span className="mr-2 mt-2 w-2 h-2 bg-indigo-700 rounded-full inline-block" /><span><strong>{title}:</strong> {text}</span></li>
                ))}
              </ul>
              <div className="mt-8 bg-indigo-50 border-l-4 border-indigo-700 rounded-lg p-6">
                <p className="text-indigo-900 mb-4 font-medium">Self-Assessment Prompts</p>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-indigo-800">
                  {[
                    'Do you hold multiple futures in parallel?',
                    'Do ideas evolve faster than you can ship?',
                    'Do metaphors arrive before metrics?',
                    'Do you resist closing conceptual loops early?',
                    'Do you feel misunderstood when forced to simplify?',
                    'Do symbolic shifts energize you?'
                  ].map(q => (
                    <div key={q} className="flex items-start"><span className="mt-2 mr-2 w-1.5 h-1.5 bg-indigo-700 rounded-full inline-block" />{q}</div>
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
