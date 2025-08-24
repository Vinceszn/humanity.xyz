import { useState } from 'react';
import ArchetypeLayout from '../../components/archetypes/ArchetypeLayout';
import ArchetypeTabs from '../../components/archetypes/ArchetypeTabs';

export default function CatalystPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'traits', label: 'Core Traits' },
    { id: 'strengths', label: 'Strengths & Shadow' },
    { id: 'work', label: 'Work & Relationships' },
    { id: 'growth', label: 'Growth & Path' },
    { id: 'communication', label: 'Communication' },
    { id: 'stress', label: 'Stress Patterns' },
    { id: 'compatibility', label: 'Compatibility' },
    { id: 'values', label: 'Values & Philosophy' }
  ];

  const traits = [
    { name: 'Social Energy', value: 95, color: '#FF6F3C' },
    { name: 'Persuasion', value: 90, color: '#ff824f' },
    { name: 'Adaptability', value: 82, color: '#ff905f' },
    { name: 'Momentum Focus', value: 88, color: '#ff9969' },
    { name: 'Strategic Patience', value: 48, color: '#ffb293' },
    { name: 'Process Discipline', value: 40, color: '#ffc7b2' }
  ];

  const quickInsights = [
    { title: 'Strength', value: 'Igniting movement' },
    { title: 'Growth Edge', value: 'Sustainable pacing' },
    { title: 'Motivation', value: 'Social impact' },
    { title: 'Challenge', value: 'Over-amplifying' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 archetype-page">
      <ArchetypeLayout
        title="Catalyst"
        type="P"
        subtitle="Electric Spark | Change Influencer"
        color="#FF6F3C"
        essenceText="Magnetic momentum-builder who mobilizes people, accelerates adoption, and energizes collective transformation."
        traits={traits}
        quickInsights={quickInsights}
      />

      <ArchetypeTabs tabs={tabs} active={activeTab} onChange={setActiveTab} color="#FF6F3C" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
            <div className="space-y-8">
              <section className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6" style={{color:'#FF6F3C'}}>The Catalyst Archetype</h2>
                <div className="prose max-w-none text-gray-700 text-lg leading-relaxed">
                  <p className="mb-6">Catalysts are <strong>social accelerators</strong>—they convert latent potential into coordinated action through charisma, timing, and emotional momentum.</p>
                  <p className="mb-6">Where others build or architect structure, the Catalyst <strong>activates energy</strong>. They convene, enroll, persuade, and amplify. Their radar for openings—audiences, moments, leverage points—lets them rapidly assemble coalitions and drive adoption.</p>
                  <p>The shadow emerges when velocity outruns grounding: over-promising, over-extending, or substituting influence for substance. Sustainable impact requires calibrated pacing and ethical anchoring.</p>
                </div>
              </section>
              <section className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6" style={{color:'#FF6F3C'}}>Daily Mantra</h3>
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white text-center">
                  <blockquote className="text-xl italic font-medium">"I mobilize energy with integrity. Momentum is most powerful when it is sustainable and shared."</blockquote>
                </div>
              </section>
            </div>
        )}

        {activeTab === 'traits' && (
          <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{color:'#FF6F3C'}}>Core Traits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  ['Social Dynamo','Generates and sustains collective energy flow.'],
                  ['Persuasive Charisma','Shapes narratives that people adopt willingly.'],
                  ['Adaptive Agility','Pivots strategy mid-flight without ego drag.'],
                  ['Vision Activation','Turns abstract potential into shared urgency.'],
                  ['Emotional Resonance','Mirrors and modulates group affect intentionally.']
                ].map(([title, text]) => (
                  <div key={title} className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg">
                    <h3 className="font-semibold text-orange-900 mb-3 text-lg">{title}</h3>
                    <p className="text-orange-800 text-sm">{text}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6" style={{color:'#FF6F3C'}}>Behavioral Patterns</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  ['Network Orchestration','Curates intros that unlock momentum'],
                  ['Momentum Seeding','Creates small visible wins early'],
                  ['Narrative Framing','Repackages complexity into rallying story']
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
              <h2 className="text-3xl font-bold mb-8" style={{color:'#FF6F3C'}}>Strengths & Shadow Aspects</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-green-700">Core Strengths</h3>
                  <ul className="space-y-3 text-green-800">
                    {[
                      ['Social Leadership','Galvanizes distributed actors into coherent motion'],
                      ['Creative Navigation','Finds unconventional pathways around blockers'],
                      ['Energy Amplification','Scales nascent ideas through public enthusiasm'],
                      ['Conflict Diffusion','Uses relational capital to reset tense dynamics'],
                      ['Opportunity Timing','Senses inflection points and acts decisively']
                    ].map(([title, text]) => (
                      <li key={title} className="flex items-start"><span className="mr-2 mt-2 w-2 h-2 bg-green-600 rounded-full inline-block" aria-hidden="true" /><span><strong>{title}:</strong> {text}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-red-700">Shadow Patterns</h3>
                  <ul className="space-y-3 text-red-800">
                    {[
                      ['Overbearing Presence','Intensity eclipses quieter contributors'],
                      ['Process Bypass','Skips stabilizing structure for immediacy'],
                      ['Influence Overreach','Pushes adoption before readiness'],
                      ['Emotional Volatility','Peaks and troughs destabilize pacing'],
                      ['Narrative Stretch','Over-promises before underlying capacity exists']
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
              <h2 className="text-3xl font-bold mb-6" style={{color:'#FF6F3C'}}>Work & Relationships</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-orange-50 rounded-lg p-6">
                  <h3 className="font-semibold text-orange-900 mb-3">Professional Strengths</h3>
                  <ul className="space-y-2 text-sm text-orange-800">
                    <li>Launch-phase acceleration & community ignition</li>
                    <li>High-leverage partnerships & sponsorship outreach</li>
                    <li>Brand evangelism & external narrative shaping</li>
                  </ul>
                </div>
                <div className="bg-red-50 rounded-lg p-6">
                  <h3 className="font-semibold text-red-900 mb-3">Relational Patterns</h3>
                  <ul className="space-y-2 text-sm text-red-800">
                    <li>Brings spontaneity & stimulus to relationships</li>
                    <li>May dominate airtime without intentional listening loops</li>
                    <li>Benefits from partners who introduce grounding cadence</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'growth' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{color:'#FF6F3C'}}>Growth & Path</h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                {[
                  ['Cadence Calibration','Define sustainable weekly energy bandwidth'],
                  ['Structured Follow-Through','Pair each launch with maintenance owners'],
                  ['Listening Rounds','Intentional silence to surface overlooked inputs'],
                  ['Ethical Guardrails','Pre-commit influence boundaries & transparency'],
                  ['Regulated Recovery','Scheduled decompression post-event or push']
                ].map(([title, text]) => (
                  <div key={title} className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <h4 className="font-semibold text-orange-900 mb-1">{title}</h4>
                    <p className="text-orange-800 text-xs leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'communication' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{color:'#FF6F3C'}}>Communication</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-orange-900 mb-3">Preferred Style</h3>
                  <ul className="space-y-2 text-sm text-orange-800">
                    <li>High-energy narrative framing</li>
                    <li>Story-led persuasion & emotional anchoring</li>
                    <li>Dynamic, adaptive tone shifting</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-orange-900 mb-3">When Misaligned</h3>
                  <ul className="space-y-2 text-sm text-orange-800">
                    <li>Oversells before structural backing exists</li>
                    <li>Talk-time eclipses collaborative processing</li>
                    <li>Can lean into performative urgency</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'stress' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{color:'#FF6F3C'}}>Stress Patterns</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="font-semibold text-red-900 mb-3">Triggers</h3>
                  <ul className="space-y-2 text-sm text-red-800">
                    <li>Social isolation or stalled response loops</li>
                    <li>Resistance to change from key stakeholders</li>
                    <li>Perceived loss of influence or platform</li>
                    <li>Slow bureaucratic drag on momentum</li>
                    <li>High-volume unstructured inbound requests</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-green-900 mb-3">Regulation Moves</h3>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>Intentional decompression blocks</li>
                    <li>Shift from broadcasting to 1:1 grounding</li>
                    <li>Re-scope narrative to achievable next slice</li>
                    <li>Delegate amplification tasks to preserve core presence</li>
                    <li>Track energy spikes vs. recovery debt</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'compatibility' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{color:'#FF6F3C'}}>Compatibility</h2>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">High Synergy</h3>
                  <p className="text-green-800 mb-2">Mutual amplification & adaptive flow</p>
                  <div className="text-xs text-green-700 space-y-1">
                    <div className="bg-green-100 inline-block px-2 py-1 rounded">Visionary</div>
                    <div className="bg-green-100 inline-block px-2 py-1 rounded ml-1">Connector</div>
                    <div className="bg-green-100 inline-block px-2 py-1 rounded ml-1">Maverick</div>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-900 mb-2">Complementary</h3>
                  <p className="text-yellow-800 mb-2">Stability + catalytic activation</p>
                  <div className="text-xs text-yellow-700 space-y-1">
                    <div className="bg-yellow-100 inline-block px-2 py-1 rounded">Builder</div>
                    <div className="bg-yellow-100 inline-block px-2 py-1 rounded ml-1">Sage</div>
                    <div className="bg-yellow-100 inline-block px-2 py-1 rounded ml-1">Dreamer</div>
                  </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 mb-2">Potential Friction</h3>
                  <p className="text-red-800 mb-2">Tempo & influence calibration needed</p>
                  <div className="text-xs text-red-700 space-y-1">
                    <div className="bg-red-100 inline-block px-2 py-1 rounded">Architect</div>
                    <div className="bg-red-100 inline-block px-2 py-1 rounded ml-1">Realist</div>
                    <div className="bg-red-100 inline-block px-2 py-1 rounded ml-1">Harmonizer</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'values' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{color:'#FF6F3C'}}>Values & Philosophy</h2>
              <ul className="space-y-3 text-gray-700">
                {[
                  ['Collective Activation','People move faster when emotionally aligned'],
                  ['Transparent Influence','Power used openly builds durable trust'],
                  ['Momentum Stewardship','Pacing is strategic—avoid flash collapse'],
                  ['Co-created Narrative','Shared authorship increases adoption']
                ].map(([title, text]) => (
                  <li key={title} className="flex items-start"><span className="mr-2 mt-2 w-2 h-2 bg-orange-500 rounded-full inline-block" aria-hidden="true" /><span><strong>{title}:</strong> {text}</span></li>
                ))}
              </ul>
              <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="font-semibold text-orange-900 mb-3">Self-Assessment Prompts</h3>
                <ul className="list-disc ml-5 text-sm text-orange-800 space-y-1">
                  <li>Where am I amplifying beyond structural readiness?</li>
                  <li>Who is unheard in the spaces I energize?</li>
                  <li>What follow-through debt am I carrying from past launches?</li>
                  <li>How am I pacing recovery vs. activation cycles?</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
