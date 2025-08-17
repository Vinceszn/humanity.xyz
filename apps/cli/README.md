# HUMANITY CLI

A Python-based CLI prototype for the archetype quiz. It consumes `packages/data` and `packages/core`.

## Prerequisites
- Python 3.9+

## Run
- Non-interactive demo (chooses first option for each question) and writes a report:
  - python apps/cli/main.py run --auto-demo --export report.md

- Provide your own answers via JSON mapping of question id to option key:
  - python apps/cli/main.py run --answers-json my_answers.json --export my_report.md

- Interactive mode (prompts in terminal):
  - python apps/cli/main.py run

## Data expectations
- packages/data/questions.json: { "questions": [ { "id": number, "text": string, "options": [ { "key": string, "text": string, "vector": { "A": number, ... } } ] } ] }
- packages/data/archetypes.json: { "archetypes": [ { "letter": string, "name": string, "notes": string } ] }
- Optional profile lookups rendered in report when present:
  - packages/data/triples.md: table mapping Top 3 archetype combinations to a Profile Name and Class
  - packages/data/doubles.md: table mapping Top 2 archetype combinations to a Profile Name and Class

## Output
- Generates a Markdown report (printed or via `--export report.md`) including:
  - Top 3 Archetypes list
  - Optional "Top 3 Profile" section (from triples.md if a match exists)
  - Optional "Top 2 Profile" section (from doubles.md if a match exists)
  - Full ranking table
  - Your Answers summary

## Testing locally
- From repo root:
  - python -m unittest discover -s tests -v
