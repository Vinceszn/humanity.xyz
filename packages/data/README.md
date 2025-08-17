# Data Package

Canonical content for the quiz.

## Files

- archetypes.md: Detailed descriptions, one section per archetype
- questions.md: Human-readable quiz content
- archetypes.json: Machine-readable archetypes (letter, name, notes)
- questions.json: Machine-readable questions with options and vectors
- triples.md: Table of Top 3 archetype combinations with Profile Name and Class (used to render "Top 3 Profile")
- doubles.md: Table of Top 2 archetype combinations with Profile Name and Class (used to render "Top 2 Profile")

## JSON shapes (expected by core)

- archetypes.json

```json
{
  "archetypes": [
    { "letter": "V", "name": "Visionary", "notes": "Big-picture, future-oriented." }
  ]
}
```

- questions.json

```json
{
  "questions": [
    {
      "id": 1,
      "text": "How do you approach a big life change?",
      "options": [
        { "key": "A", "text": "Map out a bold future.", "vector": {"V":0.7} }
      ]
    }
  ]
}
```

Notes:

- Option property names: key, text, vector
- Vector is a mapping of archetype letter -> weight (positive or negative floats)
- The doubles/triples tables use archetype names (e.g., "Visionary + Builder"). The CLI maps these to letters internally and looks up matches order-insensitively.
- If no matching entry exists for a user’s Top 2/Top 3, the corresponding section is omitted from the report.
