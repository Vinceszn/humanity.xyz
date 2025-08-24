import Head from 'next/head';
import { useState } from 'react';

export default function VisionaryPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'traits', label: 'Core Traits' },
    { id: 'strengths', label: 'Strengths & Shadow' },
    { id: 'work', label: 'Work & Relationships' },
    { id: 'growth', label: 'Growth & Career' },
    { id: 'communication', label: 'Communication' },
    { id: 'compatibility', label: 'Compatibility' },
    { id: 'values', label: 'Values & Philosophy' }
  ];

  const traits = [
    { name: 'Vision', value: 95, color: '#2A4D69' },
    { name: 'Leadership', value: 88, color: '#3498db' },
    { name: 'Strategy', value: 92, color: '#2980b9' },
    { name: 'Patience', value: 35, color: '#e74c3c' },
    { name: 'Empathy', value: 65, color: '#f39c12' },
    { name: 'Flexibility', value: 45, color: '#e67e22' }
  ];

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 archetype-page">
      <Head>
        <title>Visionary Archetype | HUMANITY</title>
        <meta name="description" content="The Visionary: Inspiring Leader with Controlling Vision. Deep Blue (#2A4D69) - Future-focused strategic leaders who balance imagination with execution." />
      </Head>

      {/* Hero Section - RPG Character Card Style */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            {/* Left: Character Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4 font-serif">V</div>
                <h1 className="text-4xl font-bold mb-2">Visionary</h1>
                <div className="text-lg opacity-90 mb-1">Type V</div>
                <div className="text-xl font-medium opacity-80">Inspiring Leader | Controlling Vision</div>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4 mb-6">
                <div className="text-sm font-semibold mb-2">ARCHETYPE ESSENCE</div>
                <div className="text-sm opacity-90">Strategic future-builder with magnetic leadership</div>
              </div>

              {/* Trait Bars */}
              <div className="space-y-3">
                {traits.map((trait) => (
                  <div key={trait.name} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{trait.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-white/20 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{
                            width: `${trait.value}%`,
                            backgroundColor: trait.color
                          }}
                        ></div>
                      </div>
                      <span className="text-xs w-8 text-right">{trait.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Quick Insights */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-4">Quick Insights</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: 'Strength', value: 'Strategic visioning' },
                    { title: 'Growth Edge', value: 'Patience & delegation' },
                    { title: 'Motivation', value: 'Creating lasting impact' },
                    { title: 'Challenge', value: 'Micromanagement tendency' }
                  ].map(item => (
                    <div key={item.title} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                      <div className="text-xs uppercase tracking-wide opacity-70 mb-1">{item.title}</div>
                      <div className="text-sm opacity-90 font-medium">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Navigation Tabs */}
      <div className="sticky top-0 bg-white shadow-md z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-blue-600 bg-blue-50'
                    : 'text-gray-600 border-transparent hover:text-blue-500 hover:border-blue-300'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Content Based on Active Tab */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{color:'#2A4D69'}}>The Visionary Archetype</h2>
              <div className="prose max-w-none text-gray-700 text-lg leading-relaxed">
                <p className="mb-6">
                  Visionaries are the <strong>strategic architects of the future</strong>, combining deep intuition with logical planning to create compelling visions that inspire and guide others. They possess an almost magnetic ability to see possibilities that others cannot yet imagine, and the leadership skills to turn those possibilities into reality.
                </p>
                <p className="mb-6">
                  Unlike dreamers who may lack follow-through, or builders who focus primarily on execution, Visionaries strike a unique balance between <strong>imagination and implementation</strong>. They don't just see the future—they actively shape it through strategic thinking, decisive leadership, and the ability to rally others around a shared purpose.
                </p>
                <p>
                  However, their strength can also be their shadow: the same clarity and conviction that makes them powerful leaders can sometimes manifest as controlling behavior or impatience with those who don't immediately share their vision.
                </p>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6" style={{color:'#2A4D69'}}>Daily Mantra</h3>
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white text-center">
                {/* decorative icon removed for premium tone */}
                <blockquote className="text-xl italic font-medium">
                  "I see the future clearly and have the courage to build the bridge between what is and what could be."
                </blockquote>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'traits' && (
          <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6" style={{color:'#2A4D69'}}>Core Traits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-3 text-lg">Future-Focused</h3>
                  <p className="text-blue-800">Constantly thinking ahead, anticipating trends and opportunities.</p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-3 text-lg">Strategic & Logical</h3>
                  <p className="text-blue-800">Applies analytical rigor to turn abstract ideas into actionable plans.</p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-3 text-lg">Decisive & Authoritative</h3>
                  <p className="text-blue-800">Makes tough calls with confidence, often pushing others to align.</p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-3 text-lg">Ambitious & Goal-Oriented</h3>
                  <p className="text-blue-800">Sets high standards and relentlessly pursues meaningful outcomes.</p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6" style={{color:'#2A4D69'}}>Behavioral Patterns</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  {/* icon removed for premium tone */}
                    <h4 className="font-semibold mb-2">Sets Clear Direction</h4>
                  <p className="text-sm text-gray-600">Always has a plan and communicates it clearly to others</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Drives Innovation</h4>
                  <p className="text-sm text-gray-600">Pushes boundaries and challenges conventional thinking</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Inspires Others</h4>
                  <p className="text-sm text-gray-600">Motivates people to be part of something bigger</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'strengths' && (
          <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-8" style={{color:'#2A4D69'}}>Strengths & Shadow Aspects</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-green-700">Core Strengths</h3>
                  <ul className="space-y-3 text-green-800">
                    <li className="flex items-start">
                      <span className="mr-2 mt-2 w-2 h-2 bg-green-600 rounded-full inline-block" aria-hidden="true" />
                      <span><strong>Strategic Vision:</strong> Sees the big picture and long-term implications</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-2 w-2 h-2 bg-green-600 rounded-full inline-block" aria-hidden="true" />
                      <span><strong>Natural Leadership:</strong> Others naturally look to them for direction</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-2 w-2 h-2 bg-green-600 rounded-full inline-block" aria-hidden="true" />
                      <span><strong>Innovation Drive:</strong> Constantly seeks better ways to achieve goals</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-2 w-2 h-2 bg-green-600 rounded-full inline-block" aria-hidden="true" />
                      <span><strong>Inspiring Communication:</strong> Articulates compelling visions that motivate</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-2 w-2 h-2 bg-green-600 rounded-full inline-block" aria-hidden="true" />
                      <span><strong>Decisive Action:</strong> Makes important decisions quickly and confidently</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-red-700">Shadow Aspects</h3>
                  <ul className="space-y-3 text-red-800">
                    <li className="flex items-start">
                      <span className="mr-2 mt-2 w-2 h-2 bg-red-600 rounded-full inline-block" aria-hidden="true" />
                      <span><strong>Controlling Tendencies:</strong> Can micromanage and dismiss other perspectives</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-2 w-2 h-2 bg-red-600 rounded-full inline-block" aria-hidden="true" />
                      <span><strong>Impatience:</strong> Frustrated by slow progress or resistance to change</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-2 w-2 h-2 bg-red-600 rounded-full inline-block" aria-hidden="true" />
                      <span><strong>Perfectionism:</strong> High standards can paralyze progress or demoralize teams</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-2 w-2 h-2 bg-red-600 rounded-full inline-block" aria-hidden="true" />
                      <span><strong>Blind Spots:</strong> May overlook practical details or people's emotional needs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-2 w-2 h-2 bg-red-600 rounded-full inline-block" aria-hidden="true" />
                      <span><strong>Burnout Risk:</strong> Pushes self and others too hard in pursuit of the vision</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'work' && (
          <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-8" style={{color:'#2A4D69'}}>Work & Relationships</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-semibold text-blue-900 mb-3">Professional Strengths</h4>
                    <ul className="text-blue-800 space-y-2">
                      <li>Exceptional at setting organizational direction</li>
                      <li>Drives innovation and strategic initiatives</li>
                      <li>Inspires teams with compelling visions</li>
                      <li>Makes complex decisions with confidence</li>
                      <li>Attracts top talent and resources</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-6">
                    <h4 className="font-semibold text-yellow-900 mb-3">Professional Challenges</h4>
                    <ul className="text-yellow-800 space-y-2">
                      <li>May struggle with delegation and trust</li>
                      <li>Can become impatient with slower team members</li>
                      <li>Sometimes overlooks practical implementation details</li>
                      <li>Tendency to make unilateral decisions</li>
                      <li>May push teams too hard toward ambitious goals</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="font-semibold text-green-900 mb-3">Personal Relationships</h4>
                    <ul className="text-green-800 space-y-2">
                      <li>Inspires others to reach their potential</li>
                      <li>Provides clear guidance and direction</li>
                      <li>Passionate about shared goals and values</li>
                      <li>Creates exciting future possibilities together</li>
                      <li>Loyal and committed to important relationships</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-6">
                    <h4 className="font-semibold text-red-900 mb-3">Relationship Challenges</h4>
                    <ul className="text-red-800 space-y-2">
                      <li>May prioritize goals over emotional needs</li>
                      <li>Can be controlling or domineering</li>
                      <li>Sometimes struggles with work-life balance</li>
                      <li>May have difficulty with vulnerability</li>
                      <li>Can be impatient with others' pace or perspective</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'growth' && (
          <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-8" style={{color:'#2A4D69'}}>Growth & Development</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                    <h4 className="font-semibold text-blue-900 mb-4">Growth Tips for Visionaries</h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                      <div>
                        <h5 className="font-semibold text-gray-800">Practice Active Listening</h5>
                        <p className="text-gray-600 text-sm">Make space for others' perspectives and insights</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                      <div>
                        <h5 className="font-semibold text-gray-800">Develop Patience</h5>
                        <p className="text-gray-600 text-sm">Allow time for others to understand and embrace your vision</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                      <div>
                        <h5 className="font-semibold text-gray-800">Delegate Meaningfully</h5>
                        <p className="text-gray-600 text-sm">Trust others with important responsibilities and outcomes</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
                      <div>
                        <h5 className="font-semibold text-gray-800">Embrace Feedback</h5>
                        <p className="text-gray-600 text-sm">Seek input to refine your vision and approach</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                    <h4 className="font-semibold text-green-900 mb-4">Stress Management</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm"><strong>Triggers:</strong> Resistance to change, slow progress</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm"><strong>Relief:</strong> Strategic planning, delegation, mindfulness</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6">
                    <h4 className="font-semibold text-purple-900 mb-4">Work-Life Balance</h4>
                    <ul className="text-purple-800 space-y-2 text-sm">
                      <li>Set boundaries between visionary time and execution</li>
                      <li>Schedule regular breaks for reflection and renewal</li>
                      <li>Make time for relationships and personal interests</li>
                      <li>Practice being present rather than always future-focused</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6" style={{color:'#2A4D69'}}>Ideal Career Paths</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 border rounded-xl p-6">
                  <h4 className="font-semibold text-blue-900 mb-3">Leadership & Strategy</h4>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>CEO/Executive</li>
                    <li>Strategic Consultant</li>
                    <li>Innovation Director</li>
                    <li>Venture Capitalist</li>
                  </ul>
                </div>
                <div className="bg-indigo-50 border rounded-xl p-6">
                  <h4 className="font-semibold text-indigo-900 mb-3">Innovation & Tech</h4>
                  <ul className="text-indigo-800 text-sm space-y-1">
                    <li>Tech Entrepreneur</li>
                    <li>Product Visionary</li>
                    <li>R&D Director</li>
                    <li>Startup Founder</li>
                  </ul>
                </div>
                <div className="bg-slate-50 border rounded-xl p-6">
                  <h4 className="font-semibold text-slate-900 mb-3">Creative & Social</h4>
                  <ul className="text-slate-800 text-sm space-y-1">
                    <li>Film Director</li>
                    <li>Social Entrepreneur</li>
                    <li>Author/Speaker</li>
                    <li>Movement Leader</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'communication' && (
          <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-8" style={{color:'#2A4D69'}}>Communication & Decision Making</h2>
              
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="font-semibold text-green-900 mb-4">Effective Communication</h3>
                  <ul className="text-green-800 text-sm space-y-3">
                    <li className="flex items-start space-x-2">
                      <span className="mr-2 mt-2 w-1.5 h-1.5 bg-green-600 rounded-full inline-block" aria-hidden="true" />
                      <span>Paints compelling pictures of future possibilities</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="mr-2 mt-2 w-1.5 h-1.5 bg-green-600 rounded-full inline-block" aria-hidden="true" />
                      <span>Speaks with confidence and authority</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="mr-2 mt-2 w-1.5 h-1.5 bg-green-600 rounded-full inline-block" aria-hidden="true" />
                      <span>Connects abstract concepts to practical outcomes</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="mr-2 mt-2 w-1.5 h-1.5 bg-green-600 rounded-full inline-block" aria-hidden="true" />
                      <span>Inspires others with passionate storytelling</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="mr-2 mt-2 w-1.5 h-1.5 bg-green-600 rounded-full inline-block" aria-hidden="true" />
                      <span>Provides clear direction and next steps</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="font-semibold text-red-900 mb-4">Communication Pitfalls</h3>
                  <ul className="text-red-800 text-sm space-y-3">
                    <li className="flex items-start space-x-2">
                      <span className="mr-2 mt-2 w-1.5 h-1.5 bg-red-600 rounded-full inline-block" aria-hidden="true" />
                      <span>Can overwhelming others with big picture thinking</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="mr-2 mt-2 w-1.5 h-1.5 bg-red-600 rounded-full inline-block" aria-hidden="true" />
                      <span>May dismiss concerns as "small thinking"</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="mr-2 mt-2 w-1.5 h-1.5 bg-red-600 rounded-full inline-block" aria-hidden="true" />
                      <span>Sometimes interrupts or rushes conversations</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="mr-2 mt-2 w-1.5 h-1.5 bg-red-600 rounded-full inline-block" aria-hidden="true" />
                      <span>Can be impatient with detailed explanations</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="mr-2 mt-2 w-1.5 h-1.5 bg-red-600 rounded-full inline-block" aria-hidden="true" />
                      <span>May struggle with emotional or personal topics</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6" style={{color:'#2A4D69'}}>Decision Making Process</h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-lg">1</div>
                    <h4 className="font-semibold text-blue-900 mb-2">Vision Alignment</h4>
                    <p className="text-blue-800 text-sm">Evaluates how options support long-term strategic goals</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-lg">2</div>
                    <h4 className="font-semibold text-blue-900 mb-2">Impact Analysis</h4>
                    <p className="text-blue-800 text-sm">Considers potential reach and transformational effects</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-lg">3</div>
                    <h4 className="font-semibold text-blue-900 mb-2">Resource Assessment</h4>
                    <p className="text-blue-800 text-sm">Ensures sufficient support and capabilities exist</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-lg">4</div>
                    <h4 className="font-semibold text-blue-900 mb-2">Decisive Action</h4>
                    <p className="text-blue-800 text-sm">Makes confident choices and communicates direction</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'compatibility' && (
          <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-8" style={{color:'#2A4D69'}}>Archetype Compatibility</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="font-semibold text-green-900 mb-4">Natural Synergy</h3>
                  <p className="text-green-800 text-sm mb-4">Strong collaborative potential</p>
                  <div className="space-y-2">
                    <div className="bg-green-100 px-3 py-2 rounded text-sm">
                      <strong>Architect:</strong> Builds systems for visionary ideas
                    </div>
                    <div className="bg-green-100 px-3 py-2 rounded text-sm">
                      <strong>Catalyst:</strong> Energizes and spreads the vision
                    </div>
                    <div className="bg-green-100 px-3 py-2 rounded text-sm">
                      <strong>Builder:</strong> Executes with purpose and drive
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h3 className="font-semibold text-yellow-900 mb-4">Complementary</h3>
                  <p className="text-yellow-800 text-sm mb-4">Requires conscious effort</p>
                  <div className="space-y-2">
                    <div className="bg-yellow-100 px-3 py-2 rounded text-sm">
                      <strong>Sage:</strong> Provides analytical depth and research
                    </div>
                    <div className="bg-yellow-100 px-3 py-2 rounded text-sm">
                      <strong>Connector:</strong> Facilitates team harmony and communication
                    </div>
                    <div className="bg-yellow-100 px-3 py-2 rounded text-sm">
                      <strong>Realist:</strong> Grounds vision in practical reality
                    </div>
                  </div>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="font-semibold text-red-900 mb-4">Potential Friction</h3>
                  <p className="text-red-800 text-sm mb-4">May clash without awareness</p>
                  <div className="space-y-2">
                    <div className="bg-red-100 px-3 py-2 rounded text-sm">
                      <strong>Maverick:</strong> Both want to lead in different directions
                    </div>
                    <div className="bg-red-100 px-3 py-2 rounded text-sm">
                      <strong>Dreamer:</strong> May find each other too rigid/unrealistic
                    </div>
                    <div className="bg-red-100 px-3 py-2 rounded text-sm">
                      <strong>Harmonizer:</strong> Visionary directness can overwhelm
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'values' && (
          <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-8" style={{color:'#2A4D69'}}>Core Philosophy & Values</h2>
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h3 className="font-semibold text-blue-900 mb-4">Life Philosophy</h3>
                  <blockquote className="italic text-blue-800 border-l-4 border-blue-400 pl-4 text-lg">
                    "The future belongs to those who can see it clearly, plan for it strategically, and inspire others to build it together."
                  </blockquote>
                </div>
                
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                  <h3 className="font-semibold text-indigo-900 mb-4">Core Values</h3>
                  <ul className="text-indigo-800 space-y-2">
                    <li><strong>Vision:</strong> Seeing possibilities beyond current limitations</li>
                    <li><strong>Purpose:</strong> Meaningful impact that lasts beyond oneself</li>
                    <li><strong>Excellence:</strong> High standards in everything undertaken</li>
                    <li><strong>Leadership:</strong> Guiding others toward shared success</li>
                    <li><strong>Innovation:</strong> Creating new solutions and opportunities</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Visionary Mantras</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 rounded-lg p-4">
                    {/* icon removed */}
                    <p className="italic">"I see what others cannot yet imagine, and I have the courage to make it real."</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    {/* icon removed */}
                    <p className="italic">"Every great achievement started as someone's impossible dream."</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Are You a Visionary?</h3>
                <p className="text-blue-900 mb-4">Ask yourself these questions:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-blue-800">
                    <li>Do you naturally think about the future?</li>
                    <li>Are you energized by big, ambitious goals?</li>
                    <li>Do others look to you for direction?</li>
                    <li>Are you comfortable making bold decisions?</li>
                  </ul>
                  <ul className="space-y-2 text-blue-800">
                    <li>Do you challenge conventional thinking?</li>
                    <li>Are you driven by purpose over process?</li>
                    <li>Do you inspire others with your ideas?</li>
                    <li>Can you see patterns others miss?</li>
                  </ul>
                </div>
                <p className="text-blue-700 mt-4 text-sm italic">
                  If you answered "yes" to most of these, you likely have strong Visionary tendencies.
                </p>
              </div>
            </section>
          </div>
        )}
      </div>

      {/* Bottom Action Section */}
      <div className="max-w-6xl mx-auto px-4 py-8 bg-white">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Share Your Archetype</h3>
            <p className="mb-6">Let others know you're a Visionary!</p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Share on Social Media
            </button>
          </div>
          <div className="text-center bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Compare Archetypes</h3>
            <p className="mb-6">Explore how you work with others</p>
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              View Compatibility Matrix
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
