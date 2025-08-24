import { useState } from 'react';
import ArchetypeLayout from '../../components/archetypes/ArchetypeLayout';
import ArchetypeTabs from '../../components/archetypes/ArchetypeTabs';

export default function SagePage() {
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
    { name: 'Analytical Depth', value: 92, color: '#16A085' },
    { name: 'Intellectual Curiosity', value: 88, color: '#149174' },
    { name: 'Objectivity', value: 85, color: '#117a60' },
    { name: 'Patience', value: 78, color: '#1abc9c' },
    { name: 'Precision', value: 82, color: '#13866d' },
    { name: 'Emotional Expression', value: 42, color: '#6bb8a7' }
  ];

  const quickInsights = [
    { title: 'Strength', value: 'Clarity & rigor' },
    { title: 'Growth Edge', value: 'Emotional integration' },
    { title: 'Motivation', value: 'Pursuit of truth' },
    { title: 'Challenge', value: 'Over-detachment' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 archetype-page">
      <ArchetypeLayout
        title="Sage"
        type="M"
        subtitle="Analytical Thinker | Detached Intellectual"
        color="#16A085"
        essenceText="Methodical intellect seeking objective truth through patient analysis and disciplined reasoning."
        traits={traits}
        quickInsights={quickInsights}
      />

      <ArchetypeTabs tabs={tabs} active={activeTab} onChange={setActiveTab} color="#16A085" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{color:'#16A085'}}>The Sage Archetype</h2>
              <div className="prose max-w-none text-gray-700 text-lg leading-relaxed">
                <p className="mb-6">Sages are the <strong>stabilizers of clarity</strong> in emotionally noisy systems. They filter signal from noise, apply disciplined reasoning, and articulate frameworks that help others think better.</p>
                <p className="mb-6">Where others might accelerate toward premature action, the Sage insists on <strong>conceptual soundness</strong>. Their commitment to precision, evidentiary standards, and structural thinking makes them trusted adjudicators of truth.</p>
                <p>Yet their strength can harden into distance. The same detachment that preserves objectivity can mute emotional availability, creating perceptions of aloofness or slow engagement when decisive warmth is needed.</p>
              </div>
            </section>
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6" style={{color:'#16A085'}}>Daily Mantra</h3>
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white text-center">
                <blockquote className="text-xl italic font-medium">"Wisdom requires both clear analysis and human context. I let data inform me without letting it erase empathy."</blockquote>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'traits' && (
          <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{color:'#16A085'}}>Core Traits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  ['Analytical Depth','Breaks complexity into elegant logical primitives.'],
                  ['Intellectual Curiosity','Relentless drive to refine mental models.'],
                  ['Objectivity','Separates signal from bias and emotional distortion.'],
                  ['Patience','Resists premature closure until structure is sound.'],
                  ['Precision','Values definitional clarity and tight language.'],
                  ['Emotional Reserve','Shares inner world selectively and sparingly.']
                ].map(([title, text]) => (
                  <div key={title} className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-lg">
                    <h3 className="font-semibold text-teal-900 mb-3 text-lg">{title}</h3>
                    <p className="text-teal-800 text-sm">{text}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6" style={{color:'#16A085'}}>Behavioral Patterns</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  ['Layered Questioning','Probes assumptions beneath surface claims'],
                  ['Model Construction','Builds abstract schemas before execution'],
                  ['Structured Synthesis','Distills diffuse data into crisp reasoning']
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
              <h2 className="text-3xl font-bold mb-8" style={{color:'#16A085'}}>Strengths & Shadow Aspects</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-green-700">Core Strengths</h3>
                  <ul className="space-y-3 text-green-800">
                    {[
                      ['Conceptual Clarity','Translates ambiguity into structured insight'],
                      ['Unbiased Judgment','Evaluates without political or emotional sway'],
                      ['Methodical Problem-Solving','Decomposes and sequences complexity'],
                      ['Independent Reasoning','Challenges prevailing narratives confidently'],
                      ['Depth Expertise','Accumulates durable, defensible knowledge']
                    ].map(([title, text]) => (
                      <li key={title} className="flex items-start"><span className="mr-2 mt-2 w-2 h-2 bg-green-600 rounded-full inline-block" aria-hidden="true" /><span><strong>{title}:</strong> {text}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-red-700">Shadow Patterns</h3>
                  <ul className="space-y-3 text-red-800">
                    {[
                      ['Emotional Distance','Appears cold or inaccessible'],
                      ['Analysis Drag','Slows action pursuing perfect certainty'],
                      ['Risk Aversion','Defaults to proven frameworks over experimentation'],
                      ['Dismissive Tone','Undervalues experiential or intuitive input'],
                      ['Isolation Loop','Withdraws and reinforces social detachment']
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
              <h2 className="text-3xl font-bold mb-6" style={{color:'#16A085'}}>Work & Relationships</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-teal-50 rounded-lg p-6">
                  <h3 className="font-semibold text-teal-900 mb-3">Professional Strengths</h3>
                  <ul className="space-y-2 text-sm text-teal-800">
                    <li>Trusted evaluator in high-stakes analysis</li>
                    <li>Thrives in research, data, systems, legal, strategy</li>
                    <li>Stabilizes decisions with rigorous evidence</li>
                  </ul>
                </div>
                <div className="bg-cyan-50 rounded-lg p-6">
                  <h3 className="font-semibold text-cyan-900 mb-3">Relational Patterns</h3>
                  <ul className="space-y-2 text-sm text-cyan-800">
                    <li>May under-communicate emotional availability</li>
                    <li>Shows care through problem-solving, not affect</li>
                    <li>Benefits from partners who normalize emotional expression</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'growth' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{color:'#16A085'}}>Growth & Path</h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                {[
                  ['Name Feelings in Real-Time','Pair internal labeling with external sharing'],
                  ['80% Decision Rule','Ship when structurally sound, refine post-launch'],
                  ['Embodied Checks','Short somatic scans before major calls'],
                  ['Collaborative Pairing','Invite empathic peers into early framing'],
                  ['Divergence Reps','Schedule weekly unstructured exploration']
                ].map(([title, text]) => (
                  <div key={title} className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                    <h4 className="font-semibold text-teal-900 mb-1">{title}</h4>
                    <p className="text-teal-800 text-xs leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'communication' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{color:'#16A085'}}>Communication</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-teal-900 mb-3">Preferred Style</h3>
                  <ul className="space-y-2 text-sm text-teal-800">
                    <li>Structured, sequential, premise -&gt; conclusion</li>
                    <li>Values definitions before debate</li>
                    <li>Asks clarifying questions before commitments</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-teal-900 mb-3">When Misaligned</h3>
                  <ul className="space-y-2 text-sm text-teal-800">
                    <li>May default to intellectual distancing</li>
                    <li>Can over-correct emotional language</li>
                    <li>Appears dismissive of narrative-driven input</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'compatibility' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{color:'#16A085'}}>Compatibility</h2>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">High Synergy</h3>
                  <p className="text-green-800 mb-2">Mutually reinforcing depth & structure</p>
                  <div className="text-xs text-green-700 space-y-1">
                    <div className="bg-green-100 inline-block px-2 py-1 rounded">Architect</div>
                    <div className="bg-green-100 inline-block px-2 py-1 rounded ml-1">Realist</div>
                    <div className="bg-green-100 inline-block px-2 py-1 rounded ml-1">Builder</div>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-900 mb-2">Complementary</h3>
                  <p className="text-yellow-800 mb-2">Expands emotional + imaginative bandwidth</p>
                  <div className="text-xs text-yellow-700 space-y-1">
                    <div className="bg-yellow-100 inline-block px-2 py-1 rounded">Dreamer</div>
                    <div className="bg-yellow-100 inline-block px-2 py-1 rounded ml-1">Harmonizer</div>
                    <div className="bg-yellow-100 inline-block px-2 py-1 rounded ml-1">Visionary</div>
                  </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 mb-2">Potential Friction</h3>
                  <p className="text-red-800 mb-2">Different tempos or tolerance for ambiguity</p>
                  <div className="text-xs text-red-700 space-y-1">
                    <div className="bg-red-100 inline-block px-2 py-1 rounded">Catalyst</div>
                    <div className="bg-red-100 inline-block px-2 py-1 rounded ml-1">Maverick</div>
                    <div className="bg-red-100 inline-block px-2 py-1 rounded ml-1">Connector</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'values' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{color:'#16A085'}}>Values & Philosophy</h2>
              <ul className="space-y-3 text-gray-700">
                {[
                  ['Intellectual Honesty','Truth over social convenience'],
                  ['Systemic Elegance','Prefer architectures that are lean & coherent'],
                  ['Depth over Noise','Signal density prioritized above volume'],
                  ['Disciplined Inquiry','Rigor as a long-term productivity multiplier']
                ].map(([title, text]) => (
                  <li key={title} className="flex items-start"><span className="mr-2 mt-2 w-2 h-2 bg-teal-500 rounded-full inline-block" aria-hidden="true" /><span><strong>{title}:</strong> {text}</span></li>
                ))}
              </ul>
              <div className="mt-8 bg-teal-50 border border-teal-200 rounded-lg p-6">
                <h3 className="font-semibold text-teal-900 mb-3">Self-Assessment Prompts</h3>
                <ul className="list-disc ml-5 text-sm text-teal-800 space-y-1">
                  <li>Do I default to analysis when an emotional response is appropriate?</li>
                  <li>Where am I over-optimizing for certainty?</li>
                  <li>Which relationships would benefit from more proactive warmth?</li>
                  <li>What ambiguity could I tolerate to accelerate progress?</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
