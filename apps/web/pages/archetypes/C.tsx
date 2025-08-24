import { useState } from 'react';
import ArchetypeLayout from '../../components/archetypes/ArchetypeLayout';
import ArchetypeTabs from '../../components/archetypes/ArchetypeTabs';

export default function RealistPage() {
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
    { name: 'Pragmatism', value: 94, color: '#6B4C3B' },
    { name: 'Risk Management', value: 90, color: '#8d674e' },
    { name: 'Consistency', value: 88, color: '#a67c5e' },
    { name: 'Emotional Flexibility', value: 50, color: '#d1b59b' },
    { name: 'Openness to Change', value: 45, color: '#eabf9a' },
    { name: 'Vision Orientation', value: 55, color: '#bf8d68' }
  ];

  const quickInsights = [
    { title: 'Strength', value: 'Grounded execution' },
    { title: 'Growth Edge', value: 'Embracing change' },
    { title: 'Motivation', value: 'Stability & clarity' },
    { title: 'Challenge', value: 'Risk aversion' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-stone-100 archetype-page">
      <ArchetypeLayout
        title="Realist"
        type="C"
        subtitle="Grounded Navigator | Practical Strategist"
        color="#6B4C3B"
        essenceText="Pragmatic stabilizer who filters noise, manages risk, and ensures durable progress."
        traits={traits}
        quickInsights={quickInsights}
      />

      <ArchetypeTabs tabs={tabs} active={activeTab} onChange={setActiveTab} color="#6B4C3B" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#6B4C3B' }}>The Realist Archetype</h2>
              <div className="prose max-w-none text-gray-700 text-lg leading-relaxed">
                <p>The Realist is the pragmatic anchor—seeing conditions as they are, allocating effort where it compounds, and filtering out noise and wishful projection.</p>
                <p>They prevent derailment by insisting on validated assumptions and resource-aware execution. Their equilibrium tempers speculative exuberance.</p>
                <p>Shadow emerges as excessive caution, cynicism misread as wisdom, or slow adaptation to emergent opportunity.</p>
              </div>
            </section>
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#6B4C3B' }}>Daily Mantra</h3>
              <div className="bg-gradient-to-r from-stone-700 to-amber-700 rounded-xl p-6 text-white text-center">
                <blockquote className="text-xl italic font-medium">"Clarity before commitment—ground truth drives durable outcomes."</blockquote>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'traits' && (
          <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#6B4C3B' }}>Core Traits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  ['Pragmatic', 'Optimizes for what reliably works.'],
                  ['Clear-Sighted', 'Removes sentiment from situational assessment.'],
                  ['Risk Calculating', 'Maps downside before committing.'],
                  ['Dependable', 'Maintains steady operational cadence.'],
                  ['Experience-Grounded', 'Applies pattern memory to avoid repeats.'],
                  ['Incrementalist', 'Prefers compounding iteration over leaps.']
                ].map(([title, text]) => (
                  <div key={title} className="bg-amber-50 border-l-4 border-amber-700 p-6 rounded-lg">
                    <h3 className="font-semibold text-amber-900 mb-3 text-lg">{title}</h3>
                    <p className="text-amber-800 text-sm">{text}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#6B4C3B' }}>Behavioral Patterns</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  ['Evidence First', 'Seeks data before scale'],
                  ['Incremental Upgrade', 'Refines rather than overhauls'],
                  ['Risk Gatekeeping', 'Flags fragile assumptions early']
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
              <h2 className="text-3xl font-bold mb-8" style={{ color: '#6B4C3B' }}>Strengths & Shadow Aspects</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-green-700">Core Strengths</h3>
                  <ul className="space-y-3 text-green-800">
                    {[
                      ['Problem Solver', 'Methodical triage + pragmatic fixes'],
                      ['Risk Manager', 'Buffers teams from catastrophic exposure'],
                      ['Realistic Optimist', 'Holds hope with contingency plans'],
                      ['Resilient', 'Stable under volatility'],
                      ['Efficient Operator', 'Eliminates extraneous motion']
                    ].map(([title, text]) => (
                      <li key={title} className="flex items-start"><span className="mr-2 mt-2 w-2 h-2 bg-green-600 rounded-full inline-block" /><span><strong>{title}:</strong> {text}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-red-700">Shadow Patterns</h3>
                  <ul className="space-y-3 text-red-800">
                    {[
                      ['Risk Aversion', 'Misses asymmetrical upside windows'],
                      ['Cynicism Drift', 'Protective skepticism hardens'],
                      ['Change Drag', 'Slow to pivot when context shifts'],
                      ['Over-Practical', 'Undervalues symbolic drivers'],
                      ['Dismissive of Ideals', 'Prevents inspiring stretch']
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
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#6B4C3B' }}>Work & Relationships</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-amber-50 rounded-lg p-6">
                  <h3 className="font-semibold text-amber-900 mb-3">Professional Life</h3>
                  <ul className="space-y-2 text-sm text-amber-800">
                    <li>Excels in ops, logistics, audit, compliance</li>
                    <li>Stabilizes ambitious cross-functional plans</li>
                    <li>Protects timeline realism & resource balance</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 rounded-lg p-6">
                  <h3 className="font-semibold text-yellow-900 mb-3">Relational Patterns</h3>
                  <ul className="space-y-2 text-sm text-yellow-800">
                    <li>Offers grounded reassurance</li>
                    <li>Benefits from partners amplifying imagination</li>
                    <li>Needs space to evaluate without pressure</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'growth' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#6B4C3B' }}>Growth & Path</h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                {[
                  ['Curiosity Reps', 'Intentionally explore unproven options'],
                  ['Risk Calibration', 'Document upside alongside downside'],
                  ['Emotional Inclusion', 'Add affect signals to status review'],
                  ['Stretch Project', 'Quarterly initiative outside comfort'],
                  ['Assumption Audits', 'List & re-validate monthly priors'],
                  ['Partner With Idealists', 'Borrow vision energy for ambition']
                ].map(([title, text]) => (
                  <div key={title} className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-1">{title}</h4>
                    <p className="text-amber-800 text-xs leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'communication' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#6B4C3B' }}>Communication</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-amber-900 mb-3">Effective Style</h3>
                  <ul className="space-y-2 text-sm text-amber-800">
                    <li>Concise factual summaries</li>
                    <li>Risk & contingency framing</li>
                    <li>Resource clarity emphasis</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900 mb-3">Pitfalls</h3>
                  <ul className="space-y-2 text-sm text-amber-800">
                    <li>Appears dismissive of unproven ideas</li>
                    <li>Terse under time pressure</li>
                    <li>Under-communicates excitement</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'compatibility' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#6B4C3B' }}>Compatibility</h2>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Synergy</h3>
                  <p className="text-green-800 mb-2">Mutual stability reinforcement</p>
                  <div className="text-xs text-green-700 space-x-1">
                    <span className="bg-green-100 px-2 py-1 rounded">Architect</span>
                    <span className="bg-green-100 px-2 py-1 rounded">Visionary</span>
                    <span className="bg-green-100 px-2 py-1 rounded">Builder</span>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-900 mb-2">Complement</h3>
                  <p className="text-yellow-800 mb-2">Adds breadth / elasticity</p>
                  <div className="text-xs text-yellow-700 space-x-1">
                    <span className="bg-yellow-100 px-2 py-1 rounded">Harmonizer</span>
                    <span className="bg-yellow-100 px-2 py-1 rounded">Catalyst</span>
                    <span className="bg-yellow-100 px-2 py-1 rounded">Sage</span>
                  </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 mb-2">Friction</h3>
                  <p className="text-red-800 mb-2">Pace / ideology gaps</p>
                  <div className="text-xs text-red-700 space-x-1">
                    <span className="bg-red-100 px-2 py-1 rounded">Dreamer</span>
                    <span className="bg-red-100 px-2 py-1 rounded">Maverick</span>
                    <span className="bg-red-100 px-2 py-1 rounded">Connector</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'values' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#6B4C3B' }}>Values & Philosophy</h2>
              <ul className="space-y-3 text-gray-700">
                {[
                  ['Reality Alignment', 'Decide from verified conditions'],
                  ['Sustainability', 'Favor durable pace + structure'],
                  ['Integrity', 'Accuracy over appeasement'],
                  ['Measured Growth', 'Controlled expansion > reckless scale'],
                  ['Accountability', 'Own commitments & impacts']
                ].map(([title, text]) => (
                  <li key={title} className="flex items-start"><span className="mr-2 mt-2 w-2 h-2 bg-amber-700 rounded-full inline-block" /><span><strong>{title}:</strong> {text}</span></li>
                ))}
              </ul>
              <div className="mt-8 bg-amber-50 border-l-4 border-amber-700 rounded-lg p-6">
                <p className="text-amber-900 mb-4 font-medium">Self-Assessment Prompts</p>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-amber-800">
                  {[
                    'Do you instinctively check constraints first?',
                    'Do you track prior outcomes to guide present?',
                    'Do unvetted assumptions raise alarms?',
                    'Do you create contingency buffers?',
                    'Do you slow momentum for validation?',
                    'Do you anchor teams during volatility?'
                  ].map(q => (
                    <div key={q} className="flex items-start"><span className="mt-2 mr-2 w-1.5 h-1.5 bg-amber-700 rounded-full inline-block" />{q}</div>
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
