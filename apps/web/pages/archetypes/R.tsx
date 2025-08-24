import { useState } from 'react';
import ArchetypeLayout from '../../components/archetypes/ArchetypeLayout';
import ArchetypeTabs from '../../components/archetypes/ArchetypeTabs';

export default function MaverickPage() {
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
    { name: 'Boldness', value: 95, color: '#E74C3C' },
    { name: 'Independence', value: 92, color: '#f87171' },
    { name: 'Risk Appetite', value: 98, color: '#dc2626' },
    { name: 'Visionary Drive', value: 85, color: '#fb923c' },
    { name: 'Collaboration', value: 55, color: '#fcd34d' },
    { name: 'Consistency', value: 48, color: '#eab308' }
  ];

  const quickInsights = [
    { title: 'Strength', value: 'Disruptive drive' },
    { title: 'Growth Edge', value: 'Strategic patience' },
    { title: 'Motivation', value: 'Breaking limits' },
    { title: 'Challenge', value: 'Impulsivity' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-100 archetype-page">
      <ArchetypeLayout
        title="Maverick"
        type="R"
        subtitle="Bold Risk-Taker | Fearless Disruptor"
        color="#E74C3C"
        essenceText="Fearless catalyst who shatters stagnation and advances bold possibilities."
        traits={traits}
        quickInsights={quickInsights}
      />

      <ArchetypeTabs tabs={tabs} active={activeTab} onChange={setActiveTab} color="#E74C3C" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#E74C3C' }}>The Maverick Archetype</h2>
              <div className="prose max-w-none text-gray-700 text-lg leading-relaxed">
                <p>The Maverick is a fearless disruptor who thrives on autonomy, challenge, and rewriting assumptions. They resist conformity and ignite change through audacious experimentation and bold execution.</p>
                <p>They excel when stakes are high and the path unclear—but unchecked intensity can become volatility: impulsive pivots, frayed alliances, or burnout loops.</p>
                <p>Balanced well, their courage accelerates evolution for teams, products, and systems.</p>
              </div>
            </section>
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#E74C3C' }}>Daily Mantra</h3>
              <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-6 text-white text-center">
                <blockquote className="text-xl italic font-medium">"Bold moves build new realities—discipline makes them last."</blockquote>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'traits' && (
          <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#E74C3C' }}>Core Traits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  ['Fearlessly Bold', 'Challenges entrenched assumptions without hesitation.'],
                  ['Independent', 'Self-directed; resists unnecessary control.'],
                  ['Visionary Instinct', 'Spots disruptive openings early.'],
                  ['Action-Oriented', 'Prefers fast iteration over prolonged speculation.'],
                  ['Charismatic Rebel', 'Pulls others into ambitious momentum.']
                ].map(([title, text]) => (
                  <div key={title} className="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg">
                    <h3 className="font-semibold text-red-900 mb-3 text-lg">{title}</h3>
                    <p className="text-red-800 text-sm">{text}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#E74C3C' }}>Behavioral Patterns</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  ['High-Stakes Initiation', 'Jumps into ambiguous arenas early'],
                  ['Rule Bending', 'Questions process rigidity'],
                  ['Solo Surge', 'Accelerates independently when blocked']
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
              <h2 className="text-3xl font-bold mb-8" style={{ color: '#E74C3C' }}>Strengths & Shadow Aspects</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-green-700">Core Strengths</h3>
                  <ul className="space-y-3 text-green-800">
                    {[
                      ['Trailblazer', 'Catalyzes innovation by questioning defaults'],
                      ['Inspires Change', 'Courage energizes hesitant teams'],
                      ['Resilient', 'Rebounds rapidly after setbacks'],
                      ['Autonomous', 'Operates decisively without over-alignment'],
                      ['Creative Gambler', 'Leverages asymmetrical upside opportunities']
                    ].map(([title, text]) => (
                      <li key={title} className="flex items-start"><span className="mr-2 mt-2 w-2 h-2 bg-green-600 rounded-full inline-block" /><span><strong>{title}:</strong> {text}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-red-700">Shadow Patterns</h3>
                  <ul className="space-y-3 text-red-800">
                    {[
                      ['Impulsivity', 'Acts before validating downside risk'],
                      ['Rebellious Overdrive', 'Opposes structure even when useful'],
                      ['Inconsistency', 'Leaves partially finished initiatives'],
                      ['Isolation Loop', 'Avoids delegation; burns out'],
                      ['Authority Friction', 'Creates avoidable power conflicts']
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
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#E74C3C' }}>Work & Relationships</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 rounded-lg p-6">
                  <h3 className="font-semibold text-red-900 mb-3">Professional Life</h3>
                  <ul className="space-y-2 text-sm text-red-800">
                    <li>Thrives in high-volatility innovation arenas</li>
                    <li>Excels as founder, contrarian strategist, activist</li>
                    <li>Clashes with restrictive hierarchy</li>
                  </ul>
                </div>
                <div className="bg-orange-50 rounded-lg p-6">
                  <h3 className="font-semibold text-orange-900 mb-3">Relational Dynamics</h3>
                  <ul className="space-y-2 text-sm text-orange-800">
                    <li>Magnetic but unpredictable presence</li>
                    <li>Needs autonomy & mutual respect</li>
                    <li>Benefits from partners grounding pacing</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'growth' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#E74C3C' }}>Growth & Path</h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                {[
                  ['Balance Boldness', 'Pair decisive leaps with pre-mortem scans'],
                  ['Strategic Patience', 'Let compounding cycles finish'],
                  ['Channel Restlessness', 'Batch focus into 6–8 week pushes'],
                  ['Develop Humility', 'Seek dissent early—prevents waste'],
                  ['Harness Charisma', 'Convert momentum into durable coalitions'],
                  ['Stress Hygiene', 'Insert recovery after intense launch windows']
                ].map(([title, text]) => (
                  <div key={title} className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <h4 className="font-semibold text-red-900 mb-1">{title}</h4>
                    <p className="text-red-800 text-xs leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#E74C3C' }}>Stress Patterns</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-3">Triggers</h4>
                  <ul className="text-red-800 text-sm space-y-2">
                    <li>Bureaucratic drag</li>
                    <li>Micromanagement</li>
                    <li>Slow consensus cycles</li>
                    <li>Loss of autonomy</li>
                    <li>Repetitive admin work</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-3">Resets</h4>
                  <ul className="text-green-800 text-sm space-y-2">
                    <li>High-intensity physical outlet</li>
                    <li>Short solo strategic retreats</li>
                    <li>Mentor calibration call</li>
                    <li>Creative rapid prototype sprint</li>
                    <li>Mindfulness to slow impulse loops</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'communication' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#E74C3C' }}>Communication</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-red-900 mb-3">Effective Style</h3>
                  <ul className="space-y-2 text-sm text-red-800">
                    <li>High-energy framing</li>
                    <li>Direct challenge invites</li>
                    <li>Future-state storytelling</li>
                    <li>Momentum anchoring</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-red-900 mb-3">Pitfalls</h3>
                  <ul className="space-y-2 text-sm text-red-800">
                    <li>Overriding quieter signals</li>
                    <li>Conflating speed with clarity</li>
                    <li>Impulsive commitments</li>
                    <li>Dismissive tone under pressure</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 bg-red-50 border-l-4 border-red-600 rounded-lg p-6">
                <p className="text-red-900 mb-2 font-medium">Decision Path Snapshot</p>
                <ol className="list-decimal list-inside text-sm text-red-800 space-y-1">
                  <li>Instinct scan</li>
                  <li>Upside vs stagnation test</li>
                  <li>Launch micro version</li>
                  <li>Course-correct aggressively</li>
                </ol>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'compatibility' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#E74C3C' }}>Compatibility</h2>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Synergy</h3>
                  <p className="text-green-800 mb-2">Amplifies disruptive momentum</p>
                  <div className="text-xs text-green-700 space-x-1">
                    <span className="bg-green-100 px-2 py-1 rounded">Visionary</span>
                    <span className="bg-green-100 px-2 py-1 rounded">Catalyst</span>
                    <span className="bg-green-100 px-2 py-1 rounded">Builder</span>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-900 mb-2">Complement</h3>
                  <p className="text-yellow-800 mb-2">Adds grounding or nuance</p>
                  <div className="text-xs text-yellow-700 space-x-1">
                    <span className="bg-yellow-100 px-2 py-1 rounded">Dreamer</span>
                    <span className="bg-yellow-100 px-2 py-1 rounded">Connector</span>
                    <span className="bg-yellow-100 px-2 py-1 rounded">Sage</span>
                  </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 mb-2">Friction</h3>
                  <p className="text-red-800 mb-2">Control / pace tension</p>
                  <div className="text-xs text-red-700 space-x-1">
                    <span className="bg-red-100 px-2 py-1 rounded">Architect</span>
                    <span className="bg-red-100 px-2 py-1 rounded">Realist</span>
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
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#E74C3C' }}>Values & Philosophy</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-red-900 mb-3">Life Philosophy</h3>
                  <blockquote className="italic text-red-800 border-l-4 border-red-400 pl-4">"Fortune favors the bold—discipline sustains the impact."</blockquote>
                </div>
                <div>
                  <h3 className="font-semibold text-orange-900 mb-3">Core Values</h3>
                  <ul className="text-orange-800 space-y-1 text-sm">
                    <li><strong>Freedom</strong> – Self-directed motion</li>
                    <li><strong>Courage</strong> – Leaning into uncertainty</li>
                    <li><strong>Innovation</strong> – Re-architecting norms</li>
                    <li><strong>Authenticity</strong> – Unfiltered alignment</li>
                    <li><strong>Impact</strong> – Meaningful directional change</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 bg-red-50 border-l-4 border-red-600 rounded-lg p-6">
                <p className="text-red-900 mb-4 font-medium">Self-Assessment Prompts</p>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-red-800">
                  {[
                    'Do you seek asymmetrical upside moves?',
                    'Do rigid processes drain your energy?',
                    'Do you pivot quickly post-failure?',
                    'Do you prefer shipping over polishing?',
                    'Do you question unexamined consensus?',
                    'Do you feel restless without a frontier?'
                  ].map(q => (
                    <div key={q} className="flex items-start"><span className="mt-2 mr-2 w-1.5 h-1.5 bg-red-600 rounded-full inline-block" />{q}</div>
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
