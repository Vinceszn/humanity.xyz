# HUMANITY — Monorepo

A personality archetype quiz app. This repo contains:
- Core Python library for scoring and reporting
- A Python CLI to take the quiz and generate a Markdown report
- Data package with archetypes and questions
- Web app scaffold (planned)

## Repository Structure
- apps/web: Next.js frontend (Tailwind + Shadcn UI planned)
- apps/cli: Python CLI prototype (uses packages/core and packages/data)
- packages/core: shared scoring and report logic (Python package `humanity_core`)
- packages/data: archetypes and questions in JSON and Markdown
- docs: product docs and guides

## Prerequisites
- Python 3.9+
- Windows PowerShell (examples use `pwsh`)

## Setup
1) (Optional) Create a virtual environment
- pwsh:
  - python -m venv .venv
  - .\.venv\Scripts\Activate.ps1

2) Install core package (editable) if you plan to import it elsewhere locally
- pwsh:
  - pip install -e packages/core

3) Prepare data
- Add your content to packages/data:
  - archetypes.json and archetypes.md
  - questions.json and questions.md
- Data shapes expected by the core:
  - questions.json: { "questions": [ { "id": number, "text": string, "options": [ { "key": string, "text": string, "vector": { "A": number, ... } } ] } ] }
  - archetypes.json: { "archetypes": [ { "letter": "A", "name": "Harmonizer", "notes": "..." } ] }

## Running the CLI
- Non-interactive demo (chooses the first option per question) and writes a Markdown report:
  - python apps/cli/main.py run --auto-demo --export report.md

- Interactive mode (prompted in terminal):
  - python apps/cli/main.py run

- Provide your own answers via JSON mapping (keys are question ids, values are option keys):
  - python apps/cli/main.py run --answers-json path/to/answers.json --export report.md

## Testing
- Run the test suite:
  - python -m unittest discover -s tests -v

- Run a single test:
  - python -m unittest tests.test_scoring.TestHumanityCore.test_score_and_rank -v

## Development Notes
- Core API (`humanity_core`):
  - score_quiz(questions, answers) -> dict of raw scores per archetype
  - normalize_scores(scores) -> 0..100 normalized scores
  - rank_archetypes(normalized) -> sorted list of (letter, score)
  - build_markdown_report(ranked, archetypes, answers, questions, title?) -> Markdown string

## Roadmap
- Wire the web app to consume packages/core and packages/data
- Enhance CLI UX and validations
- Expand tests and sample datasets
