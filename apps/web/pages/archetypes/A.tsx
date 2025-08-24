import { useState } from 'react';
import ArchetypeLayout from '../../components/archetypes/ArchetypeLayout';
import ArchetypeTabs from '../../components/archetypes/ArchetypeTabs';

export default function HarmonizerPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'traits', label: 'Core Traits' },
    { id: 'strengths', label: 'Strengths & Shadow' },
    { id: 'work', label: 'Work & Relationships' },
    { id: 'growth', label: 'Growth & Path' },
    { id: 'communication', label: 'Communication' },
    { id: 'compatibility', label: 'Compatibility' }, // Added compatibility tab
    { id: 'values', label: 'Values & Philosophy' }
  ];

  const traits = [
    { name: 'Empathy', value: 92, color: '#F1948A' },
    { name: 'Diplomacy', value: 88, color: '#e57373' },
    { name: 'Adaptability', value: 80, color: '#ef9a9a' },
    { name: 'Conflict Aversion', value: 70, color: '#c62828' },
    { name: 'Boundary Setting', value: 45, color: '#ef5350' },
    { name: 'Decisiveness', value: 40, color: '#ff8a80' }
  ];

  const quickInsights = [
    { title: 'Strength', value: 'Creating harmony' },
    { title: 'Growth Edge', value: 'Assertiveness' },
    { title: 'Motivation', value: 'Emotional balance' },
    { title: 'Challenge', value: 'Avoiding conflict' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-rose-100 archetype-page">
      <ArchetypeLayout
        title="Harmonizer"
        type="A"
        subtitle="Diplomatic Peacemaker | Collaborative Stabilizer"
        color="#F1948A"
        essenceText="Empathetic bridge-builder who maintains emotional equilibrium and fosters inclusive collaboration."
        traits={traits}
        quickInsights={quickInsights}
      />

      <ArchetypeTabs tabs={tabs} active={activeTab} onChange={setActiveTab} color="#F1948A" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{color:'#F1948A'}}>The Harmonizer Archetype</h2>
              <div className="prose max-w-none text-gray-700 text-lg leading-relaxed">
                <p className="mb-6">Harmonizers are the <strong>emotional stabilizers and relationship weavers</strong> of any group. They sense tension early, nurture inclusion, and help conflicting energies find balance.</p>
                <p className="mb-6">Unlike Controllers or Drivers who move forcefully toward outcomes, Harmonizers optimize the <strong>relational field</strong>. They know progress built without trust and emotional safety rarely sustains. They diffuse friction, mediate egos, and help others feel seen.</p>
                <p>Yet their gift for smoothing can morph into avoidance. The same instinct to protect peace can delay hard conversations or suppress their own needs—creating quiet resentment or burnout.</p>
              </div>
            </section>
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6" style={{color:'#F1948A'}}>Daily Mantra</h3>
              <div className="bg-gradient-to-r from-rose-400 to-rose-500 rounded-xl p-6 text-white text-center">
                <blockquote className="text-xl italic font-medium">"My calm presence creates space for truth. Harmony includes honesty—including my own needs."</blockquote>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'traits' && (
          <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{color:'#F1948A'}}>Core Traits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[ 
                  ['Harmony-Seeking','Strives to maintain emotional and relational balance.'],
                  ['Diplomatic','Reads tone, timing, and social nuance with skill.'],
                  ['Flexible & Adaptable','Shifts approach to fit dynamics and personalities.'],
                  ['Emotionally Attuned','Highly sensitive to others\' internal states.'],
                  ['Stabilizing Presence','Grounds groups during tension.'],
                  ['Conflict-Averse','Prefers prevention and smoothing over confrontation.']
                ].map(([title, text]) => (
                  <div key={title} className="bg-rose-50 border-l-4 border-rose-500 p-6 rounded-lg">
                    <h3 className="font-semibold text-rose-900 mb-3 text-lg">{title}</h3>
                    <p className="text-rose-800 text-sm">{text}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6" style={{color:'#F1948A'}}>Behavioral Patterns</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  ['Mediates Early','Intervenes before tension escalates'],
                  ['Reads the Room','Tracks tone shifts others miss'],
                  ['Balances Voices','Invites quiet contributors in']
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
              <h2 className="text-3xl font-bold mb-8" style={{color:'#F1948A'}}>Strengths & Shadow Aspects</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-green-700">Core Strengths</h3>
                  <ul className="space-y-3 text-green-800">
                    {[
                      ['Relational Intelligence','Understands emotional subtleties and group currents'],
                      ['De-escalation','Defuses tension before rupture'],
                      ['Inclusive Facilitation','Ensures quieter perspectives surface'],
                      ['Trust Builder','Creates psychological safety quickly'],
                      ['Stability Anchor','Keeps energy regulated in volatile moments']
                    ].map(([title, text]) => (
                      <li key={title} className="flex items-start"><span className="mr-2 mt-2 w-2 h-2 bg-green-600 rounded-full inline-block" aria-hidden="true" /><span><strong>{title}:</strong> {text}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-red-700">Shadow Patterns</h3>
                  <ul className="space-y-3 text-red-800">
                    {[
                      ['Avoidant','Sidesteps necessary confrontation'],
                      ['Self-Silencing','Suppresses own needs to preserve peace'],
                      ['Energy Drain','Emotional caretaking leads to burnout'],
                      ['Over-Accommodation','Sustains unhealthy dynamics'],
                      ['Delayed Decisions','Waits for total consensus before acting']
                    ].map(([title, text]) => (
                      <li key={title} className="flex items-start"><span className="mr-2 mt-2 w-2 h-2 bg-red-600 rounded-full inline-block" aria-hidden="true" /><span><strong>{title}:</strong> {text}</span></li>
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
              <h2 className="text-3xl font-bold mb-6" style={{color:'#F1948A'}}>Work & Relationships</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-rose-50 rounded-lg p-6">
                  <h3 className="font-semibold text-rose-900 mb-3">Professional Strengths</h3>
                  <ul className="space-y-2 text-sm text-rose-800">
                    <li>Ideal in roles needing mediation or group cohesion</li>
                    <li>Excels in HR, coaching, facilitation, community ops</li>
                    <li>Stabilizes fast-moving or emotionally volatile teams</li>
                  </ul>
                </div>
                <div className="bg-pink-50 rounded-lg p-6">
                  <h3 className="font-semibold text-pink-900 mb-3">Relational Patterns</h3>
                  <ul className="space-y-2 text-sm text-pink-800">
                    <li>Seeks mutual respect and calm emotional tone</li>
                    <li>May internalize tension instead of voicing impact</li>
                    <li>Thrives with partners who encourage self-expression</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'growth' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{color:'#F1948A'}}>Growth & Path</h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                {[
                  ['Practice Boundaries','State limits early instead of after depletion'],
                  ['Scheduled Check-ins','Weekly reflection on unmet needs'],
                  ['Conflict Reframe','View tension as gateway to authenticity'],
                  ['Micro-Assertion Reps','1 small honest statement per day'],
                  ['Energy Budgeting','Cap emotional caretaking time intentionally']
                ].map(([title, text]) => (
                  <div key={title} className="bg-rose-50 rounded-lg p-4 border border-rose-200">
                    <h4 className="font-semibold text-rose-900 mb-1">{title}</h4>
                    <p className="text-rose-800 text-xs leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'communication' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{color:'#F1948A'}}>Communication</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-rose-900 mb-3">Preferred Style</h3>
                  <ul className="space-y-2 text-sm text-rose-800">
                    <li>Collaborative and tone-sensitive</li>
                    <li>Uses gentle phrasing to preserve rapport</li>
                    <li>Checks group emotional temperature</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-rose-900 mb-3">When Misaligned</h3>
                  <ul className="space-y-2 text-sm text-rose-800">
                    <li>May agree verbally while internally dissenting</li>
                    <li>Delays giving direct feedback</li>
                    <li>Over-edits self to avoid perceived friction</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'compatibility' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{color:'#F1948A'}}>Compatibility</h2>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">High Synergy</h3>
                  <p className="text-green-800 mb-2">Mutual reinforcement of relational stability</p>
                  <div className="text-xs text-green-700 space-y-1">
                    <div className="bg-green-100 inline-block px-2 py-1 rounded">Builder</div>
                    <div className="bg-green-100 inline-block px-2 py-1 rounded ml-1">Connector</div>
                    <div className="bg-green-100 inline-block px-2 py-1 rounded ml-1">Dreamer</div>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-900 mb-2">Complementary</h3>
                  <p className="text-yellow-800 mb-2">Blends emotional balance with drive or imagination</p>
                  <div className="text-xs text-yellow-700 space-y-1">
                    <div className="bg-yellow-100 inline-block px-2 py-1 rounded">Architect</div>
                    <div className="bg-yellow-100 inline-block px-2 py-1 rounded ml-1">Visionary</div>
                    <div className="bg-yellow-100 inline-block px-2 py-1 rounded ml-1">Sage</div>
                  </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 mb-2">Potential Friction</h3>
                  <p className="text-red-800 mb-2">Differences around pace, confrontation, or autonomy</p>
                  <div className="text-xs text-red-700 space-y-1">
                    <div className="bg-red-100 inline-block px-2 py-1 rounded">Maverick</div>
                    <div className="bg-red-100 inline-block px-2 py-1 rounded ml-1">Realist</div>
                    <div className="bg-red-100 inline-block px-2 py-1 rounded ml-1">Catalyst</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'values' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{color:'#F1948A'}}>Values & Philosophy</h2>
              <ul className="space-y-3 text-gray-700">
                {[
                  ['Authentic Peace','True harmony requires honest voice inclusion'],
                  ['Mutual Care','All parties’ needs matter—not just the loudest'],
                  ['Emotional Stewardship','Feelings signal relational health states'],
                  ['Steady Progress','Sustainable change beats rushed resolution']
                ].map(([title, text]) => (
                  <li key={title} className="flex items-start"><span className="mr-2 mt-2 w-2 h-2 bg-rose-500 rounded-full inline-block" aria-hidden="true" /><span><strong>{title}:</strong> {text}</span></li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
