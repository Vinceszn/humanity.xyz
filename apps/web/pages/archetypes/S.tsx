import Head from 'next/head';

export default function ConnectorPage() {
  return (
    <div className="archetype-page max-w-4xl mx-auto py-12 px-4">
      <Head>
        <title>Connector Archetype | HUMANITY</title>
        <meta name="description" content="The Connector: Empathic Harmonizer Who Holds the Circle Together. Warm Teal (#1ABC9C) - Emotional heartbeats who build bridges and create harmony." />
      </Head>

      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{color:'#1ABC9C'}}>Connector</h1>
        <div className="text-lg text-gray-600 mb-2">Type S</div>
        <div className="text-xl font-medium text-gray-700 mb-6">Empathic Harmonizer | Circle Keeper</div>
        <div className="rounded-lg border p-6 mb-4" style={{background:'#1ABC9C',color:'#fff'}}>
          <div className="text-lg font-semibold">Color: Warm Teal (#1ABC9C)</div>
          <div className="text-sm opacity-90 mt-2">Calm, Balance, and Emotional Connection</div>
        </div>
      </div>

      {/* Overview */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4" style={{color:'#1ABC9C'}}>Overview</h2>
        <div className="prose prose-lg text-gray-700 leading-relaxed">
          <p>
            The Connector is the emotional heartbeat of any group — the empathic harmonizer who instinctively tunes into others' feelings and works tirelessly to maintain peace and cohesion. They excel in sensing unspoken tensions, bridging divides, and creating environments where everyone feels valued and heard.
          </p>
          <p>
            Connectors prioritize relational harmony above all else, often acting as the glue that holds teams, families, or communities together. Their presence is soothing and steadying, inspiring trust through genuine care and diplomacy. Yet their deep need for peace can sometimes blind them to underlying issues or their own needs, leading to suppressed frustrations and indecision.
          </p>
        </div>
      </section>

      {/* Core Traits */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4" style={{color:'#1ABC9C'}}>Core Traits</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-teal-50 border-l-4 border-teal-500 p-4">
            <h3 className="font-semibold text-teal-900 mb-2">Empathy</h3>
            <p className="text-teal-800">Naturally senses others' emotions and perspectives.</p>
          </div>
          <div className="bg-teal-50 border-l-4 border-teal-500 p-4">
            <h3 className="font-semibold text-teal-900 mb-2">Diplomacy</h3>
            <p className="text-teal-800">Skilled at navigating and defusing conflicts gracefully.</p>
          </div>
          <div className="bg-teal-50 border-l-4 border-teal-500 p-4">
            <h3 className="font-semibold text-teal-900 mb-2">Relational Intelligence</h3>
            <p className="text-teal-800">Builds strong, lasting interpersonal bonds.</p>
          </div>
          <div className="bg-teal-50 border-l-4 border-teal-500 p-4">
            <h3 className="font-semibold text-teal-900 mb-2">Peacemaking</h3>
            <p className="text-teal-800">Strives to maintain harmony, even at personal cost.</p>
          </div>
          <div className="bg-teal-50 border-l-4 border-teal-500 p-4">
            <h3 className="font-semibold text-teal-900 mb-2">Supportive</h3>
            <p className="text-teal-800">Acts as a trusted confidant and emotional anchor.</p>
          </div>
        </div>
      </section>

      {/* Strengths & Weaknesses */}
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-green-700">Strengths</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-2 mt-2 w-2 h-2 bg-green-600 rounded-full inline-block" aria-hidden="true" />
              <div>
                <strong>Trust Builder:</strong> Easily earns loyalty through genuine concern.
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-2 w-2 h-2 bg-green-600 rounded-full inline-block" aria-hidden="true" />
              <div>
                <strong>Conflict Mediator:</strong> Calms heated situations with tact and understanding.
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-2 w-2 h-2 bg-green-600 rounded-full inline-block" aria-hidden="true" />
              <div>
                <strong>Emotional Attunement:</strong> Notices subtle shifts in group dynamics early.
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-2 w-2 h-2 bg-green-600 rounded-full inline-block" aria-hidden="true" />
              <div>
                <strong>Inclusive:</strong> Encourages diverse voices and perspectives.
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-2 w-2 h-2 bg-green-600 rounded-full inline-block" aria-hidden="true" />
              <div>
                <strong>Patient Listener:</strong> Offers safe space for vulnerability and sharing.
              </div>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-red-700">Shadow Side</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-2 mt-2 w-2 h-2 bg-red-600 rounded-full inline-block" aria-hidden="true" />
              <div>
                <strong>Conflict Avoidance:</strong> May shy away from necessary confrontations, allowing issues to fester.
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-2 w-2 h-2 bg-red-600 rounded-full inline-block" aria-hidden="true" />
              <div>
                <strong>Self-Suppression:</strong> Tends to put others' needs before their own, risking burnout.
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-2 w-2 h-2 bg-red-600 rounded-full inline-block" aria-hidden="true" />
              <div>
                <strong>Indecisiveness:</strong> Struggles to take a firm stance when balancing competing interests.
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-2 w-2 h-2 bg-red-600 rounded-full inline-block" aria-hidden="true" />
              <div>
                <strong>Over-Accommodation:</strong> Can dilute own boundaries to keep the peace.
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-2 w-2 h-2 bg-red-600 rounded-full inline-block" aria-hidden="true" />
              <div>
                <strong>Resentment:</strong> Unvoiced frustrations may build under the surface.
              </div>
            </li>
          </ul>
        </section>
      </div>

      {/* Behavioral Patterns */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4" style={{color:'#1ABC9C'}}>Behavioral Patterns</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2 mt-2 w-1.5 h-1.5 bg-teal-500 rounded-full inline-block" aria-hidden="true" />
              Steps in to calm disputes quietly and calmly.
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-2 w-1.5 h-1.5 bg-teal-500 rounded-full inline-block" aria-hidden="true" />
              Prioritizes listening over asserting opinions.
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-2 w-1.5 h-1.5 bg-teal-500 rounded-full inline-block" aria-hidden="true" />
              Frequently checks in with others' emotional states.
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-2 w-1.5 h-1.5 bg-teal-500 rounded-full inline-block" aria-hidden="true" />
              Works behind the scenes to maintain group cohesion.
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-2 w-1.5 h-1.5 bg-teal-500 rounded-full inline-block" aria-hidden="true" />
              Hesitates to deliver tough feedback or say "no."
            </li>
          </ul>
        </div>
      </section>

      {/* Notable Figures */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-6" style={{color:'#1ABC9C'}}>Notable Figures</h2>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Historical & Real-World</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-teal-900 mb-2">Eleanor Roosevelt</h4>
              <p className="text-sm text-gray-600">
                Used empathy and connection skills to bridge political divides and support marginalized voices as "First Lady of the World."
              </p>
            </div>
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-teal-900 mb-2">Fred Rogers</h4>
              <p className="text-sm text-gray-600">
                Exemplified the Connector archetype through deep emotional intelligence, warmth, and ability to soothe children's anxieties with kindness.
              </p>
            </div>
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-teal-900 mb-2">Maya Angelou</h4>
              <p className="text-sm text-gray-600">
                Connected across cultural and racial divides with storytelling that both challenged and comforted, embodying emotional insight and social impact.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Fictional Characters</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-teal-900 mb-2">Samwise Gamgee</h4>
              <p className="text-sm text-gray-600">
                The quintessential loyal friend and emotional anchor, exemplifying the Connector's empathy, patience, and unwavering dedication.
              </p>
            </div>
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-teal-900 mb-2">Molly Weasley</h4>
              <p className="text-sm text-gray-600">
                Provides emotional center for her family with fierce love and protection, balancing warmth and diplomacy with decisive strength.
              </p>
            </div>
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-teal-900 mb-2">C-3PO</h4>
              <p className="text-sm text-gray-600">
                Acts as peacemaker and liaison, constantly seeking to smooth over conflicts and misunderstandings among diverse characters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* In Work & Relationships */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4" style={{color:'#1ABC9C'}}>In Work & Relationships</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-teal-50 rounded-lg p-6">
            <h3 className="font-semibold text-teal-900 mb-3">Professional Life</h3>
            <p className="text-teal-800 mb-2">
              Excel as counselors, mediators, HR professionals, teachers, social workers, community organizers, therapists, coaches.
            </p>
            <p className="text-teal-800 mb-2">
              Thrive in roles requiring emotional intelligence, team-building, and conflict resolution.
            </p>
            <p className="text-teal-800">
              Often the "go-to" person when emotions run high or relationships strain.
            </p>
          </div>
          <div className="bg-cyan-50 rounded-lg p-6">
            <h3 className="font-semibold text-cyan-900 mb-3">Personal Relationships</h3>
            <p className="text-cyan-800 mb-2">
              Deeply loyal, attentive partners who prioritize emotional connection.
            </p>
            <p className="text-cyan-800 mb-2">
              May struggle with setting boundaries or voicing dissatisfaction.
            </p>
            <p className="text-cyan-800">
              Create nurturing environments but need encouragement to care for their own wellbeing.
            </p>
          </div>
        </div>
      </section>

      {/* Growth Tips */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4" style={{color:'#1ABC9C'}}>Growth Path for Connectors</h2>
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Assert Boundaries</h4>
              <p className="text-gray-600 text-sm">Learn to assert their own needs and boundaries clearly.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Engage in Healthy Conflict</h4>
              <p className="text-gray-600 text-sm">Engage in healthy conflict rather than avoid it entirely.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Balance Empathy & Decisions</h4>
              <p className="text-gray-600 text-sm">Balance empathy with practical decision-making abilities.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Express Emotions</h4>
              <p className="text-gray-600 text-sm">Recognize and express suppressed emotions constructively.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Trust in Harmony</h4>
              <p className="text-gray-600 text-sm">Trust that harmony can coexist with honest disagreement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="text-center bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4" style={{color:'#1ABC9C'}}>Summary</h2>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          The Connector is the soul of any social circle — the empathic harmonizer whose warmth and emotional insight hold people together. Their gift for trust-building and diplomacy transforms conflict into understanding, creating safe spaces where diverse voices can thrive. Though sometimes challenged by their own conflict avoidance and self-sacrifice, Connectors offer an irreplaceable blend of kindness, patience, and relational wisdom that enriches families, workplaces, and communities alike. By embracing courage alongside compassion, Connectors can become powerful agents of genuine connection and transformative peace.
        </p>
      </section>
    </div>
  );
}
