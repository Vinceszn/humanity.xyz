import argparse
import json
from pathlib import Path
from typing import Dict, Tuple, List, Optional

import sys
sys.path.append(str((Path(__file__).resolve().parents[2] / "packages" / "core").resolve()))

from humanity_core import score_quiz, normalize_scores, rank_archetypes, build_markdown_report  # type: ignore


def load_json(p: Path):
    return json.loads(p.read_text(encoding="utf-8"))


def parse_triples_md(md_path: Path) -> Optional[Dict[Tuple[str, str, str], Dict[str, str]]]:
    if not md_path.exists():
        return None
    lines = md_path.read_text(encoding="utf-8").splitlines()
    out: Dict[Tuple[str, str, str], Dict[str, str]] = {}
    # Skip header and separator; parse rows like: | 1 | Visionary + Builder + Maverick | The Bold Pioneer | Strongly Harmonious |
    for line in lines:
        line = line.strip()
        if not line.startswith("|"):
            continue
        parts = [p.strip() for p in line.strip("|").split("|")]
        # parts example: [ID, Triple, Profile Name, Class]
        if len(parts) < 4 or parts[0] in ("ID", "--") or parts[1] in (("(Archetypes)")):
            continue
        _, triple_txt, profile_name, klass = parts[:4]
        # Normalize triple to letters order-independent using archetype names mapping
        name_to_letter = {
            "Visionary": "V",
            "Dreamer": "I",
            "Architect": "E",
            "Catalyst": "P",
            "Realist": "C",
            "Maverick": "R",
            "Connector": "S",
            "Sage": "M",
            "Builder": "L",
            "Harmonizer": "A",
        }
        names = [n.strip() for n in triple_txt.split("+")]
        letters: List[str] = []
        valid = True
        for n in names:
            if n not in name_to_letter:
                valid = False
                break
            letters.append(name_to_letter[n])
        if not valid or len(letters) != 3:
            continue
        key = tuple(sorted(letters))  # type: ignore[assignment]
        out[key] = {
            "Triple (Archetypes)": triple_txt,
            "Profile Name": profile_name,
            "Class": klass,
        }
    return out


def parse_doubles_md(md_path: Path) -> Optional[Dict[Tuple[str, str], Dict[str, str]]]:
    if not md_path.exists():
        return None
    lines = md_path.read_text(encoding="utf-8").splitlines()
    out: Dict[Tuple[str, str], Dict[str, str]] = {}
    for line in lines:
        line = line.strip()
        if not line.startswith("|"):
            continue
        parts = [p.strip() for p in line.strip("|").split("|")]
        if len(parts) < 4 or parts[0] in ("ID", "--"):
            continue
        _, pair_txt, profile_name, klass = parts[:4]
        name_to_letter = {
            "Visionary": "V",
            "Dreamer": "I",
            "Architect": "E",
            "Catalyst": "P",
            "Realist": "C",
            "Maverick": "R",
            "Connector": "S",
            "Sage": "M",
            "Builder": "L",
            "Harmonizer": "A",
        }
        names = [n.strip() for n in pair_txt.split("+")]
        letters: List[str] = []
        valid = True
        for n in names:
            if n not in name_to_letter:
                valid = False
                break
            letters.append(name_to_letter[n])
        if not valid or len(letters) != 2:
            continue
        key = tuple(sorted(letters))  # type: ignore[assignment]
        out[key] = {
            "(Archetypes)": pair_txt,
            "Profile Name": profile_name,
            "Class": klass,
        }
    return out


def run_interactive(questions):
    print("HUMANITY — Interactive Quiz")
    answers: Dict[int, str] = {}
    for q in questions:
        qid = int(q["id"])
        print()
        print(f"Q{qid}. {q['text']}")
        for o in q.get("options", []):
            print(f"  {o['key']}. {o['text']}")
        while True:
            sel = input("Your choice: ").strip().upper()
            if any(str(o.get("key")) == sel for o in q.get("options", [])):
                answers[qid] = sel
                break
            print("Invalid choice. Try again.")
    return answers


def main():
    parser = argparse.ArgumentParser(description="HUMANITY CLI")
    parser.add_argument("run", nargs="?", help="Run the quiz")
    parser.add_argument("--data-dir", default=str(Path(__file__).resolve().parents[2] / "packages" / "data"), help="Path to data directory containing JSON files")
    parser.add_argument("--answers-json", help="Path to a JSON file mapping question id to option key")
    parser.add_argument("--auto-demo", action="store_true", help="Non-interactive demo: choose the first option for all questions")
    parser.add_argument("--export", help="Path to write Markdown report (e.g., report.md)")

    args = parser.parse_args()

    data_dir = Path(args.data_dir)
    arch = load_json(data_dir / "archetypes.json")["archetypes"]
    questions = load_json(data_dir / "questions.json")["questions"]

    triples_lookup = parse_triples_md(data_dir / "triples.md")
    doubles_lookup = parse_doubles_md(data_dir / "doubles.md")

    if args.answers_json:
        answers = json.loads(Path(args.answers_json).read_text(encoding="utf-8"))
        answers = {int(k): str(v).upper() for k, v in answers.items()}
    elif args.auto_demo:
        answers = {int(q["id"]): str(q.get("options", [{}])[0].get("key", "A")).upper() for q in questions}
    else:
        answers = run_interactive(questions)

    raw = score_quiz(questions, answers)
    norm = normalize_scores(raw)
    ranked = rank_archetypes(norm)

    report = build_markdown_report(ranked, arch, answers, questions, triples_lookup=triples_lookup, doubles_lookup=doubles_lookup)

    if args.export:
        Path(args.export).write_text(report, encoding="utf-8")
        print(f"Report written to {args.export}")
    else:
        print(report)


if __name__ == "__main__":
    main()
